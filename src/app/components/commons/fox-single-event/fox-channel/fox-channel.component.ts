import { Component, OnInit, Input } from '@angular/core';
import { StreamEventModel } from '../../../../models/fox-live/stream-event.model';

@Component({
  selector: 'fox-channel',
  templateUrl: './fox-channel.component.html',
  styleUrls: ['./fox-channel.component.scss']
})
export class FoxChannelComponent implements OnInit {

  @Input() public event: StreamEventModel;

  constructor() { }

  ngOnInit() {
  }

}
