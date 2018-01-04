import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ServerResponseService } from '../../services/shared/server-response.service';

@Component({
  selector: 'fox-not-found',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
  providers: [ServerResponseService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotfoundComponent {

  constructor(responseService: ServerResponseService) {
    responseService.setNotFound();
  }

}

