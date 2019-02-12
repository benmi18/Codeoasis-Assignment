import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHistoryListComponent } from './device-history-list.component';

describe('DeviceHistoryListComponent', () => {
  let component: DeviceHistoryListComponent;
  let fixture: ComponentFixture<DeviceHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
