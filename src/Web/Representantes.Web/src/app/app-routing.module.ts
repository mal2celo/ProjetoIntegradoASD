import { PedidoValidarComponent } from './pedido/pedido-validar/pedido-validar.component';
import { PedidoConsultarComponent } from './pedido/pedido-consultar/pedido-consultar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './account/shared/auth.guard';
import { AuthGuardLogin } from './account/shared/auth.guard.login';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { HomeComponent } from './layout/home/home.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: PrincipalComponent},
      { path: 'pedido_consultar', component: PedidoConsultarComponent},
      { path: 'pedido_validar', component: PedidoValidarComponent},
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent},
    ],
    canActivate: [AuthGuardLogin]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
