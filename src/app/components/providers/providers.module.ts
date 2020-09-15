import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import {ProviderFormComponent} from './provider-form/provider-form.component';
import {ProviderListComponent} from './provider-list/provider-list.component';
import {ProviderService} from '../../services/provider/provider.service';
import {LayoutModule} from '../layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import {NgSelect2Module} from 'ng-select2';
import {ItemsModule} from '../items/items.module';
import {ItemService} from '../../services/item/item.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ProviderFormComponent, ProviderListComponent],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    LayoutModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgSelect2Module,
    ItemsModule,
    NgbModule
  ],
  providers: [ProviderService, ItemService]
})
export class ProvidersModule { }
