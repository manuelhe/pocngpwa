import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxEventStripComponent } from './fox-event-strip.component';

describe('FoxEventStripComponent', () => {
  let component: FoxEventStripComponent;
  let fixture: ComponentFixture<FoxEventStripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxEventStripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxEventStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
