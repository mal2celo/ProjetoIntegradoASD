import { ItensPedidosService } from './../../../services/itens-pedidos/itens-pedidos.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { PaginaBase } from 'src/app/base.page';
import { ItemPedido } from 'src/app/services/itens-pedidos/itens-pedidos.service';
import { Produto, ProdutosService } from 'src/app/services/produtos/produtos.service';

@Component({
  selector: 'app-item-pedido',
  templateUrl: './item-pedido.page.html',
  styleUrls: ['./item-pedido.page.scss'],
})
export class ItemPedidoPage extends PaginaBase {

  @Input() item: ItemPedido;
  
  model: ItemPedido;
  itemPedidoFormGroup: FormGroup;
  listProdutos: any[] = [];
  submetido: boolean;
  
  constructor(
    _loadingController: LoadingController,
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private produtos: ProdutosService,
    private itensPedidos: ItensPedidosService,
  ) { 
    super(_loadingController);
    this.submetido = false;
    this.model = new ItemPedido();
    this.carregarValidadores();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log(this.item);

    this.model = this.item;
    this.getListas();
  }

  getListas(){
    this.produtos.getAll().then((produtos: Produto[]) => {
      this.listProdutos = produtos;
    });
  }

  fecharModal() {
    this.modalCtrl.dismiss();
  }

  salvar(): void {
    this.submetido = true;
    if (this.itemPedidoFormGroup.valid) {
      this.model.preco = this.model.preco * 100;
      if(this.model.id > 0){
        this.itensPedidos.update(this.model).then(() => {
          this.modalCtrl.dismiss({
            item: this.model
          });
        });
      }else{
        this.itensPedidos.insert(this.model).then(() => {
          this.modalCtrl.dismiss({
            item: this.model
          });
        });
      }
    } else {
      this.mostrarMensagemErro('Por favor, preencha todos os campos corretamente.');
    }
  }

  protected carregarValidadores(): void {
    this.itemPedidoFormGroup = this.formBuilder.group({
      produto_id: ['', Validators.compose([Validators.required])],
      observacao: ['', Validators.compose([ Validators.maxLength(500) ])],
      preco: ['', [Validators.required, Validators.pattern('\\d{1,6}(\\.\\d{1,2})?'), Validators.max(99999.99), Validators.min(1)]],
      quantidade: ['', Validators.compose([Validators.required])],
    });
  }

}
