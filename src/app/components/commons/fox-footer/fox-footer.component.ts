import { Component } from '@angular/core';

@Component({
  selector: 'fox-footer',
  templateUrl: './fox-footer.component.html',
  styleUrls: ['./fox-footer.component.scss']
})
export class FoxFooterComponent {

  constructor() {}

  public gotoTop(){
    window.scrollTo(0, 0);
  }

}
