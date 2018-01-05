import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxHeaderNavigationComponent } from './fox-header-navigation.component';

describe('FoxHeaderNavigationComponent', () => {
  let component: FoxHeaderNavigationComponent;
  let fixture: ComponentFixture<FoxHeaderNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxHeaderNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxHeaderNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
