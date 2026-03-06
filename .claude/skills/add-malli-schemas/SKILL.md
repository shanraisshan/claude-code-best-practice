---
name: add-malli-schemas
description: Efficiently add Malli schemas to API endpoints in the Metabase codebase with proper patterns, validation timing, and error handling
---

# Add Malli Schemas to API Endpoints

This skill helps you efficiently and uniformly add Malli schemas to API endpoints in the Metabase codebase.

## Reference Files (Best Examples)

- `src/metabase/warehouses/api.clj` - Most comprehensive schemas, custom error messages
- `src/metabase/api_keys/api.clj` - Excellent response schemas
- `src/metabase/collections/api.clj` - Great named schema patterns
- `src/metabase/timeline/api/timeline.clj` - Clean, simple examples

## Quick Checklist

When adding Malli schemas to an endpoint:

- [ ] Route params have schemas
- [ ] Query params have schemas with `:optional true` and `:default` where appropriate
- [ ] Request body has a schema (for POST/PUT)
- [ ] Response schema is defined (using `:-` after route string)
- [ ] Use existing schema types from `ms` namespace when possible
- [ ] Consider creating named schemas for reusable or complex types
- [ ] Add contextual error messages for validation failures

## Basic Structure

### Complete Endpoint Example

```clojure
(mr/def ::Color [:enum "red" "blue" "green"])

(mr/def ::ResponseSchema
  [:map
   [:id pos-int?]
   [:name string?]
   [:color ::Color]
   [:created_at ms/TemporalString]])

(api.macros/defendpoint :post "/:name" :- ::ResponseSchema
  "Create a resource with a given name."
  [;; Route Params:
   {:keys [name]} :- [:map [:name ms/NonBlankString]]
   ;; Query Params:
   {:keys [include archived]} :- [:map
                                   [:include  {:optional true} [:maybe [:= "details"]]]
                                   [:archived {:default false} [:maybe ms/BooleanValue]]]
   ;; Body Params:
   {:keys [color]} :- [:map [:color ::Color]]
   ]
  ;; endpoint implementation, ex:
  {:id 99
   :name (str "mr or mrs " name)
   :color ({"red" "blue" "blue" "green" "green" "red"} color)
   :created_at (t/format (t/formatter "yyyy-MM-dd'T'HH:mm:ssXXX") (t/zoned-date-time))}
  )
```

## Common Schema Patterns

1. Route Params (the 5 in `api/user/id/5`)
2. Query Params (the sort+asc pair in `api/users?sort=asc`)
3. Body Params (the contents of a request body. Almost always decoded from json into edn)
4. The Raw Request map

Of the 4 arguments, deprioritize usage of the raw request unless necessary.

### Route Params

Always required, typically just a map with an ID:

```clojure
[{:keys [id]} :- [:map [:id ms/PositiveInt]]]
```

For multiple route params:

```clojure
[{:keys [id field-id]} :- [:map
                           [:id ms/PositiveInt]
                           [:field-id ms/PositiveInt]]]
```

### Query Params

Add properties for `{:optional true ...}` and `:default` values:

```clojure
{:keys [archived include limit offset]} :- [:map
                                            [:archived {:default false} [:maybe ms/BooleanValue]]
                                            [:include  {:optional true}   [:maybe [:= "tables"]]]
                                            [:limit    {:optional true} [:maybe ms/PositiveInt]]
                                            [:offset   {:optional true} [:maybe ms/PositiveInt]]]
```

### Request Body (POST/PUT)

```clojure
{:keys [name description parent_id]} :- [:map
                                         [:name        ms/NonBlankString]
                                         [:description {:optional true} [:maybe ms/NonBlankString]]
                                         [:parent_id   {:optional true} [:maybe ms/PositiveInt]]]
```

### Response Schemas

#### Simple inline response:

```clojure
(api.macros/defendpoint :get "/:id" :- [:map
                                        [:id pos-int?]
                                        [:name string?]]
  "Get a thing"
  ...)
```

#### Named schema for reuse:

```clojure
(mr/def ::Thing
  [:map
   [:id pos-int?]
   [:name string?]
   [:description [:maybe string?]]])

(api.macros/defendpoint :get "/:id" :- ::Thing
  "Get a thing"
  ...)

(api.macros/defendpoint :get "/" :- [:sequential ::Thing]
  "Get all things"
  ...)
```

## Common Schema Types

### From `metabase.util.malli.schema` (aliased as `ms`)

Prefer the schemas in the ms/* namespace, since they work better with our api infrastructure. 

For example use `ms/PositiveInt` instead of `pos-int?`.

```clojure
ms/PositiveInt                  ;; Positive integer
ms/NonBlankString               ;; Non-empty string
ms/BooleanValue                 ;; String "true"/"false" or boolean
ms/MaybeBooleanValue            ;; BooleanValue or nil
ms/TemporalString               ;; ISO-8601 date/time string (for REQUEST params only!)
ms/Map                          ;; Any map
ms/JSONString                   ;; JSON-encoded string
ms/PositiveNum                  ;; Positive number
ms/IntGreaterThanOrEqualToZero  ;; 0 or positive
```

**IMPORTANT:** For response schemas, use `:any` for temporal fields, not `ms/TemporalString`!
Response schemas validate BEFORE JSON serialization, so they see Java Time objects.

### Built-in Malli Types

```clojure
:string                     ;; Any string
:boolean                    ;; true/false
:int                        ;; Any integer
:keyword                    ;; Clojure keyword
pos-int?                    ;; Positive integer predicate
[:maybe X]                  ;; X or nil
[:enum "a" "b" "c"]         ;; One of these values
[:or X Y]                   ;; Schema that satisfies X or Y
[:and X Y]                  ;; Schema that satisfies X and Y
[:sequential X]             ;; Sequential of Xs
[:set X]                    ;; Set of Xs
[:map-of K V]               ;; Map with keys w/ schema K and values w/ schema V
[:tuple X Y Z]              ;; Fixed-length tuple of schemas X Y Z
```

Avoid using sequence schemas unless completely necessary.

## Step-by-Step: Adding Schemas to an Endpoint

### Example: Adding return schema to `GET /api/field/:id/related`

**Before:**
```clojure
(api.macros/defendpoint :get "/:id/related"
  "Return related entities."
  [{:keys [id]} :- [:map [:id ms/PositiveInt]]]
  (-> (t2/select-one :model/Field :id id) api/read-check xrays/related))
```

**Step 1:** Check what the function returns (look at `xrays/related`)

**Step 2:** Define response schema based on return type:

```clojure
(mr/def ::RelatedEntity
  [:map
   [:tables [:sequential [:map [:id pos-int?] [:name string?]]]]
   [:fields [:sequential [:map [:id pos-int?] [:name string?]]]]])
```

**Step 3:** Add response schema to endpoint:

```clojure
(api.macros/defendpoint :get "/:id/related" :- ::RelatedEntity
  "Return related entities."
  [{:keys [id]} :- [:map [:id ms/PositiveInt]]]
  (-> (t2/select-one :model/Field :id id) api/read-check xrays/related))
```

## Advanced Patterns

### Custom Error Messages

```clojure
(def DBEngineString
  "Schema for a valid database engine name."
  (mu/with-api-error-message
   [:and
    ms/NonBlankString
    [:fn
     {:error/message "Valid database engine"}
     #(u/ignore-exceptions (driver/the-driver %))]]
   (deferred-tru "value must be a valid database engine.")))
```

### Enum with Documentation

```clojure
(def PinnedState
  (into [:enum {:error/message "pinned state must be 'all', 'is_pinned', or 'is_not_pinned'"}]
        #{"all" "is_pinned" "is_not_pinned"}))
```

### Complex Nested Response

```clojure
(mr/def ::DashboardQuestionCandidate
  [:map
   [:id ms/PositiveInt]
   [:name ms/NonBlankString]
   [:description [:maybe string?]]
   [:sole_dashboard_info
    [:map
     [:id ms/PositiveInt]
     [:name ms/NonBlankString]
     [:description [:maybe string?]]]]])

(mr/def ::DashboardQuestionCandidatesResponse
  [:map
   [:data [:sequential ::DashboardQuestionCandidate]]
   [:total ms/PositiveInt]])
```

### Paginated Response Pattern

```clojure
(mr/def ::PaginatedResponse
  [:map
   [:data [:sequential ::Item]]
   [:total integer?]
   [:limit {:optional true} [:maybe integer?]]
   [:offset {:optional true} [:maybe integer?]]])
```

## Common Pitfalls

### Don't: Forget `:maybe` for nullable fields

```clojure
[:description ms/NonBlankString]  ;; WRONG - fails if nil
[:description [:maybe ms/NonBlankString]]  ;; RIGHT - allows nil
```

### Don't: Forget `:optional true` for optional query params

```clojure
[:limit ms/PositiveInt]  ;; WRONG - required but shouldn't be
[:limit {:optional true} [:maybe ms/PositiveInt]]  ;; RIGHT
```

### Don't: Forget `:default` values for known params

```clojure
[:limit ms/PositiveInt]  ;; WRONG - required but shouldn't be
[:limit {:optional true :default 0} [:maybe ms/PositiveInt]]  ;; RIGHT
```


### Don't: Mix up route params, query params, and body

```clojure
;; WRONG - all in one map
[{:keys [id name archived]} :- [:map ...]]

;; RIGHT - separate destructuring
[{:keys [id]} :- [:map [:id ms/PositiveInt]]
 {:keys [archived]} :- [:map [:archived {:default false} ms/BooleanValue]]
 {:keys [name]} :- [:map [:name ms/NonBlankString]]]
```

### Don't: Use `ms/TemporalString` for Java Time objects in response schemas

```clojure
;; WRONG - Java Time objects aren't strings yet
[:date_joined ms/TemporalString]

;; RIGHT - schemas validate BEFORE JSON serialization
[:date_joined :any]  ;; Java Time object, serialized to string by middleware
[:last_login [:maybe :any]]  ;; Java Time object or nil
```

**Why:** Response schemas validate the internal Clojure data structures BEFORE they are serialized to JSON. Java Time objects like `OffsetDateTime` get converted to ISO-8601 strings by the JSON middleware, so the schema needs to accept the raw Java objects.

### Don't: Use `[:sequential X]` when the data is actually a set

```clojure
;; WRONG - group_ids is actually a set
[:group_ids {:optional true} [:sequential pos-int?]]

;; RIGHT - matches the actual data structure
[:group_ids {:optional true} [:maybe [:set pos-int?]]]
```

**Why:** Toucan hydration methods often return sets. The JSON middleware will serialize sets to arrays, but the schema validates before serialization.

### Don't: Create anonymous schemas for reused structures

Use `mr/def` for schemas used in multiple places:

```clojure
(mr/def ::User
  [:map
   [:id pos-int?]
   [:email string?]
   [:name string?]])
```

## Finding Return Types

1. **Look at the function being called**

```clojure
(api.macros/defendpoint :get "/:id"
  [{:keys [id]}]
  (t2/select-one :model/Field :id id))  ;; Returns a Field instance
```

2. **Check Toucan models for structure**

Look in `src/metabase/*/models/*.clj` for model definitions.

3. **Use clojure-mcp or REPL to inspect**

```bash
./bin/mage -repl '(require '\''metabase.xrays.core) (doc metabase.xrays.core/related)'
```

4. **Check tests**

Tests often show the expected response structure.

## Understanding Schema Validation Timing

**CRITICAL CONCEPT:** Schemas validate at different points in the request/response lifecycle:

### Request Parameter Schemas (Query/Body/Route)
- Validate AFTER JSON parsing
- Data is already deserialized (strings, numbers, booleans)
- Use `ms/TemporalString` for date/time inputs
- Use `ms/BooleanValue` for boolean query params

### Response Schemas
- Validate BEFORE JSON serialization
- Data is still in Clojure format (Java Time objects, sets, keywords)
- Use `:any` for Java Time objects
- Use `[:set X]` for sets
- Use `[:enum :keyword]` for keyword enums

### Serialization Flow

```
Request:  JSON string → Parse → Coerce → Handler
Response: Handler → Schema Check → Encode → Serialize → JSON string
```

## Workflow Summary

1. **Read the endpoint** - understand what it does
2. **Identify params** - route, query, body
3. **Add parameter schemas** - use existing types from `ms`
4. **Determine return type** - check the implementation
5. **Define response schema** - inline or named with `mr/def`
6. **Test** - ensure the endpoint works and validates correctly

## Testing Your Schemas

After adding schemas, verify:

1. **Valid requests work** - test with correct data
2. **Invalid requests fail gracefully** - test with wrong types
3. **Optional params work** - test with/without optional params
4. **Error messages are clear** - check validation error responses

## Tips

- **Start simple** - begin with basic types, refine later
- **Reuse schemas** - if you see the same structure twice, make it a named schema
- **Be specific** - use `ms/PositiveInt` instead of `pos-int?`
- **Document intent** - add docstrings to named schemas
- **Follow conventions** - look at similar endpoints in the same namespace
- **Check the actual data** - use REPL to inspect what's actually returned before serialization

## Additional Resources

- [Malli Documentation](https://github.com/metosin/malli)
- Metabase Malli utilities: `src/metabase/util/malli/schema.clj`
- Metabase schema registry: `src/metabase/util/malli/registry.clj`
