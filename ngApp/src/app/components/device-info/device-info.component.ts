import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';
import * as departmentActions from '../../store/actions/department.actions';
import * as deviceHistoryActions from '../../store/actions/device-history.actions';
import { AuthService } from '../../services/auth.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {
  logedin = false;
  form: FormGroup;
  departments: Department[] = [];
  rooms: number[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.form = new FormGroup({
      device_name: new FormControl(null, [Validators.required]),
      department: new FormControl('Department', [Validators.required]),
      room: new FormControl({ value: 'Room', disabled: true }, [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedOut()) {
      this.logedin = false;
      this.router.navigateByUrl('/login');
    } else {
      this.logedin = true;
    }

    this.store.dispatch(new departmentActions.LoadDepartments());
    this.store
      .select(fromRoot.getDepartments)
      .subscribe((departments: Department[]) => {
        this.departments = departments;
      });
  }

  departmentChanged() {
    this.form.get('room').enable();
    const selectedDepartment = this.departments.find(
      department => department.name === this.form.get('department').value
    );
    this.rooms = selectedDepartment.department_room_list;
  }

  handleSubmit() {
    this.store.dispatch(
      new deviceHistoryActions.AddDeviceToHistory(this.form.value)
    );
  }
}
