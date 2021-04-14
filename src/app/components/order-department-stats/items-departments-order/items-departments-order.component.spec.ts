import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDepartmentsOrderComponent } from './items-departments-order.component';

describe('ItemsDepartmentsOrderComponent', () => {
  let component: ItemsDepartmentsOrderComponent;
  let fixture: ComponentFixture<ItemsDepartmentsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsDepartmentsOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsDepartmentsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
