import { Action } from '@ngrx/store';

import { Department } from '../../models/department.model';

export enum DepartmentActionTypes {
  LoadDepartments = '[Department] Load Departments',
  LoadDepartmentsSuccess = '[Department] Load Departments Success',
  SetSelectedDepartment = '[Department] Set Selected Department'
}

export class LoadDepartments implements Action {
  readonly type = DepartmentActionTypes.LoadDepartments;
}

export class LoadDepartmentsSuccess implements Action {
  readonly type = DepartmentActionTypes.LoadDepartmentsSuccess;
  constructor(public payload: Department[]) {}
}

export class SetSelectedDepartment implements Action {
  readonly type = DepartmentActionTypes.SetSelectedDepartment;
  constructor(public payload: Department) {}
}

export type DepartmentActions =
  | LoadDepartments
  | LoadDepartmentsSuccess
  | SetSelectedDepartment;
