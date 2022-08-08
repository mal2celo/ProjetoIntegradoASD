import { Component, OnInit } from '@angular/core';
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

}
