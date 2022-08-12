import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { PrincipalComponent } from './principal/principal.component';
import { PedidoValidarComponent } from './pedido/pedido-validar/pedido-validar.component';
import { PedidoConsultarComponent } from './pedido/pedido-consultar/pedido-consultar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// **************************************************
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);
// **************************************************

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SpinnerComponent,
    HomeComponent,
    AuthenticationComponent,
    PrincipalComponent,
    PedidoValidarComponent,
    PedidoConsultarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
