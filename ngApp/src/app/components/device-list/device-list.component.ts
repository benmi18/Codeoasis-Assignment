import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';
import { Device } from '../../models/device.model';
import * as DeviceActions from '../../store/actions/device.actions';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  deviceArr: Device[] = [];
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new DeviceActions.LoadDevices());
    this.store
      .select(fromRoot.getDeviceArr)
      .subscribe((deviceArr: Device[]) => {
        this.deviceArr = deviceArr;
      });
  }

  delete(id: string) {
    this.store.dispatch(new DeviceActions.DeleteDevice(id));
  }

  edit(_id: string, name: string, description: string) {
    this.store.dispatch(
      new DeviceActions.EditDeviceData({ _id, name, description })
    );
  }
}
