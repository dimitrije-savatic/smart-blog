import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new BehaviorSubject<Notification | null>(null);

  notification$ = this.notificationSubject.asObservable();

  show(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'success',
    duration = 3000
  ) {
    this.notificationSubject.next({
      message,
      type
    });

    setTimeout(() => {
      this.notificationSubject.next(null);
    }, duration);
  }
}