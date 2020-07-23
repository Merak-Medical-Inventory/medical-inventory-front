import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnauthorizedGuard} from '../../guards/unauthorized/unauthorized.guard';
import {PresentationListComponent} from './presentation-list/presentation-list.component';
import {PresentationFormComponent} from './presentation-form/presentation-form.component';


const routes: Routes = [{
  path: '',
  component: PresentationListComponent
},
  {
    path: 'add',
    component: PresentationFormComponent,
    canActivate: [UnauthorizedGuard]
  },
  {
    path: 'edit/:presentationId',
    component: PresentationFormComponent,
    canActivate: [UnauthorizedGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationsRoutingModule { }
