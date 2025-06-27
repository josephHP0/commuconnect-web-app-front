import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface NotificationData {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number; // milliseconds, 0 means no auto-close
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() show: boolean = false;
  @Input() data: NotificationData = {
    type: 'info',
    title: '',
    message: ''
  };
  @Output() close = new EventEmitter<void>();

  private timeoutId?: number;

  ngOnChanges() {
    if (this.show && this.data.duration && this.data.duration > 0) {
      this.clearTimeout();
      this.timeoutId = window.setTimeout(() => {
        this.closeNotification();
      }, this.data.duration);
    }
  }

  ngOnDestroy() {
    this.clearTimeout();
  }

  private clearTimeout() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  closeNotification() {
    this.clearTimeout();
    this.close.emit();
  }

  getIcon(): string {
    switch (this.data.type) {
      case 'success': return 'bi-check-circle-fill';
      case 'error': return 'bi-x-circle-fill';
      case 'warning': return 'bi-exclamation-triangle-fill';
      case 'info': return 'bi-info-circle-fill';
      default: return 'bi-info-circle-fill';
    }
  }
} 