import { Component, Input } from '@angular/core';

@Component({
  selector: 'fox-btn-get-player',
  templateUrl: './fox-btn-get-player.component.html',
  styleUrls: ['./fox-btn-get-player.component.scss']
})
export class FoxBtnGetPlayerComponent {

  @Input() public event: any;

  constructor() { }

}
