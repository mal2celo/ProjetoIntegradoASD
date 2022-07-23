
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PaginaBase } from 'src/app/base.page';
import { SincronizacaoService } from 'src/app/services/sincronizacao/sincronizacao.service';

@Component({
  selector: 'app-sincronizar',
  templateUrl: './sincronizar.page.html',
  styleUrls: ['./sincronizar.page.scss'],
})
export class SincronizarPage extends PaginaBase {

  constructor(
    _loadingController: LoadingController,
    public sincronizacaoService: SincronizacaoService
  ) { 
    super(_loadingController);
  }

  ngOnInit() {
  }

  iniciar(){
    this.mostrarLoading("Sincronizando...").then(() => {
      this.sincronizacaoService.sincronizar()
      .then( () => {
        this.mostrarMensagemSucesso("Sincronização realizada com sucesso!");
      })
      .finally(() => {
        this.esconderLoading();
      });
    });
  }

}
