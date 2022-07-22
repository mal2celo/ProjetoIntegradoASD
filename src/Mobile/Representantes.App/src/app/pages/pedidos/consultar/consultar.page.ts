import { Cliente } from './../../../services/clientes/clientes.service';
import { Component, OnInit } from '@angular/core';
import { Pedido, PedidosService } from 'src/app/services/pedidos/pedidos.service';
import * as moment from 'moment';
import { identity } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.page.html',
  styleUrls: ['./consultar.page.scss'],
})
export class ConsultarPage implements OnInit {

  listPedidos: any[] = [];

  constructor(
    private pedidos: PedidosService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.consultarPedidos();
  }

  consultarPedidos(){
    this.pedidos.getAll().then((list: any[]) => {
      this.listPedidos = list
    })
  }

  novoPedido(){
    this.router.navigate(['manter-pedidos']);
  }

  detalhePedido(id: number){
    let navigationExtras: NavigationExtras = {
      queryParams: { 
        id: id
      }
    };
    this.router.navigate(['manter-pedidos'], navigationExtras);
  }
}


