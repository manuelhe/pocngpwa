import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoxFooterComponent } from './fox-footer.component';

describe('ProgramDetailsComponent', () => {
  let component: FoxFooterComponent;
  let fixture: ComponentFixture<FoxFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoxFooterComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
