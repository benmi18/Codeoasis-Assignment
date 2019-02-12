import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';
import * as UserActions from '../../store/actions/user.actions';
import { AuthService } from '../../services/auth.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {
    this.store.select(fromRoot.getUser).subscribe((user: User) => {
      if (user.username) {
        this.user = user;
      }
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.user.logedin = true;
      this.store.dispatch(new UserActions.SetUser(this.user));
    }
  }

  logout() {
    this.authService.logout(this.user.id);
    this.user.logedin = false;
  }
}
