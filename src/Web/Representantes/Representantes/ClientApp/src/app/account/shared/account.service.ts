
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolesKeys } from './RolesKeys';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private sessaoExpirada: boolean = false;

  constructor(private http: HttpClient, private router: Router) { 
  }

  async login(user: any) {
    var data = {
      matricula: user.matricula,
      senha: user.senha
    };

    const result = await this.http.post<any>(`${environment.api}/Usuarios/authenticate`, data).toPromise();
    
    console.log(result);

    if (result && result.token) {
      localStorage.setItem(this.JWT_TOKEN, result.token);
      localStorage.setItem(this.REFRESH_TOKEN, result.token);
      return true;
    }

    return false;
  }

  logoff() {
    this.sessaoExpirada = false;
    window.localStorage.clear();
    this.router.navigate(['login']);
  }

  sessaoExpirou() {
    this.sessaoExpirada = true;
    window.localStorage.clear();
    this.router.navigate(['login']);
  }

  isSessaoExpirou() {
    return this.sessaoExpirada;
  }

  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem(this.JWT_TOKEN);
    return token;
  }

  getRefreshToken() {
    const refreshToken = window.localStorage.getItem(this.REFRESH_TOKEN);
    return refreshToken;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return new Date(0);
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    }

    return true;
  }

  refreshToken() {
    let data = `refresh_token=${this.getRefreshToken()}&grant_type=refresh_token&client_id=${environment.client_id}`;
    return this.http.post<any>(`${environment.api}/oauth2/token`, data).pipe(tap((tokens: any) => {
      localStorage.setItem(this.JWT_TOKEN, tokens.access_token);
      localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
    }));
  }

  getPayloadToken() {
    const token = this.getAuthorizationToken();
    if (token) {
      return jwt_decode(token);
    }
  }

  getUsuarioLogado() {
    const token = this.getAuthorizationToken();
    if (token) {
      const payload: any = jwt_decode(token);
      if (payload.NomePessoaUsuario) {
        return payload.NomePessoaUsuario;
      }
    }
    return "";
  }

  getRoles() {
    const token = this.getAuthorizationToken();
    if (token) {
      const payload: any = jwt_decode(token);
      if (payload.role) {
        return payload.role;
      }
    }
    return [];
  }

  getMenuPrincipal(): ItemMenu[] {
    let itens: ItemMenu[] = [];

    itens.push(new ItemMenu("Painel Gerencial", ""));
    itens.push(new ItemMenu("Pedidos", "pedido_consultar"));

    return itens;
  }
}

export class ItemMenu {
  label: string = "";
  rota: string = "";

  constructor(label: string, rota: string) {
    this.label = label;
    this.rota = rota;
  }
}

