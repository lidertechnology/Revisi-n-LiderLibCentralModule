import { Injectable, signal, computed, WritableSignal, Signal, inject } from '@angular/core';
import { StatesEnum } from '../states/states.enum';
import { StatesService } from '../states/states.service';
import { Product } from './product.interface';

export interface ColeccionItem {  id?: string | number;}
export interface ItemCalculable {  price: number;  cantidad: number;}

@Injectable({  providedIn: 'root'})
  
export class ControladorService<T extends ColeccionItem> {

  // Estados
  private readonly statesService = inject(StatesService);  public readonly states = signal<StatesEnum>(StatesEnum.DEFAULT);

  // Variables
  private readonly _coleccion: WritableSignal<T[]> = signal<T[]>([]);
  public readonly coleccion: Signal<T[]> = this._coleccion.asReadonly();
  public readonly total = computed(() => {  const items = this._coleccion() as (T & ItemCalculable)[];   return items.reduce((acc, item) => {  if (item.price && item.cantidad) {  return acc + (item.price * item.cantidad);  } return acc;    }, 0);  });
  public readonly totalItems = computed(() => {  return this._coleccion().length; });

  // Métodos
  agregarItem(item: T): void {    this.states.set(StatesEnum.LOADING);    const coleccionActual = this._coleccion();    this._coleccion.set([...coleccionActual, item]);    this.states.set(StatesEnum.SUCCESS);  }
  eliminarItem(id: string | number): void {    this.states.set(StatesEnum.LOADING);    this._coleccion.update(coleccion => coleccion.filter(i => i.id !== id));    this.states.set(StatesEnum.SUCCESS);  }
  limpiarColeccion(): void {    this.states.set(StatesEnum.LOADING);    this._coleccion.set([]);    this.states.set(StatesEnum.SUCCESS);  }
  buscarItemPorId(id: string | number): T | undefined {    return this._coleccion().find(item => item.id === id);  }
  obtenerEstado(): StatesEnum {    return this.states();  }

}
