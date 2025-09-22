// lidertechLibCentralModule/servicios/calendario.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { WriteService } from './write.service';
import { ReadService } from './read.service';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class CalendarioService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  constructor(private writeService: WriteService, private readService: ReadService) {}

  public async crearEvento(evento: any): Promise<string> {
    this.states.set(StatesEnum.LOADING);
    try {
      const id = await this.writeService.crearDocumento('calendario-eventos', null, evento);
      this.states.set(StatesEnum.SUCCESS);
      return id;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return '';
    }
  }

  public async obtenerEventosPorRangoDeFechas(
    fechaInicio: Date,
    fechaFin: Date
  ): Promise<any[]> {
    this.states.set(StatesEnum.LOADING);
    try {
      const eventos = await this.readService.leerDocumentosConFiltro(
        'calendario-eventos',
        'fecha',
        '>=',
        fechaInicio
      );
      const eventosFiltrados = eventos.filter(evento => evento.fecha <= fechaFin);
      this.states.set(StatesEnum.SUCCESS);
      return eventosFiltrados;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return [];
    }
  }
}
