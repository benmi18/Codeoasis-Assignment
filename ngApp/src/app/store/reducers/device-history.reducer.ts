import * as deviceHistoryActions from '../actions/device-history.actions';

import { DeviceHistory } from '../../models/device-history.model';

export interface State {
  historyArr: DeviceHistory[];
}

export const initialState: State = {
  historyArr: []
};

// Selectors
export const getHistory = (state: State) => {
  return state.historyArr;
};

export function reducer(
  state = initialState,
  action: deviceHistoryActions.DeviceHistoryActions
): State {
  switch (action.type) {
    case deviceHistoryActions.DeviceHistoryActionTypes
      .LoadDeviceHistorysSuccess:
      return {
        ...state,
        historyArr: action.payload
      };

    case deviceHistoryActions.DeviceHistoryActionTypes
      .AddDeviceToHistorySuccess:
      return {
        ...state,
        historyArr: [action.payload, ...state.historyArr]
      };

    default:
      return state;
  }
}
