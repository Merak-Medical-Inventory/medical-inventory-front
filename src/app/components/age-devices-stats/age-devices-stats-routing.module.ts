import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgeDevicesComponent} from './age-devices.component';


const routes: Routes = [{
  path: '',
  component: AgeDevicesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgeDevicesStatsRoutingModule { }
