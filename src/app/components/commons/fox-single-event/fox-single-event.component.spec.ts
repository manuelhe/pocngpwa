import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxSingleEventComponent } from './fox-single-event.component';
import { FoxEventDetailsComponent } from './fox-event-details/fox-event-details.component';

describe('FoxSingleEventComponent', () => {
  let component: FoxSingleEventComponent;
  let fixture: ComponentFixture<FoxSingleEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FoxSingleEventComponent,
        FoxEventDetailsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxSingleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
