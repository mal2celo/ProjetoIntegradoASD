import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  template: ''
})
export abstract class PaginaBase implements OnInit {

  protected isoDateFormat: string = "YYYY-MM-DD[T]HH:mm:ss.SSS";
  
  constructor(
    private _loadingController: LoadingController) {
  }

  ngOnInit() {
  }

  protected normalizarDataString(data: string) {
    return (data != null && data != '01/01/0001' && data != '0001-01-01' && data != '0001-01-01T00:00:00.0000000') ? data : null;
  }

  protected mensagemErroCadastro(pTipoCadastro: string) {
    this.mostrarMensagemErro('Não foi possível salvar este ' + pTipoCadastro + ' por favor, revise o formulário. \nClique no nome dos campos em vermelho para ver os detalhes');
  }

  protected mostrarMensagemErro(pMensagem: string) {
    Swal.fire({
      title: 'Ocorreu um erro!!',
      text: pMensagem,
      icon: 'error',
      heightAuto: false
    });
  }

  protected mostrarMensagemSucesso(pMensagem: string) {
    Swal.fire({
      title: 'Sucesso!',
      text: pMensagem,
      icon: 'success',
      heightAuto: false
    });
  }
}