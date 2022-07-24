import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  private loader: HTMLIonLoadingElement;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private apiService: ApiService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  login(form) {
    if (form.value.usuario == '' || form.value.senha == '') {
      Swal.fire({
        title: 'Atenção!',
        text: 'Por favor preencha os campos Usuário e Senha',
        icon: 'warning',
        heightAuto: false
      })
    } else {
      
      this.showLoader().then(() => {

        this.apiService.login(form.value.usuario, form.value.senha)
        .then((result: any) => {
          this.hideLoader();
          
          if (result.Status == 1) {
            Swal.fire({ title: result.Mensagem, icon: "error", heightAuto: false });
          }
          else {
            //Salva o token
            this.salvarToken(result.Token).then(() => {
              this.menuCtrl.enable(true).then(() => {
                this.router.navigate(['principal']);
              });
            });
          }
          
        })
        .catch((error: any) => {
          this.hideLoader();
          Swal.fire({
            title: "Ops...",
            text: "Usuário ou senha incorretos",
            icon: "warning",
            heightAuto: false
          });
        });
      });
    }
  }

  async showLoader() {
    if (!this.loader) {
      this.loader = await this.loadingController.create({
        message: 'Carregando...',
        spinner: 'lines',
        translucent: true
      });
    }
    await this.loader.present();
  }

  async hideLoader() {
    if (this.loader) {
      await this.loader.dismiss();
      this.loader = null;
    }
  }

  async salvarToken(token: string) {
    await Storage.set({
      key: 'Token',
      value: token
    });
  }
}
