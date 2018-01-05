import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fox-modal',
  templateUrl: './fox-modal.component.html',
  styleUrls: ['./fox-modal.component.scss']
})
export class FoxModalComponent implements OnInit {
  @Input() public title: string;
  @Output() public onClose: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  hasTitle() {
    return this.title ? true : false;
  }

  close() {
    this.onClose.emit();
  }
}
