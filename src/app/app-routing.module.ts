import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {UnauthorizedGuard} from './guards/unauthorized/unauthorized.guard';
import {SessionGuard} from './guards/session/session.guard';
import {SuperuserAuthGuard} from './guards/superuserAuth/superuser-auth.guard';
import {AdminAuthGuard} from './guards/adminAuth/admin-auth.guard';
import {MedicalAuthGuard} from './guards/medicalAuth/medical-auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './components/inventory/inventory.module#InventoryModule',
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'inventory',
    loadChildren: './components/inventory/inventory.module#InventoryModule',
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
    path: 'generalItems',
    loadChildren: './components/generalItems/general-items.module#GeneralItemsModule',
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'items',
    loadChildren: './components/items/items.module#ItemsModule',
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'providers',
    loadChildren: './components/providers/providers.module#ProvidersModule',
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'orders',
    loadChildren: './components/orders/orders.module#OrdersModule',
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'orderDepartment',
    loadChildren: './components/order-department/order-department.module#OrderDepartmentModule',
    canActivate: [MedicalAuthGuard]
  },
  {
    path: 'orderDepartmentAdmin',
    loadChildren: './components/order-department-admin/order-department-admin.module#OrderDepartmentAdminModule',
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'generalDevices',
    loadChildren: './components/general-devices/general-devices.module#GeneralDevicesModule',
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'makers',
    loadChildren: './components/makers/makers.module#MakersModule',
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
