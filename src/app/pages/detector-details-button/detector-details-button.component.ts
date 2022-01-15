import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-detector-details-button',
  templateUrl: './detector-details-button.component.html',
  styleUrls: ['./detector-details-button.component.css']
})
export class DetectorDetailsButtonComponent implements OnInit {
  @Input() detectorId: number;
  @Output() openDetailsEventEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  openDetails() {
    this.openDetailsEventEmitter.emit(this.detectorId);
  }

}
