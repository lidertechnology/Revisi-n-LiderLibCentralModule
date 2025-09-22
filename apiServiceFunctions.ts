// lidertechLibCentralModule/servicios/api.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceFunctions {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  constructor(private http: HttpClient) {}

  public async get<T>(url: string): Promise<T | null> {
    this.states.set(StatesEnum.LOADING);
    try {
      const datos = await firstValueFrom(this.http.get<T>(url));
      this.states.set(StatesEnum.SUCCESS);
      return datos;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return null;
    }
  }

  public async post<T>(url: string, cuerpo: any): Promise<T | null> {
    this.states.set(StatesEnum.LOADING);
    try {
      const datos = await firstValueFrom(this.http.post<T>(url, cuerpo));
      this.states.set(StatesEnum.SUCCESS);
      return datos;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return null;
    }
  }

  public async put<T>(url: string, cuerpo: any): Promise<T | null> {
    this.states.set(StatesEnum.LOADING);
    try {
      const datos = await firstValueFrom(this.http.put<T>(url, cuerpo));
      this.states.set(StatesEnum.SUCCESS);
      return datos;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return null;
    }
  }

  public async delete<T>(url: string): Promise<T | null> {
    this.states.set(StatesEnum.LOADING);
    try {
      const datos = await firstValueFrom(this.http.delete<T>(url));
      this.states.set(StatesEnum.SUCCESS);
      return datos;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return null;
    }
  }
}
