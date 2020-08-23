import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent} from './sidebar/sidebar.component';
import { LandingpageComponent} from './landingpage/landingpage.component';
import {LayoutRoutingModule} from './layout-routing.module';
import {FilterTablePipe} from './pipes/filter-table.pipe';
import { AlertComponent } from './alert/alert.component';
import {AlertService} from '../../services/alert/alert.service';


@NgModule({
  declarations: [
    SidebarComponent,
    LandingpageComponent,
    FilterTablePipe,
    AlertComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  exports: [SidebarComponent, FilterTablePipe, AlertComponent],
  providers: [AlertService]
})
export class LayoutModule { }
