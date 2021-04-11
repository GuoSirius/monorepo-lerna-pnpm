import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './views/detail/detail.component';
import { IndexComponent } from './views/index/index.component';
import { MineComponent } from './views/mine/mine.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // redirectTo: '/index'
    component: IndexComponent,
  },
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'watch/:mediaType/:id',
    component: DetailComponent,
  },
  {
    path: 'mylist',
    component: MineComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
