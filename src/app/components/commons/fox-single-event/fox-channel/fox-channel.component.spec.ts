import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxChannelComponent } from './fox-channel.component';

describe('FoxChannelComponent', () => {
  let component: FoxChannelComponent;
  let fixture: ComponentFixture<FoxChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
