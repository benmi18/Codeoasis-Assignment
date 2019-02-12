import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';
import * as deviceHistoryActions from '../../store/actions/device-history.actions';
import { DeviceHistory } from '../../models/device-history.model';

@Component({
  selector: 'app-device-history-list',
  templateUrl: './device-history-list.component.html',
  styleUrls: ['./device-history-list.component.scss']
})
export class DeviceHistoryListComponent implements OnInit {
  historyArr: DeviceHistory[] = [];
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new deviceHistoryActions.LoadDeviceHistorys());
    this.store
      .select(fromRoot.getHistory)
      .subscribe((historyArr: DeviceHistory[]) => {
        this.historyArr = historyArr;
      });
  }
}
