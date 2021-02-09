import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerListComponent } from './maker-list.component';

describe('MakerListComponent', () => {
  let component: MakerListComponent;
  let fixture: ComponentFixture<MakerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
