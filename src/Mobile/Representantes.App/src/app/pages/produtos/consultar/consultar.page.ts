import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos/produtos.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.page.html',
  styleUrls: ['./consultar.page.scss'],
})
export class ConsultarPage implements OnInit {
  
  listProdutos: any[] = [];
  
  constructor(
    private produtos: ProdutosService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.consultarProdutos();
  }

  consultarProdutos(){
    this.produtos.getAll().then((list: any[]) => {
      this.listProdutos = list
    })
  }

}
