import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-detector-toggle-button',
  templateUrl: './detector-toggle-button.component.html',
  styleUrls: ['./detector-toggle-button.component.css']
})
export class DetectorToggleButtonComponent implements OnInit {
  @Input() detectorId: number;
  @Input() state: boolean;

  @Output() toggledEventEmitter = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  disable() {
    this.state = false;
    this.toggledEventEmitter.emit({id: this.detectorId, enabled: this.state});
  }

  enable() {
    this.state = true;
    this.toggledEventEmitter.emit({id: this.detectorId, enabled: this.state});
  }

}
