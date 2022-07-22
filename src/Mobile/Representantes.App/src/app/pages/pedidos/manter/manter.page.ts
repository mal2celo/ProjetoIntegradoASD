import { ItensPedidosService, ItemPedido } from './../../../services/itens-pedidos/itens-pedidos.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { PaginaBase } from 'src/app/base.page';
import { Pedido, PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { Cliente, ClientesService } from 'src/app/services/clientes/clientes.service';
import { ItemPedidoPage } from '../item-pedido/item-pedido.page';

@Component({
  selector: 'app-manter',
  templateUrl: './manter.page.html',
  styleUrls: ['./manter.page.scss'],
})
export class ManterPage extends PaginaBase {
  model: Pedido;
  pedidoFormGroup: FormGroup;
  listClientes: any[] = [];
  listItems: any[] = [];
  submetido: boolean;

  constructor(
    _loadingController: LoadingController,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private datePicker: DatePicker,
    private pedidos: PedidosService,
    private clientes: ClientesService,
    private itensPedidos: ItensPedidosService,
    private modalCtrl: ModalController,
  ) {
    super(_loadingController);
    
    this.model = new Pedido();

    this.carregarValidadores();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      if (params["id"]) {
        this.pedidos.get(params["id"])
        .then((result: any) => {
          this.model = result;
          this.model.data = this.normalizarDataString(this.model.data);
          this.getListas();
        });
      }else{
        this.getListas();
      }
    });
  }

  getListas(){
    this.clientes.getAll().then((clientes: Cliente[]) => {
      this.listClientes = clientes;
    })

    if(this.model.id > 0){
      this.itensPedidos.getAll(this.model.id).then((itensPedidos: ItemPedido[]) => {
        this.listItems = itensPedidos;
      });
    }
  }

  salvar(){
    this.submetido = true;
    if (this.pedidoFormGroup.valid) {
      if(this.model.id > 0){
        this.pedidos.update(this.model).then(() => {
          this.mostrarMensagemSucesso("Pedido atualizado com sucesso!");
        });
      }else{
        this.pedidos.getMaxId().then((id: number) => {
          if(id>0){
            this.pedidos.insert(this.model).then(() => {
              this.model.id = id;
              this.mostrarMensagemSucesso("Pedido cadastrado com sucesso! Utilize o botão + para adicionar itens a este pedido.");
            });
          }
        })
      }
    } else {
      this.mostrarMensagemErro('Por favor, preencha todos os campos corretamente.');
    }
  }

  detalheItemPedido(id: number){
    console.log("Id do item pedido ", id);
    this.itensPedidos.get(id).then((itemPedido: ItemPedido) => {
      itemPedido.preco = itemPedido.preco / 100;
      this.informarItemPedido(itemPedido);
    });
  }

  async informarItemPedido(item){
    
    if(!item){
      item = new ItemPedido();
      item.pedido_id = this.model.id;
    }

    const modalInformarItemPedido = await this.modalCtrl.create({
      component: ItemPedidoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'item': item,
      }
    });

    await modalInformarItemPedido.present();

    const { data } = await modalInformarItemPedido.onWillDismiss();
    if(data){
      console.log(data);
      this.itensPedidos.getAll(this.model.id).then((itensPedidos: ItemPedido[]) => {
        this.listItems = itensPedidos;
      });
    }
  }

  public getData() {
    let data = new Date();

    if (this.model.data) {
      data = moment(this.model.data).toDate();
    }

    this.datePicker.show({
      date: data,
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.model.data = moment(date).format(this.isoDateFormat);
      },
      () => { }
    );
  }

  carregarValidadores(){
    this.pedidoFormGroup = this.formBuilder.group({
      cliente_id: ['', Validators.compose([Validators.required])],
      data: ['', Validators.compose([])],
      observacao: ['', Validators.compose([ Validators.maxLength(500) ])],
    });
  }

}
