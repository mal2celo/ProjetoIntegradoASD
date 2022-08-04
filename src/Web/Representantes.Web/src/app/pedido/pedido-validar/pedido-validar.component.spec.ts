import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoValidarComponent } from './pedido-validar.component';

describe('PedidoValidarComponent', () => {
  let component: PedidoValidarComponent;
  let fixture: ComponentFixture<PedidoValidarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoValidarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoValidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
