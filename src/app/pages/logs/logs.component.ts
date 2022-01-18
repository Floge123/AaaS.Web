import {Component, Input, OnInit} from '@angular/core';
import {Log} from '../../shared/domain/log/log';
import {LogService} from '../../shared/services/log.service';
import {environment} from '../../../environments/environment.prod';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
    selector: 'logs-cmp',
    moduleId: module.id,
    templateUrl: 'logs.component.html'
})

export class LogsComponent implements OnInit {
  logs: Log[];

  constructor(private logService: LogService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.appKey.subscribe(key => {
      this.logService.getByFilter(key, '')
        .subscribe(res => this.logs = res);
    })
  }

  refresh(logs: Log[]) {
    this.logs = logs;
  }
}
