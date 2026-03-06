---
name: angular-migration
description: Migrate from AngularJS to Angular using hybrid mode, incremental component rewriting, and dependency injection updates. Use when upgrading AngularJS applications, planning framework migrations, or modernizing legacy Angular code.
---

# Angular Migration

Master AngularJS to Angular migration, including hybrid apps, component conversion, dependency injection changes, and routing migration.

## When to Use This Skill

- Migrating AngularJS (1.x) applications to Angular (2+)
- Running hybrid AngularJS/Angular applications
- Converting directives to components
- Modernizing dependency injection
- Migrating routing systems
- Updating to latest Angular versions
- Implementing Angular best practices

## Migration Strategies

### 1. Big Bang (Complete Rewrite)
- Rewrite entire app in Angular
- Parallel development
- Switch over at once
- **Best for:** Small apps, green field projects

### 2. Incremental (Hybrid Approach)
- Run AngularJS and Angular side-by-side
- Migrate feature by feature
- ngUpgrade for interop
- **Best for:** Large apps, continuous delivery

### 3. Vertical Slice
- Migrate one feature completely
- New features in Angular, maintain old in AngularJS
- Gradually replace
- **Best for:** Medium apps, distinct features

## Hybrid App Setup

```typescript
// main.ts - Bootstrap hybrid app
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(platformRef => {
    const upgrade = platformRef.injector.get(UpgradeModule);
    // Bootstrap AngularJS
    upgrade.bootstrap(document.body, ['myAngularJSApp'], { strictDi: true });
  });
```

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}

  ngDoBootstrap() {
    // Bootstrapped manually in main.ts
  }
}
```

## Component Migration

### AngularJS Controller → Angular Component
```javascript
// Before: AngularJS controller
angular.module('myApp').controller('UserController', function($scope, UserService) {
  $scope.user = {};

  $scope.loadUser = function(id) {
    UserService.getUser(id).then(function(user) {
      $scope.user = user;
    });
  };

  $scope.saveUser = function() {
    UserService.saveUser($scope.user);
  };
});
```

```typescript
// After: Angular component
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  template: `
    <div>
      <h2>{{ user.name }}</h2>
      <button (click)="saveUser()">Save</button>
    </div>
  `
})
export class UserComponent implements OnInit {
  user: any = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUser(1);
  }

  loadUser(id: number) {
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
    });
  }

  saveUser() {
    this.userService.saveUser(this.user);
  }
}
```

### AngularJS Directive → Angular Component
```javascript
// Before: AngularJS directive
angular.module('myApp').directive('userCard', function() {
  return {
    restrict: 'E',
    scope: {
      user: '=',
      onDelete: '&'
    },
    template: `
      <div class="card">
        <h3>{{ user.name }}</h3>
        <button ng-click="onDelete()">Delete</button>
      </div>
    `
  };
});
```

```typescript
// After: Angular component
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="card">
      <h3>{{ user.name }}</h3>
      <button (click)="delete.emit()">Delete</button>
    </div>
  `
})
export class UserCardComponent {
  @Input() user: any;
  @Output() delete = new EventEmitter<void>();
}

// Usage: <app-user-card [user]="user" (delete)="handleDelete()"></app-user-card>
```

## Service Migration

```javascript
// Before: AngularJS service
angular.module('myApp').factory('UserService', function($http) {
  return {
    getUser: function(id) {
      return $http.get('/api/users/' + id);
    },
    saveUser: function(user) {
      return $http.post('/api/users', user);
    }
  };
});
```

```typescript
// After: Angular service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<any> {
    return this.http.get(`/api/users/${id}`);
  }

  saveUser(user: any): Observable<any> {
    return this.http.post('/api/users', user);
  }
}
```

## Dependency Injection Changes

### Downgrading Angular → AngularJS
```typescript
// Angular service
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NewService {
  getData() {
    return 'data from Angular';
  }
}

// Make available to AngularJS
import { downgradeInjectable } from '@angular/upgrade/static';

angular.module('myApp')
  .factory('newService', downgradeInjectable(NewService));

// Use in AngularJS
angular.module('myApp').controller('OldController', function(newService) {
  console.log(newService.getData());
});
```

### Upgrading AngularJS → Angular
```typescript
// AngularJS service
angular.module('myApp').factory('oldService', function() {
  return {
    getData: function() {
      return 'data from AngularJS';
    }
  };
});

// Make available to Angular
import { InjectionToken } from '@angular/core';

export const OLD_SERVICE = new InjectionToken<any>('oldService');

@NgModule({
  providers: [
    {
      provide: OLD_SERVICE,
      useFactory: (i: any) => i.get('oldService'),
      deps: ['$injector']
    }
  ]
})

// Use in Angular
@Component({...})
export class NewComponent {
  constructor(@Inject(OLD_SERVICE) private oldService: any) {
    console.log(this.oldService.getData());
  }
}
```

## Routing Migration

```javascript
// Before: AngularJS routing
angular.module('myApp').config(function($routeProvider) {
  $routeProvider
    .when('/users', {
      template: '<user-list></user-list>'
    })
    .when('/users/:id', {
      template: '<user-detail></user-detail>'
    });
});
```

```typescript
// After: Angular routing
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

## Forms Migration

```html
<!-- Before: AngularJS -->
<form name="userForm" ng-submit="saveUser()">
  <input type="text" ng-model="user.name" required>
  <input type="email" ng-model="user.email" required>
  <button ng-disabled="userForm.$invalid">Save</button>
</form>
```

```typescript
// After: Angular (Template-driven)
@Component({
  template: `
    <form #userForm="ngForm" (ngSubmit)="saveUser()">
      <input type="text" [(ngModel)]="user.name" name="name" required>
      <input type="email" [(ngModel)]="user.email" name="email" required>
      <button [disabled]="userForm.invalid">Save</button>
    </form>
  `
})

// Or Reactive Forms (preferred)
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="userForm" (ngSubmit)="saveUser()">
      <input formControlName="name">
      <input formControlName="email">
      <button [disabled]="userForm.invalid">Save</button>
    </form>
  `
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  saveUser() {
    console.log(this.userForm.value);
  }
}
```

## Migration Timeline

```
Phase 1: Setup (1-2 weeks)
- Install Angular CLI
- Set up hybrid app
- Configure build tools
- Set up testing

Phase 2: Infrastructure (2-4 weeks)
- Migrate services
- Migrate utilities
- Set up routing
- Migrate shared components

Phase 3: Feature Migration (varies)
- Migrate feature by feature
- Test thoroughly
- Deploy incrementally

Phase 4: Cleanup (1-2 weeks)
- Remove AngularJS code
- Remove ngUpgrade
- Optimize bundle
- Final testing
```

## Resources

- **references/hybrid-mode.md**: Hybrid app patterns
- **references/component-migration.md**: Component conversion guide
- **references/dependency-injection.md**: DI migration strategies
- **references/routing.md**: Routing migration
- **assets/hybrid-bootstrap.ts**: Hybrid app template
- **assets/migration-timeline.md**: Project planning
- **scripts/analyze-angular-app.sh**: App analysis script

## Best Practices

1. **Start with Services**: Migrate services first (easier)
2. **Incremental Approach**: Feature-by-feature migration
3. **Test Continuously**: Test at every step
4. **Use TypeScript**: Migrate to TypeScript early
5. **Follow Style Guide**: Angular style guide from day 1
6. **Optimize Later**: Get it working, then optimize
7. **Document**: Keep migration notes

## Common Pitfalls

- Not setting up hybrid app correctly
- Migrating UI before logic
- Ignoring change detection differences
- Not handling scope properly
- Mixing patterns (AngularJS + Angular)
- Inadequate testing
