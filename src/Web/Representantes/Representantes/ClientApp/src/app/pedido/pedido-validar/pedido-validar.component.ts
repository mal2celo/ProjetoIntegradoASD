import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-pedido-validar',
  templateUrl: './pedido-validar.component.html',
  styleUrls: ['./pedido-validar.component.scss']
})
export class PedidoValidarComponent implements OnInit {
  pedido: any = {};

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      var id = Number(params.has('id') ? params!.get('id') : 0);
      this.iniciarTela(id);      
    });
  }

  iniciarTela(id: number){
    console.log("Id ", id);
    const result = this.pedidoService.consultarPedido(id);
    
    result.then(result => {
      if(result){
        this.pedido = result;
        console.log(this.pedido);
      }else{
        console.log(`Erro no login: ${result}`);
      }
    }).catch((error) => {
      Swal.fire('Ops!', 'Não foi possível recuperar o pedido.', 'error');
    });
  }

  aprovar(){
    const result = this.pedidoService.aprovarPedido(this.pedido.id);
    result.then(result => {
      if(result){
        Swal.fire('Sucesso!', 'O pedido foi aprovado com sucesso!', 'success');
        this.iniciarTela(this.pedido.id);
      }else{
        console.log(`Erro na aprovação do pedido: ${result}`);
      }
    }).catch((error) => {
      Swal.fire('Ops!', 'Não foi possível aprovar o pedido.', 'error');
    });
  }

  reprovar(){
    const result = this.pedidoService.reprovarPedido(this.pedido.id);
    result.then(result => {
      if(result){
        Swal.fire('Sucesso!', 'O pedido foi reprovado com sucesso!', 'success');
        this.iniciarTela(this.pedido.id);
      }else{
        console.log(`Erro na reprovação do pedido: ${result}`);
      }
    }).catch((error) => {
      Swal.fire('Ops!', 'Não foi possível reprovar o pedido.', 'error');
    });
  }

}
