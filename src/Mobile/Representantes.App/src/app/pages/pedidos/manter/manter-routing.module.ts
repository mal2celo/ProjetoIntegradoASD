import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManterPage } from './manter.page';

const routes: Routes = [
  {
    path: '',
    component: ManterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManterPageRoutingModule {}
