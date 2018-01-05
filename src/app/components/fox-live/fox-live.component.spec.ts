import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxLiveComponent } from './fox-live.component';

describe('LiveComponent', () => {
  let component: FoxLiveComponent;
  let fixture: ComponentFixture<FoxLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
