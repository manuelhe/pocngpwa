import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxModalComponent } from './fox-modal.component';

describe('FoxModalComponent', () => {
  let component: FoxModalComponent;
  let fixture: ComponentFixture<FoxModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
