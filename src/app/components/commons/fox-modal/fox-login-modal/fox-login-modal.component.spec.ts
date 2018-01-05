import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Commons
import { FoxLoginModalComponent } from './fox-login-modal.component';
import { FoxModalComponent } from '../fox-modal.component';


// Pipes
import { SafeUrlPipe } from '../../../../pipes/safe-url.pipe';

// Bootstrap components
import { ModalModule } from 'ngx-bootstrap/modal';

describe('FoxLoginModalComponent', () => {
  let component: FoxLoginModalComponent;
  let fixture: ComponentFixture<FoxLoginModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FoxLoginModalComponent,
        FoxModalComponent,

        // Pipes
        SafeUrlPipe
      ],
      imports: [
        ModalModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoxLoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
