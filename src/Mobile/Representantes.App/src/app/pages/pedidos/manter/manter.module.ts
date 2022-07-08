import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManterPageRoutingModule } from './manter-routing.module';

import { ManterPage } from './manter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManterPageRoutingModule
  ],
  declarations: [ManterPage]
})
export class ManterPageModule {}
