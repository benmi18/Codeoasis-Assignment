import { TestBed } from '@angular/core/testing';

import { DeviceHistoryService } from './device-history.service';

describe('DeviceHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceHistoryService = TestBed.get(DeviceHistoryService);
    expect(service).toBeTruthy();
  });
});
