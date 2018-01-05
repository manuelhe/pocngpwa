import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxBtnGetPlayerComponent } from './fox-btn-get-player.component';

describe('FoxBtnGetPlayerComponent', () => {
  let component: FoxBtnGetPlayerComponent;
  let fixture: ComponentFixture<FoxBtnGetPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxBtnGetPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxBtnGetPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
