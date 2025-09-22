// lidertechLibCentralModule/servicios/document-ai.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { ApiService } from './api.service';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class DocumentAiService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  constructor(private apiService: ApiService) {}

  public async procesarDocumento(datos: any): Promise<any> {
    this.states.set(StatesEnum.LOADING);
    try {
      const resultado = await this.apiService.post('url-de-tu-cloud-function-documentai', datos);
      this.states.set(StatesEnum.SUCCESS);
      return resultado;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return null;
    }
  }
}
