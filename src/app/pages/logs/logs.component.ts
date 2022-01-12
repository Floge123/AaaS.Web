import {Component, Input, OnInit} from '@angular/core';
import {Log} from '../../shared/domain/log/log';
import {LogService} from '../../shared/services/log.service';
import {environment} from '../../../environments/environment.prod';

@Component({
    selector: 'logs-cmp',
    moduleId: module.id,
    templateUrl: 'logs.component.html'
})

export class LogsComponent implements OnInit {
  @Input() logs: Log[];

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.logService.getByFilter(`${environment.appKey}`, '')
      .subscribe(res => this.logs = res);
  }

  refresh(logs: Log[]) {
    this.logs = logs;
  }
}
