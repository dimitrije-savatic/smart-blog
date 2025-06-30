import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.css',
})
export class NotificationModalComponent {
  @Input() notification!: string;
  @Input() body!: string;
  @Input() borderColor: string = 'black';
  @Input() buttonColor: string = 'green';
  @Input() newLocation!: string;

  reload() {
    if (this.newLocation === '') {
      window.location.reload();
    } else {
      window.location.replace(this.newLocation);
    }
  }
}
