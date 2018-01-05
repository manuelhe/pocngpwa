import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxStreamingComponent } from './fox-streaming.component';
import { FoxStreamingNowComponent } from './fox-streaming-now/fox-streaming-now.component';
import { FoxStreamingInformationComponent } from './fox-streaming-information/fox-streaming-information.component';

describe('FoxStreamingComponent', () => {
  let component: FoxStreamingComponent;
  let fixture: ComponentFixture<FoxStreamingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FoxStreamingComponent,
        FoxStreamingNowComponent,
        FoxStreamingInformationComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxStreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
