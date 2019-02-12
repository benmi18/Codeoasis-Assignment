import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';
import * as UserActions from '../../store/actions/user.actions';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/info');
    }
  }

  handleLogin() {
    if (this.form.invalid) {
      return;
    }

    const username = this.form.value.username;
    const password = this.form.value.password;

    this.authService.login(username, password).subscribe(() => {
      this.router.navigateByUrl('/info');

      const user: User = JSON.parse(localStorage.getItem('user'));
      user.logedin = true;
      this.store.dispatch(new UserActions.SetUser(user));
    });
  }
}
