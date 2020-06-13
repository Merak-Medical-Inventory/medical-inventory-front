import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: './login/login.module#LoginModule'
} ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
