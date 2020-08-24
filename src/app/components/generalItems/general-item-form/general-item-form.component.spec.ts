import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralItemFormComponent } from './general-item-form.component';

describe('GeneralItemFormComponent', () => {
  let component: GeneralItemFormComponent;
  let fixture: ComponentFixture<GeneralItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
