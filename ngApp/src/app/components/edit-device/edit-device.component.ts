import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';
import * as DeviceActions from '../../store/actions/device.actions';
import { Device } from '../../models/device.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss']
})
export class EditDeviceComponent implements OnInit {
  logedin = false;
  form: FormGroup;
  editDeviceData: Device;
  editMode = false;
  disable = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.store.select(fromRoot.getUpdateDeviceData).subscribe(data => {
      this.form = new FormGroup({
        _id: new FormControl({ value: data._id, disabled: this.disable }, [
          Validators.required
        ]),
        name: new FormControl(data.name, [Validators.required]),
        description: new FormControl(data.description, [Validators.required])
      });
      this.editDeviceData = data;
      if (data._id) {
        this.editMode = true;
        this.disable = true;
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedOut()) {
      this.logedin = false;
      this.router.navigateByUrl('/login');
    } else {
      this.logedin = true;
    }
  }

  handleSubmit() {
    if (this.editMode) {
      const updatedDevice: Device = this.form.value;
      this.store.dispatch(
        new DeviceActions.EditDevice({
          _id: this.editDeviceData._id,
          data: updatedDevice
        })
      );
    } else {
      if (this.form.valid) {
        const newDevice: Device = this.form.value;
        this.store.dispatch(new DeviceActions.AddDevice(newDevice));
      }
    }
  }

  ngOnDestroy() {
    this.store.dispatch(
      new DeviceActions.EditDeviceData({
        _id: null,
        name: null,
        description: null
      })
    );
    this.editMode = false;
  }
}
