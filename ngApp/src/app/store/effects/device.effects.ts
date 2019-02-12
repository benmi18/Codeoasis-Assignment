import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { DeviceService } from '../../services/device.service';
import {
  DeviceActionTypes,
  LoadDevicesSuccess,
  LoadDevicesFailed
} from '../actions/device.actions';
import { Device } from '../../models/device.model';

@Injectable()
export class DeviceEffects {
  constructor(
    private actions$: Actions,
    private deviceService: DeviceService
  ) {}

  getDevices$: Observable<Action> = this.actions$.pipe(
    ofType(DeviceActionTypes.LoadDevices),
    switchMap(() =>
      this.deviceService.getAll().pipe(
        map((devices: Device[]) => new LoadDevicesSuccess(devices)),
        catchError(error => of(new LoadDevicesFailed(error)))
      )
    )
  );
}
