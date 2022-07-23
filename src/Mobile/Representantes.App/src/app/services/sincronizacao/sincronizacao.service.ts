import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SincronizacaoService {

  constructor() { }

  public sincronizar(){
    return new Promise( resolve => setTimeout(resolve, 3000) );
  }
}
