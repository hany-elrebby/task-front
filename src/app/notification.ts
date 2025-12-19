import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class Notification {

    constructor(private snackBar: MatSnackBar) {}

    success(message: string) {
        this.snackBar.open(message, 'OK', {
            duration: 3000,
            panelClass: ['snack-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }

    error(message: string) {
        this.snackBar.open(message, 'CLOSE', {
            duration: 5000,
            panelClass: ['snack-error'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }

    info(message: string) {
        this.snackBar.open(message, '', {
            duration: 3000,
            panelClass: ['snack-info']
        });
    }
}
