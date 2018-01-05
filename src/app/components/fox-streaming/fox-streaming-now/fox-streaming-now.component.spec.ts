import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FoxStreamingNowComponent } from './fox-streaming-now.component';

describe('FoxStreamingNowComponent', () => {
  let component: FoxStreamingNowComponent;
  let fixture: ComponentFixture<FoxStreamingNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FoxStreamingNowComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxStreamingNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
