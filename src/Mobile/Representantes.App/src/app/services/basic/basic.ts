import { Injectable } from '@angular/core';
//import { Platform, ToastController, AlertController } from 'ionic-angular';
//import { Device } from '@ionic-native/device';


@Injectable({
    providedIn: 'root'
})
export class BasicService {

    /**
     * Servicos Basicos
     * Informacoes e rotinas para serem consumidas por qualquer modulo (Mensagens e alertas, geracao de hashes, etc)
     * @class BasicService
     */

    public deviceId: String; // armazena uuid do aparelho
    public deviceOs: String; // amrazena sistema operacional

    constructor(
        /*private platform: Platform,
        private device: Device,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController*/
    ) {

        /*
        platform.ready().then(() => {
            console.log('-> BasicService.platform.ready()');
        })
*/
        this.getDevice();

    }



    /**
     * Obtem informacoes da platafoma e do dispositivo e armazena nas variaveis this.deviceId e this.deviceOs
     */
    getDevice() {

        /*
            // pega id do aparelho, se nao conseguir gera um
            this.deviceId = (this.device.uuid || this.newUuid(true)).substr(0,100);

            // identifica sistema operacional
            this.deviceOs = 'DESCONHECIDO';
            if (this.platform.is('android')) {
                this.deviceOs = 'ANDROID';
            } else if (this.platform.is('IOS')) {
                this.deviceOs = 'IOS';
            } else if (this.platform.is('windows')) {
                this.deviceOs = 'WINDOWS';
            }

            console.log('-> device ID: ' + this.deviceId);
            console.log('-> device OS: ' + this.deviceOs);
            console.log('-> device Platform: ' + this.device.platform);
            console.log('-> device Serial: ' + this.device.serial);
            */
    }


    /**
     * Retorna um novo codigo hexadecimal de 32 caracteres, supostamente unico.
     * A probabilidade de se gerar um codigo repetido eh muito muito muito muito pequena.
     * @param rfc default false. se true, formata conforme RFC-4122 (cinco grupos separados por hifens, na forma 8-4-4-4-12).
     */
    newUuid(rfc = false) {
        let hifen = rfc ? '-' : '';
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + hifen + s4() + hifen + s4() + hifen + s4() + hifen + s4() + s4() + s4();
    }


    /**
    * Implementacao do Delay()
    * @return Promise
    * @param ms tempo em ms, assume 1ms se nao especificado
    * @param maybeError default = false, se true aleatoriamemte retorna success or error
    */
    delayPromise(ms = 1, maybeError = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let rnd = Math.random();
                if (maybeError && rnd < 0.5) {
                    reject(rnd);
                } else {
                    resolve(rnd);
                }
            }, ms);
        });
    }

    /**
     * Padroniza exibicao do toast: no centro, duracao 3seg, borda laranja. Usado para DEBUG.
     * Mensagem aceita '\n' como quebra de linha.
     * @param message texto a ser mostrado
     */
    toast(message) {
/*
        this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'middle',
            cssClass: 'fsc-toast fsc-question'
        })
        .present();
*/
    }

    /**
     * Padroniza exibicao de mensagem de alerta: padrao material design, unico botao 'OK'. Usado para DEBUG.
     * @param title titulo da mensagem
     * @param message texto a ser mostrado
     * @param handler funcao a ser executada quando o botao ok for clicado
     */
    alert(title, message, handler) {
/*
        this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel',
                    handler: handler
                },
            ]
        })
        .present();
        */
    }

    public normalizarAcentos(pValor: string){
        pValor = pValor.toLowerCase();
        pValor = pValor.replace('??','a')
        .replace('??','a')
        .replace('??','a')
        .replace('??','a')
        .replace('??','e')
        .replace('??','e')
        .replace('??','i')
        .replace('??','o')
        .replace('??','o')
        .replace('??','o')
        .replace('??','u')
        .replace('??','c');
    
        return pValor;
      }
    
      public normalizarAcentosSelect(pValor: string){
        let normalizacao = `replace( LOWER(` + pValor + `), '??','a')`;
        normalizacao = `replace(` + normalizacao + `, '??','a')`;
        normalizacao = `replace(` + normalizacao + `, '??','a')`;
        normalizacao = `replace(` + normalizacao + `, '??','a')`;
        normalizacao = `replace(` + normalizacao + `, '??','a')`;
        normalizacao = `replace(` + normalizacao + `, '??','a')`;
        normalizacao = `replace(` + normalizacao + `, '??','a')`;
        normalizacao = `replace(` + normalizacao + `, '??','a')`;
    
        normalizacao = `replace(` + normalizacao + `, '??','e')`;
        normalizacao = `replace(` + normalizacao + `, '??','e')`;
        normalizacao = `replace(` + normalizacao + `, '??','e')`;
        normalizacao = `replace(` + normalizacao + `, '??','e')`;
    
        normalizacao = `replace(` + normalizacao + `, '??','i')`;
        normalizacao = `replace(` + normalizacao + `, '??','i')`;
    
        normalizacao = `replace(` + normalizacao + `, '??','o')`;
        normalizacao = `replace(` + normalizacao + `, '??','o')`;
        normalizacao = `replace(` + normalizacao + `, '??','o')`;
        normalizacao = `replace(` + normalizacao + `, '??','o')`;
        normalizacao = `replace(` + normalizacao + `, '??','o')`;
        normalizacao = `replace(` + normalizacao + `, '??','o')`;
    
        normalizacao = `replace(` + normalizacao + `, '??','u')`;
        normalizacao = `replace(` + normalizacao + `, '??','u')`;
    
        normalizacao = `replace(` + normalizacao + `, '??','c')`;
        normalizacao = `replace(` + normalizacao + `, '??','c')`;
    
        return normalizacao;
      }

}
