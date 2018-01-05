import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxMobileAppComponent } from './fox-mobile-app.component';

describe('FoxMobileAppComponent', () => {
  let component: FoxMobileAppComponent;
  let fixture: ComponentFixture<FoxMobileAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxMobileAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxMobileAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
