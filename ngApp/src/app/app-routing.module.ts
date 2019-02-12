import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceInfoComponent } from './components/device-info/device-info.component';
import { LoginComponent } from './components/login/login.component';
import { EditDeviceComponent } from './components/edit-device/edit-device.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: EditDeviceComponent },
  { path: 'info', component: DeviceInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
