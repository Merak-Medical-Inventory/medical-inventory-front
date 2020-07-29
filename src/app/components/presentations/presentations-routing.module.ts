import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PresentationListComponent} from './presentation-list/presentation-list.component';
import {PresentationFormComponent} from './presentation-form/presentation-form.component';
import {AdminAuthGuard} from '../../guards/adminAuth/admin-auth.guard';


const routes: Routes = [{
  path: '',
  component: PresentationListComponent
},
  {
    path: 'add',
    component: PresentationFormComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'edit/:presentationId',
    component: PresentationFormComponent,
    canActivate: [AdminAuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationsRoutingModule { }
