import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DeviceHistory } from '../models/device-history.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceHistoryService {
  baseUrl = 'http://localhost:3000/info/';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }

  addNew(newDevice: DeviceHistory) {
    return this.http.post(this.baseUrl, newDevice);
  }
}
