import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MsgService } from '../service/msg.service';

@Component({
  selector: 'home',
  template: `<h3>{{ message }}</h3>`
})
export class HomeComponent implements OnInit {
  public message: string;

  constructor(private msg:MsgService) {}

  ngOnInit() {
    this.message = this.msg.getMessage();
  }
}