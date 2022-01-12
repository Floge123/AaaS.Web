import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {Log} from '../../shared/domain/log/log';
import {LogService} from '../../shared/services/log.service';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-logs-search',
  templateUrl: './logs-search.component.html',
  styleUrls: ['./logs-search.component.css']
})
export class LogsSearchComponent implements OnInit {
  isLoading = false;
  @Output() keyup = new EventEmitter<string>();
  @Output() logsFetched = new EventEmitter<Log[]>();

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.keyup.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.logService.getByFilter(`${environment.appKey}`, searchTerm)),
      tap(() => this.isLoading = false)
    ).subscribe(logs => {
      console.log(logs);
      this.logsFetched.emit(logs)
    });
  }

}
