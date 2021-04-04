import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsOrderComponent } from './departments-order.component';

describe('DepartmentsOrderComponent', () => {
  let component: DepartmentsOrderComponent;
  let fixture: ComponentFixture<DepartmentsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentsOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
