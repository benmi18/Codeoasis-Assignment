import { Action } from '@ngrx/store';

import { DeviceHistory } from '../../models/device-history.model';

export enum DeviceHistoryActionTypes {
  LoadDeviceHistorys = '[DeviceHistory] Load DeviceHistorys',
  LoadDeviceHistorysSuccess = '[DeviceHistory] Load DeviceHistorys Success',
  AddDeviceToHistory = '[DeviceHistory] Add Device To History',
  AddDeviceToHistorySuccess = '[DeviceHistory] Add Device To History Success'
}

export class LoadDeviceHistorys implements Action {
  readonly type = DeviceHistoryActionTypes.LoadDeviceHistorys;
}

export class LoadDeviceHistorysSuccess implements Action {
  readonly type = DeviceHistoryActionTypes.LoadDeviceHistorysSuccess;
  constructor(public payload: DeviceHistory[]) {}
}

export class AddDeviceToHistory implements Action {
  readonly type = DeviceHistoryActionTypes.AddDeviceToHistory;
  constructor(public payload: DeviceHistory) {}
}

export class AddDeviceToHistorySuccess implements Action {
  readonly type = DeviceHistoryActionTypes.AddDeviceToHistorySuccess;
  constructor(public payload: DeviceHistory) {}
}

export type DeviceHistoryActions =
  | LoadDeviceHistorys
  | LoadDeviceHistorysSuccess
  | AddDeviceToHistory
  | AddDeviceToHistorySuccess;
