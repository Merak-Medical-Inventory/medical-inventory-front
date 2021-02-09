import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakersRoutingModule } from './makers-routing.module';
import { MakerListComponent } from './maker-list/maker-list.component';
import { MakerFormComponent } from './maker-form/maker-form.component';
import {LayoutModule} from '../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {MakerService} from '../../services/maker/maker.service';


@NgModule({
  declarations: [MakerListComponent, MakerFormComponent],
  imports: [
    CommonModule,
    MakersRoutingModule,
    LayoutModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  providers: [MakerService]
})
export class MakersModule { }
