
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PaginaBase } from 'src/app/base.page';
import { SincronizacaoService } from 'src/app/services/sincronizacao/sincronizacao.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-sincronizar',
  templateUrl: './sincronizar.page.html',
  styleUrls: ['./sincronizar.page.scss'],
})
export class SincronizarPage extends PaginaBase {

  token: string = "";

  constructor(
    _loadingController: LoadingController,
    public sincronizacaoService: SincronizacaoService,
    private router: Router,
  ) { 
    super(_loadingController);
  }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    let token = Storage.get({ key: 'Token' });
    token.then(a => {
      if(a.value){
        this.token = a.value;
      }
    });
  }

  iniciar(){
    this.mostrarLoading("Sincronizando...").then(() => {
      this.sincronizacaoService.sincronizar(this.token)
      .then( () => {
        this.mostrarMensagemSucesso("Sincronização realizada com sucesso!");
        this.router.navigate(['principal']);
      })
      .catch(() => {
        this.mostrarMensagemErro("Não foi possível sincronizar.");
      })
      .finally(() => {
        this.esconderLoading();
      });
    });
  }

}
