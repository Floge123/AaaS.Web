import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-detector-delete-button',
  templateUrl: './detector-delete-button.component.html',
  styleUrls: ['./detector-delete-button.component.css']
})
export class DetectorDeleteButtonComponent implements OnInit {
  @Input() detectorId: number;
  @Output() deleteEventEmitter = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  deleteDetector() {
    this.deleteEventEmitter.emit(this.detectorId);
  }

}
