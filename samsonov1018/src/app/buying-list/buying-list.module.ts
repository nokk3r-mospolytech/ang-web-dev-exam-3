import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyingListModuleRouting } from './buying-list-routing.module';
import { BuyingListComponent } from './buying-list.component';
import { ListComponent } from './list/list.component';
import { ListEditComponent } from './list-edit/list-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListTableComponent } from './list-table/list-table.component';
import { FindNamePipe } from '../shared/pipes/find-name.pipe';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [BuyingListComponent, ListComponent, ListEditComponent, ListTableComponent, FindNamePipe],
  imports: [
    CommonModule,
    BuyingListModuleRouting,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,

  ]
})
export class BuyingListModule { }
