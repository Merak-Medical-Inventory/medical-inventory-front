import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsOrderComponent } from './items-order.component';

describe('ItemsOrderComponent', () => {
  let component: ItemsOrderComponent;
  let fixture: ComponentFixture<ItemsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
