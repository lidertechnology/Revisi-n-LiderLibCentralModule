// lidertechLibCentralModule/servicios/gestor-service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { WriteService } from './write.service';
import { ReadService } from './read.service';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class GestorService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  constructor(private writeService: WriteService, private readService: ReadService) {}

  public async registrarEvento(evento: {
    tipo: string;
    idEntidad: string;
    datos: any;
    usuario?: string;
  }): Promise<void> {
    this.states.set(StatesEnum.LOADING);
    try {
      const eventoAuditoria = {
        ...evento,
        fecha: new Date(),
      };
      await this.writeService.crearDocumento('auditoria', null, eventoAuditoria);
      this.states.set(StatesEnum.SUCCESS);
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
    }
  }

  public async obtenerHistorialCompleto(coleccion: string, idEntidad: string): Promise<any[]> {
    this.states.set(StatesEnum.LOADING);
    try {
      const historial = await this.readService.leerDocumentosConFiltro(
        'auditoria',
        'idEntidad',
        '==',
        idEntidad
      );
      this.states.set(StatesEnum.SUCCESS);
      return historial;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return [];
    }
  }

  public async obtenerReporteDeEventos(tipoEvento: string): Promise<any[]> {
    this.states.set(StatesEnum.LOADING);
    try {
      const reporte = await this.readService.leerDocumentosConFiltro(
        'auditoria',
        'tipo',
        '==',
        tipoEvento
      );
      this.states.set(StatesEnum.SUCCESS);
      return reporte;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return [];
    }
  }
}
