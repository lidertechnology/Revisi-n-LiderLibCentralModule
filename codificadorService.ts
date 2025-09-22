// lidertechLibCentralModule/servicios/codificador.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class CodificadorService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  public codificarProducto(
    idProducto: string,
    lote: string,
    fecha: string
  ): string {
    return `${idProducto}-${lote}-${fecha}`;
  }

  public geolocalizar(latitud: number, longitud: number): string {
    return `GEO-${latitud.toFixed(4)}-${longitud.toFixed(4)}`;
  }
}
