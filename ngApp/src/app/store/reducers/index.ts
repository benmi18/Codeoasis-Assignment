import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as User from '../reducers/user.reducer';
import * as Device from '../reducers/device.reducer';
import * as History from '../reducers/device-history.reducer';
import * as Department from '../reducers/department.reducer';

export interface State {
  user: User.State;
  device: Device.State;
  history: History.State;
  department: Department.State;
}

export const reducers: ActionReducerMap<State> = {
  user: User.reducer,
  device: Device.reducer,
  history: History.reducer,
  department: Department.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

// user selectors
export const selectUserState = createFeatureSelector<User.State>('user');
export const getUser = createSelector(
  selectUserState,
  User.getUser
);

// Device selectors
export const selectDeviceState = createFeatureSelector<Device.State>('device');
export const getDeviceArr = createSelector(
  selectDeviceState,
  Device.getDeviceArr
);
export const getUpdateDeviceData = createSelector(
  selectDeviceState,
  Device.getUpdateDeviceData
);

// history selectors
export const selectHistoryState = createFeatureSelector<History.State>(
  'history'
);
export const getHistory = createSelector(
  selectHistoryState,
  History.getHistory
);

// department selectors
export const selectDepartmentState = createFeatureSelector<Department.State>(
  'department'
);
export const getDepartments = createSelector(
  selectDepartmentState,
  Department.getDepartments
);
