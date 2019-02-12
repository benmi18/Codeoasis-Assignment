import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum UserActionTypes {
  LoadUser = '[User] Load User',
  SetUser = '[User] Set User'
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;
}

export class SetUser implements Action {
  readonly type = UserActionTypes.SetUser;
  constructor(public payload: User) {}
}

export type UserActions = LoadUser | SetUser;
