// lidertechLibCentralModule/servicios/logistica.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { CapacitorService } from './capacitor.service';
import { WriteService } from './write.service';
import { ReadService } from './read.service';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class LogisticaService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  constructor(
    private capacitorService: CapacitorService,
    private writeService: WriteService,
    private readService: ReadService
  ) {}

  public async registrarEntrega(idPedido: string, detalles: any): Promise<void> {
    this.states.set(StatesEnum.LOADING);
    try {
      const posicion = await this.capacitorService.obtenerGeolocalizacion();
      if (!posicion) {
        throw new Error('No se pudo obtener la geolocalización');
      }

      const datosEntrega = {
        ...detalles,
        idPedido,
        latitud: posicion.coords.latitude,
        longitud: posicion.coords.longitude,
        fechaEntrega: new Date(),
      };
      await this.writeService.crearDocumento('entregas', null, datosEntrega);
      this.states.set(StatesEnum.SUCCESS);
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
    }
  }

  public async obtenerRutasOptimizadas(): Promise<any[] | null> {
    this.states.set(StatesEnum.LOADING);
    try {
      const entregasPendientes = await this.readService.leerDocumentosConFiltro(
        'entregas',
        'estado',
        '==',
        'pendiente'
      );
      if (!entregasPendientes) {
        this.states.set(StatesEnum.SUCCESS);
        return null;
      }
      
      const rutasCalculadas = entregasPendientes.map((entrega: any) => {
        return {
          id: entrega.id,
          ubicacion: `${entrega.latitud},${entrega.longitud}`,
          horaEstimada: 'TBD'
        }
      });
      this.states.set(StatesEnum.SUCCESS);
      return rutasCalculadas;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return null;
    }
  }
}
