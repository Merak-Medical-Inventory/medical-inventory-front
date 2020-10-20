import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCriticUnitComponent } from './stock-critic-unit.component';

describe('StockCriticUnitComponent', () => {
  let component: StockCriticUnitComponent;
  let fixture: ComponentFixture<StockCriticUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCriticUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCriticUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
