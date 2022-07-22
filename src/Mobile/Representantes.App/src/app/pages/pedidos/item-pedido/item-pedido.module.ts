import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemPedidoPageRoutingModule } from './item-pedido-routing.module';

import { ItemPedidoPage } from './item-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ItemPedidoPageRoutingModule
  ],
  declarations: [ItemPedidoPage]
})
export class ItemPedidoPageModule {}
