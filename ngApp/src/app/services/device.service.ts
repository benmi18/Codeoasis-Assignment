import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  baseUrl = 'http://localhost:3000/device/';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }

  addNew(newDevice: Device) {
    return this.http.post(this.baseUrl, newDevice);
  }

  editOne(id: string, newData: Device) {
    return this.http.put(`${this.baseUrl}/${id}`, newData);
  }

  deleteOne(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
