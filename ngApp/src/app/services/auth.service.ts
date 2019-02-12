import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';

import * as moment from 'moment';
import * as fromRoot from '../store/reducers';
import * as UserActions from '../store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000/auth/';
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  login(username: string, password: string) {
    return this.http
      .post(`${this.baseUrl}login`, { username, password })
      .pipe(map(res => this.setSession(res)));
  }

  logout(id) {
    this.http
      .get(`${this.baseUrl}logout/${id}`)
      .subscribe((res: { success: boolean; message: string }) => {
        if (res.success) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('expires_at');
          this.router.navigateByUrl('/login');
          this.store.dispatch(
            new UserActions.SetUser({
              logedin: false,
              username: null,
              id: null
            })
          );
        }
      });
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('user', JSON.stringify(authResult.user));
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
