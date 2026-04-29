import { Injectable } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  showSuccess(message: string, summary: string = 'Success') {
    this.messageService.add({ severity: 'success', summary: summary, detail: message });
  }

  showError(message: string, summary: string = 'Error') {
    this.messageService.add({ severity: 'error', summary: summary, detail: message });
  }

  showInfo(message: string, summary: string = 'Info') {
    this.messageService.add({ severity: 'info', summary: summary, detail: message });
  }

  showWarning(message: string, summary: string = 'Warning') {
    this.messageService.add({ severity: 'warn', summary: summary, detail: message });
  }

  showDialog(message: string, header: string = 'Alert', icon: string = 'pi pi-info-circle', acceptLabel: string = 'OK') {
    this.confirmationService.confirm({
      message: message,
      header: header,
      icon: icon,
      acceptVisible: true,
      rejectVisible: false,
      acceptLabel: acceptLabel,
      accept: () => {}
    });
  }
}
