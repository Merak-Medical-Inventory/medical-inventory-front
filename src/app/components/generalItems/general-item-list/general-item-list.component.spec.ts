import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralItemListComponent } from './general-item-list.component';

describe('GeneralItemListComponent', () => {
  let component: GeneralItemListComponent;
  let fixture: ComponentFixture<GeneralItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
