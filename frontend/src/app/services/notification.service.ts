import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  error(value: string) {
    this.snackBar.open(value, 'OK', { duration: 0, panelClass: ['error-snackbar'] });
  }

  warning(value: string) {
    this.snackBar.open(value, 'OK', { duration: 5000, panelClass: ['warning-snackbar'] });
  }

  success(value: string) {
    this.snackBar.open(value, 'OK', { duration: 5000, panelClass: ['success-snackbar'] });
  }
}
