import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {UnauthorizedGuard} from './guards/unauthorized/unauthorized.guard';
import {SessionGuard} from './guards/session/session.guard';
import {SuperuserAuthGuard} from './guards/superuserAuth/superuser-auth.guard';
import {AdminAuthGuard} from './guards/adminAuth/admin-auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './components/layout/layout.module#LayoutModule',
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'login',
    loadChildren: './components/login/login.module#LoginModule',
    canActivate: [SessionGuard]
  },
  {
    path: 'users',
    loadChildren: './components/users/users.module#UsersModule',
    canActivate: [SuperuserAuthGuard]
  },
  {
    path: 'categories',
    loadChildren: './components/categories/categories.module#CategoriesModule',
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'departments',
    loadChildren: './components/departments/departments.module#DepartmentsModule',
    canActivate: [SuperuserAuthGuard]
  },
  {
    path: 'presentations',
    loadChildren: './components/presentations/presentations.module#PresentationsModule',
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'brands',
    loadChildren: './components/brands/brands.module#BrandsModule',
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'items',
    loadChildren: './components/items/items.module#ItemsModule',
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
