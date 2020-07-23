import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationsRoutingModule } from './presentations-routing.module';
import { PresentationListComponent } from './presentation-list/presentation-list.component';
import { PresentationFormComponent } from './presentation-form/presentation-form.component';
import {LayoutModule} from '../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {PresentationService} from '../../services/presentation/presentation.service';


@NgModule({
  declarations: [PresentationListComponent, PresentationFormComponent],
  imports: [
    CommonModule,
    PresentationsRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  providers: [PresentationService]
})
export class PresentationsModule { }
