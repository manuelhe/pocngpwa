import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxProgrammingComponent } from './fox-programming.component';

describe('FoxProgrammingComponent', () => {
  let component: FoxProgrammingComponent;
  let fixture: ComponentFixture<FoxProgrammingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxProgrammingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxProgrammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
