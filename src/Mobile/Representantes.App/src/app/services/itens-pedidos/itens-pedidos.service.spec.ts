import { TestBed } from '@angular/core/testing';

import { ItensPedidosService } from './itens-pedidos.service';

describe('ItensPedidosService', () => {
  let service: ItensPedidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItensPedidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
