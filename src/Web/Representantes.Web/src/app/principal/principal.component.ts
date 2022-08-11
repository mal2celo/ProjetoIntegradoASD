import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AccountService } from '../account/shared/account.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  nomeUsuario: string = "";
  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dadosDoUsuario();
  }

  dadosDoUsuario(){
    let payloadToken: any = this.accountService.getPayloadToken();
    if(payloadToken){
      if(payloadToken.nome){
        this.nomeUsuario = payloadToken.nome;
      } 
    }
  }

  consultarPedidos(){
    this.router.navigate(['pedido_consultar']);
  }

}
