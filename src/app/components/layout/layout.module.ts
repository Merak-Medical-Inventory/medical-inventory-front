import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent} from './sidebar/sidebar.component';
import { LandingpageComponent} from './landingpage/landingpage.component';
import {LayoutRoutingModule} from './layout-routing.module';


@NgModule({
  declarations: [
    SidebarComponent,
    LandingpageComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  exports: [SidebarComponent]
})
export class LayoutModule { }
