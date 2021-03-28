import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeDevicesComponent } from './age-devices.component';

describe('AgeDevicesComponent', () => {
  let component: AgeDevicesComponent;
  let fixture: ComponentFixture<AgeDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
