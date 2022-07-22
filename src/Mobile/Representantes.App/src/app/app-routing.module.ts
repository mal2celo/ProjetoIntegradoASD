import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'consultar-pedidos',
    loadChildren: () => import('./pages/pedidos/consultar/consultar.module').then( m => m.ConsultarPageModule)
  },
  {
    path: 'manter-pedidos',
    loadChildren: () => import('./pages/pedidos/manter/manter.module').then( m => m.ManterPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'consultar-produtos',
    loadChildren: () => import('./pages/produtos/consultar/consultar.module').then( m => m.ConsultarPageModule)
  },
  {
    path: 'sincronizar',
    loadChildren: () => import('./pages/sincronizar/sincronizar.module').then( m => m.SincronizarPageModule)
  },
  {
    path: 'sair',
    loadChildren: () => import('./pages/sair/sair.module').then( m => m.SairPageModule)
  },
  {
    path: 'item-pedido',
    loadChildren: () => import('./pages/pedidos/item-pedido/item-pedido.module').then( m => m.ItemPedidoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
