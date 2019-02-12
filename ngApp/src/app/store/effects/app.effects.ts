import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { DeviceService } from '../../services/device.service';
import { DeviceHistoryService } from '../../services/device-history.service';
import { DepartmentService } from '../../services/department.service';
import * as deviceActions from '../actions/device.actions';
import * as deviceHistoryActions from '../actions/device-history.actions';
import * as departmentActions from '../actions/department.actions';
import { Device } from '../../models/device.model';
import { DeviceHistory } from '../../models/device-history.model';
import { Department } from '../../models/department.model';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private deviceService: DeviceService,
    private deviceHistoryService: DeviceHistoryService,
    private departmentService: DepartmentService
  ) {}

  @Effect()
  getDevices$ = this.actions$.pipe(
    ofType(deviceActions.DeviceActionTypes.LoadDevices),
    switchMap(() => {
      return this.deviceService.getAll().pipe(
        map((response: { success: boolean; devices: Device[] }) => {
          return new deviceActions.LoadDevicesSuccess(response.devices);
        })
      );
    })
  );

  @Effect()
  addDevices$ = this.actions$.pipe(
    ofType(deviceActions.DeviceActionTypes.AddDevice),
    switchMap((payload: { payload: Device; type: string }) => {
      return this.deviceService.addNew(payload.payload).pipe(
        map((response: { success: boolean; newDev?: Device; err?: any }) => {
          if (response.success) {
            return new deviceActions.AddDeviceSuccess(response.newDev);
          }
          return new deviceActions.AddDeviceFailed(response);
        })
      );
    })
  );

  @Effect()
  deleteDevices$ = this.actions$.pipe(
    ofType(deviceActions.DeviceActionTypes.DeleteDevice),
    switchMap((payload: { payload: string; type: string }) => {
      return this.deviceService.deleteOne(payload.payload).pipe(
        map((response: { success: boolean; dbResult?: Device; err?: any }) => {
          if (response.success) {
            return new deviceActions.DeleteDeviceSuccess(payload.payload);
          }
          return new deviceActions.AddDeviceFailed(response);
        })
      );
    })
  );

  @Effect()
  editDevices$ = this.actions$.pipe(
    ofType(deviceActions.DeviceActionTypes.EditDevice),
    switchMap((payload: { payload: { _id: string; data: Device } }) => {
      return this.deviceService
        .editOne(payload.payload._id, payload.payload.data)
        .pipe(
          map((response: { success: boolean; results?: Device; err?: any }) => {
            if (response.success) {
              return new deviceActions.EditDeviceSuccess({
                _id: payload.payload._id,
                data: payload.payload.data
              });
            }
            // return new deviceActions.AddDeviceFailed(response);
          })
        );
    })
  );

  // DEVICE HISTORY EFFECTS

  @Effect()
  getHistory$ = this.actions$.pipe(
    ofType(deviceHistoryActions.DeviceHistoryActionTypes.LoadDeviceHistorys),
    switchMap(() => {
      return this.deviceHistoryService.getAll().pipe(
        map((response: { success: boolean; history: DeviceHistory[] }) => {
          return new deviceHistoryActions.LoadDeviceHistorysSuccess(
            response.history
          );
        })
      );
    })
  );

  @Effect()
  getDeviceToHistory$ = this.actions$.pipe(
    ofType(deviceHistoryActions.DeviceHistoryActionTypes.AddDeviceToHistory),
    switchMap((payload: { payload: DeviceHistory }) => {
      return this.deviceHistoryService.addNew(payload.payload).pipe(
        map((response: { success: boolean; history: DeviceHistory[] }) => {
          return new deviceHistoryActions.AddDeviceToHistorySuccess(
            payload.payload
          );
        })
      );
    })
  );

  // DEPARTMENT EFFECTS

  @Effect()
  getDepartments$ = this.actions$.pipe(
    ofType(departmentActions.DepartmentActionTypes.LoadDepartments),
    switchMap(() => {
      return this.departmentService.getAll().pipe(
        map((response: { success: boolean; departments: Department[] }) => {
          return new departmentActions.LoadDepartmentsSuccess(
            response.departments
          );
        })
      );
    })
  );
}
