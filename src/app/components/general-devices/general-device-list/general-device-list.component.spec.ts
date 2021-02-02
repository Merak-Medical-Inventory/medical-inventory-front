import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDeviceListComponent } from './general-device-list.component';

describe('GeneralDeviceListComponent', () => {
  let component: GeneralDeviceListComponent;
  let fixture: ComponentFixture<GeneralDeviceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralDeviceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
