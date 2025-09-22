// lidertechLibCentralModule/servicios/snack-bar.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public mostrarMensaje(
    mensaje: string,
    accion: string = 'Cerrar',
    duracion: number = 3000
  ): void {
    this.snackBar.open(mensaje, accion, {
      duration: duracion,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}
