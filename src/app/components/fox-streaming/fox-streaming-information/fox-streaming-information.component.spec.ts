import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxStreamingInformationComponent } from './fox-streaming-information.component';

describe('FoxStreamingInformationComponent', () => {
  let component: FoxStreamingInformationComponent;
  let fixture: ComponentFixture<FoxStreamingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FoxStreamingInformationComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxStreamingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
