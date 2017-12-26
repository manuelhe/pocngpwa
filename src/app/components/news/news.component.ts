import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  public message: string;

  constructor(private msg:MsgService) {}

  ngOnInit() {
    this.message = this.msg.getMessage();
  }
}