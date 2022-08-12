import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoConsultarComponent } from './pedido-consultar.component';

describe('PedidoConsultarComponent', () => {
  let component: PedidoConsultarComponent;
  let fixture: ComponentFixture<PedidoConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoConsultarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
