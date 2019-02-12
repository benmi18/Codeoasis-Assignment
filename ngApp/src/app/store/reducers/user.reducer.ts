import * as userActions from '../actions/user.actions';
import { User } from '../../models/user.model';

export interface State {
  user: User;
}

export const initialState: State = {
  user: { username: null, logedin: false, id: null }
};

// Selectors
export const getUser = (state: State) => state.user;

export function reducer(
  state = initialState,
  action: userActions.UserActions
): State {
  switch (action.type) {
    case userActions.UserActionTypes.SetUser:
      const user = action.payload;
      return {
        ...state,
        user
      };
    default:
      return state;
  }
}
