import { AccountService, ItemMenu } from './../../account/shared/account.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  logoImage = "";
  active: boolean = true;
  nomeUsuario = "";
  primeiroNomeUsuario = "";
  matricula = "";
  funcaoUsuario = "";
  versao = "";
  listItensMenu: ItemMenu[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.versao = environment.versao;
    this.dadosDoUsuario();
    this.listItensMenu = this.accountService.getMenuPrincipal();
  }

  dadosDoUsuario(){
    let payloadToken: any = this.accountService.getPayloadToken();
    if(payloadToken){
      console.log(payloadToken);
      if(payloadToken.nome){
        this.nomeUsuario = payloadToken.nome;
        this.primeiroNomeUsuario = this.nomeUsuario.split(' ')[0];
      } 

      if(payloadToken.matricula){
        this.matricula = payloadToken.matricula;
      } 

      if(payloadToken.perfil){
        this.funcaoUsuario = payloadToken.perfil === "1" ? "Representante" : "Administrador";
      }
    }
  }
  
  toggle() {
    this.active = !this.active;
  }

  sair() {
    Swal.fire({
      title: 'Deseja realmente sair do sistema?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cencelar',
      confirmButtonText: `Sair`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.logoff();
      }
    });
  }

  navegarBreadcrumb(item: any){
    if(!item.active){
      this.navegarPara(item.rota);
    }
  }

  navegarPara(rota: string){
    console.log("Navegar para ", rota);
    this.router.navigate([rota]);
  }
}

