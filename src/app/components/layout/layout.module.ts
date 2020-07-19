import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent} from './sidebar/sidebar.component';
import { LandingpageComponent} from './landingpage/landingpage.component';
import {LayoutRoutingModule} from './layout-routing.module';
import {FilterTablePipe} from './pipes/filter-table.pipe';


@NgModule({
  declarations: [
    SidebarComponent,
    LandingpageComponent,
    FilterTablePipe
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  exports: [SidebarComponent, FilterTablePipe]
})
export class LayoutModule { }
