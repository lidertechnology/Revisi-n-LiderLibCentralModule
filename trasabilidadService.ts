// lidertechLibCentralModule/servicios/trazabilidad.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class TrazabilidadService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  public generarIdTrazabilidad(prefijo: string): string {
    const timestamp = new Date().getTime().toString(36);
    const aleatorio = Math.random().toString(36).substring(2, 7);
    return `${prefijo}-${timestamp}-${aleatorio}`.toUpperCase();
  }
}
