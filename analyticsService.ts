// lidertechLibCentralModule/servicios/analytics.service.ts
import { Injectable } from '@angular/core';
import { analytics } from '../../config/firebase-config';
import { logEvent } from 'firebase/analytics';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  public logEvento(nombre: string, parametros?: { [key: string]: any }): void {
    logEvent(analytics, nombre, parametros);
  }
}
