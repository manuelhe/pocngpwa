import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxLogoutComponent } from './fox-logout.component';

describe('FoxLogoutComponent', () => {
  let component: FoxLogoutComponent;
  let fixture: ComponentFixture<FoxLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
