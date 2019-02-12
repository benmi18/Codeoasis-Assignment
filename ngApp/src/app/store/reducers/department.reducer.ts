import * as departmentActions from '../actions/department.actions';

import { Department } from '../../models/department.model';

export interface State {
  departments: Department[];
}

export const initialState: State = {
  departments: []
};

// Selectors
export const getDepartments = (state: State) => {
  return state.departments;
};

export function reducer(
  state = initialState,
  action: departmentActions.DepartmentActions
): State {
  switch (action.type) {
    case departmentActions.DepartmentActionTypes.LoadDepartmentsSuccess:
      return {
        ...state,
        departments: action.payload
      };
    default:
      return state;
  }
}
