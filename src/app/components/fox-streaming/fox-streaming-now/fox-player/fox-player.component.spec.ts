import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxPlayerComponent } from './fox-player.component';

describe('FoxPlayerComponent', () => {
  let component: FoxPlayerComponent;
  let fixture: ComponentFixture<FoxPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxPlayerComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
