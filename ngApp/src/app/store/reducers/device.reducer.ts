import * as deviceActions from '../actions/device.actions';

import { Device } from '../../models/device.model';

export interface State {
  deviceArr: Device[];
  updateDeviceData: Device;
  error: any;
}

export const initialState: State = {
  deviceArr: [],
  updateDeviceData: { _id: null, name: null, description: null },
  error: null
};

// Selectors
export const getDeviceArr = (state: State) => {
  return state.deviceArr;
};

export const getUpdateDeviceData = (state: State) => {
  return state.updateDeviceData;
};

export function reducer(
  state = initialState,
  action: deviceActions.DeviceActions
): State {
  switch (action.type) {
    case deviceActions.DeviceActionTypes.LoadDevicesSuccess:
      const loadedDevices: Device[] = action.payload;
      return {
        ...state,
        deviceArr: loadedDevices
      };

    case deviceActions.DeviceActionTypes.LoadDevicesFailed:
      const error: any = action.payload;
      return {
        ...state,
        error
      };

    case deviceActions.DeviceActionTypes.AddDeviceSuccess:
      const newDevice: Device = action.payload;
      return {
        ...state,
        deviceArr: [newDevice, ...state.deviceArr]
      };

    case deviceActions.DeviceActionTypes.DeleteDeviceSuccess:
      const idToDelete: string = action.payload;
      return {
        ...state,
        deviceArr: [
          ...state.deviceArr.filter(device => device._id !== idToDelete)
        ]
      };

    case deviceActions.DeviceActionTypes.EditDeviceData:
      return {
        ...state,
        updateDeviceData: action.payload
      };

    case deviceActions.DeviceActionTypes.EditDeviceSuccess:
      const updateDeviceData: Device = action.payload.data;
      const id = action.payload._id;
      // Copy of deviceArr
      const tempDeviceArr = [...state.deviceArr];
      // Find the needed device
      const needToEditIndex = tempDeviceArr.findIndex(
        (device: Device) => device._id === id
      );
      // Update the new data
      tempDeviceArr[needToEditIndex] = updateDeviceData;
      return {
        ...state,
        deviceArr: tempDeviceArr
      };
    default:
      return state;
  }
}
