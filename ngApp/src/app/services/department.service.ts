import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl = 'http://localhost:3000/department/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl);
  }
}
