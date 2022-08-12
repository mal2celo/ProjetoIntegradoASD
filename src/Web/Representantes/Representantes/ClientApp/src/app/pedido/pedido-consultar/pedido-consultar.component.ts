
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-pedido-consultar',
  templateUrl: './pedido-consultar.component.html',
  styleUrls: ['./pedido-consultar.component.scss']
})
export class PedidoConsultarComponent implements OnInit {

  pedidos: any[] = [];

  constructor(
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.consultarPedidos();
  }

  consultarPedidos(){
    const result = this.pedidoService.consultarPedidos();
    
    result.then(result => {
      if(result){
        this.pedidos = result;
        console.log(`Login efetuado: ${result}`);
      }else{
        console.log(`Erro no login: ${result}`);
      }
    }).catch((error) => {
      Swal.fire('Ops!', 'Não foi possível consultar os pedidos.', 'error');
    });
  }

  detalhesPedido(id: number){
    this.router.navigate(['pedido_validar', {id}]);
  }

}
