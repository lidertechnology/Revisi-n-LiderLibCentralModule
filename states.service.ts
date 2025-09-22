// lidertechLibCentralModule/servicios/states.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  public establecerEstado(estado: StatesEnum): void {
    this.states.set(estado);
  }
}
