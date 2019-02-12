import { Action } from '@ngrx/store';

import { Device } from '../../models/device.model';
import { UpdateDeviceData } from '../../models/updateDeviceData.model';

export enum DeviceActionTypes {
  LoadDevices = '[Device] Load Devices',
  LoadDevicesSuccess = '[Device] Load Devices Success',
  LoadDevicesFailed = '[Device] Load Devices Failed',
  AddDevice = '[Device] Add Device',
  AddDeviceSuccess = '[Device] Add Device Success',
  AddDeviceFailed = '[Device] Add Device Failed',
  EditDeviceData = '[Device] Edit Device Data',
  EditDevice = '[Device] Edit Device',
  EditDeviceSuccess = '[Device] Edit Device Duccess',
  DeleteDevice = '[Device] Delete Device',
  DeleteDeviceSuccess = '[Device] Delete Device Success',
  DeleteDeviceFailed = '[Device] Delete Device Failed'
}

export class LoadDevices implements Action {
  readonly type = DeviceActionTypes.LoadDevices;
}

export class LoadDevicesSuccess implements Action {
  readonly type = DeviceActionTypes.LoadDevicesSuccess;
  constructor(public payload: Device[]) {}
}

export class LoadDevicesFailed implements Action {
  readonly type = DeviceActionTypes.LoadDevicesFailed;
  constructor(public payload: any) {}
}

export class EditDeviceData implements Action {
  readonly type = DeviceActionTypes.EditDeviceData;
  constructor(public payload: Device) {}
}

export class EditDevice implements Action {
  readonly type = DeviceActionTypes.EditDevice;
  constructor(public payload: { _id: string; data: Device }) {}
}

export class EditDeviceSuccess implements Action {
  readonly type = DeviceActionTypes.EditDeviceSuccess;
  constructor(public payload: { _id: string; data: Device }) {}
}

export class DeleteDevice implements Action {
  readonly type = DeviceActionTypes.DeleteDevice;
  constructor(public payload: string) {}
}

export class DeleteDeviceSuccess implements Action {
  readonly type = DeviceActionTypes.DeleteDeviceSuccess;
  constructor(public payload: string) {}
}

export class DeleteDeviceFailed implements Action {
  readonly type = DeviceActionTypes.DeleteDeviceFailed;
  constructor(public payload: any) {}
}

export class AddDevice implements Action {
  readonly type = DeviceActionTypes.AddDevice;
  constructor(public payload: Device) {}
}

export class AddDeviceSuccess implements Action {
  readonly type = DeviceActionTypes.AddDeviceSuccess;
  constructor(public payload: Device) {}
}

export class AddDeviceFailed implements Action {
  readonly type = DeviceActionTypes.AddDeviceFailed;
  constructor(public payload: any) {}
}

export type DeviceActions =
  | LoadDevices
  | LoadDevicesSuccess
  | LoadDevicesFailed
  | EditDevice
  | EditDeviceData
  | EditDeviceSuccess
  | DeleteDevice
  | DeleteDeviceSuccess
  | DeleteDeviceFailed
  | AddDevice
  | AddDeviceSuccess
  | AddDeviceFailed;
