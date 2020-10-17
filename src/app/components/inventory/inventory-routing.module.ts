import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InventoryInfoComponent} from './inventory-info/inventory-info.component';


const routes: Routes = [{
  path: '',
  component: InventoryInfoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
