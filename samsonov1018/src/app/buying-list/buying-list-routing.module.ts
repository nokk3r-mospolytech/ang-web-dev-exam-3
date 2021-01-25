import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from '../info/info/info.component';
import { ListEditComponent } from './list-edit/list-edit.component';
import { ListComponent } from './list/list.component';
import { BuyingListComponent } from './buying-list.component';

const routes: Routes = [
  {
    path: '',
    component: BuyingListComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'profile',
        component: ListEditComponent,
      },
      {
        path: 'profile/:id',
        component: ListEditComponent,
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyingListModuleRouting { }
