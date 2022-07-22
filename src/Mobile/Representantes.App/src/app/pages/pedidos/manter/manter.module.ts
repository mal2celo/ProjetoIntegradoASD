import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManterPageRoutingModule } from './manter-routing.module';

import { ManterPage } from './manter.page';

import { ItemPedidoPageModule } from '../item-pedido/item-pedido.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ManterPageRoutingModule,
    ItemPedidoPageModule
  ],
  declarations: [ManterPage]
})
export class ManterPageModule {}
