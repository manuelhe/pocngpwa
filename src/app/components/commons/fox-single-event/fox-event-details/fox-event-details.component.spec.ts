import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxEventDetailsComponent } from './fox-event-details.component';

describe('ProgramDetailsComponent', () => {
  let component: FoxEventDetailsComponent;
  let fixture: ComponentFixture<FoxEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
