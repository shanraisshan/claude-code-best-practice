# WPGraphQL — Requêtes Courantes

## Posts

```graphql
# Tous les articles
query GetPosts($first: Int = 100, $after: String) {
  posts(first: $first, after: $after, where: { status: PUBLISH }) {
    pageInfo { hasNextPage endCursor }
    nodes {
      id databaseId slug title date excerpt content
      featuredImage { node { sourceUrl altText mediaDetails { width height } } }
      categories { nodes { name slug } }
      tags { nodes { name slug } }
      author { node { name avatar { url } } }
    }
  }
}

# Post par slug
query GetPost($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    title content date modified excerpt
    featuredImage { node { sourceUrl altText } }
    categories { nodes { name slug } }
    author { node { name description avatar { url } } }
    seo { title metaDesc canonical opengraphImage { sourceUrl } }
  }
}
```

## Pages

```graphql
query GetPages {
  pages(first: 100) {
    nodes { id slug title content parent { node { slug } } menuOrder }
  }
}

query GetPage($slug: ID!) {
  page(id: $slug, idType: URI) {
    title content
    seo { title metaDesc opengraphImage { sourceUrl } }
  }
}
```

## Menus

```graphql
query GetMenu($slug: ID!) {
  menu(id: $slug, idType: SLUG) {
    menuItems(first: 50) {
      nodes {
        id label url path target
        parentId
        childItems { nodes { id label url path } }
      }
    }
  }
}
```

## Catégories & Tags

```graphql
query GetCategories {
  categories(first: 100) {
    nodes { id name slug count description }
  }
}

query GetPostsByCategory($slug: ID!) {
  category(id: $slug, idType: SLUG) {
    name description
    posts(first: 100) { nodes { title slug date excerpt } }
  }
}
```

## Routing Universel (nodeByUri)

```graphql
query GetNodeByUri($uri: String!) {
  nodeByUri(uri: $uri) {
    __typename
    ... on Post { title content date slug
      featuredImage { node { sourceUrl } }
      categories { nodes { name slug } }
    }
    ... on Page { title content slug }
    ... on Category { name description
      posts { nodes { title slug } }
    }
    ... on Tag { name
      posts { nodes { title slug } }
    }
  }
}
```

## Médias

```graphql
query GetMedia {
  mediaItems(first: 100) {
    nodes { sourceUrl altText title mediaDetails { width height } }
  }
}
```

## ACF (avec WPGraphQL for ACF)

```graphql
query GetProjectsWithACF {
  projects(first: 100) {
    nodes {
      slug title
      projectFields {
        clientName
        projectUrl
        technologies
        gallery { sourceUrl altText }
      }
    }
  }
}
```

## Recherche

```graphql
query Search($query: String!) {
  posts(where: { search: $query }) {
    nodes { title slug excerpt }
  }
  pages(where: { search: $query }) {
    nodes { title slug }
  }
}
```

## Pagination (cursor-based)

```graphql
query GetPostsPaginated($first: Int = 12, $after: String) {
  posts(first: $first, after: $after) {
    pageInfo { hasNextPage endCursor hasPreviousPage startCursor }
    nodes { title slug date excerpt }
  }
}
```
