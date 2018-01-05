import { Component, OnInit } from '@angular/core';
import { FoxUserService } from '../../services/fox-user/fox-user.service';

@Component({
  selector: 'fox-logout',
  templateUrl: './fox-logout.component.html',
  styleUrls: ['./fox-logout.component.scss']
})
export class FoxLogoutComponent implements OnInit {

  constructor( private userService: FoxUserService ) { }

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      if (user && user.loggedin) {
        localStorage.setItem('trackLogout', user.rawUser.id.toString());
        this.userService.logout();
      }
    }).unsubscribe();
  }

}
