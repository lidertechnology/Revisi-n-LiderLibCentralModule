// lidertechLibCentralModule/servicios/storage.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../config/firebase-config';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  public async subirArchivo(ruta: string, archivo: File): Promise<string | null> {
    this.states.set(StatesEnum.LOADING);
    try {
      const storageRef = ref(storage, ruta);
      await uploadBytes(storageRef, archivo);
      const url = await getDownloadURL(storageRef);
      this.states.set(StatesEnum.SUCCESS);
      return url;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return null;
    }
  }

  public async eliminarArchivo(url: string): Promise<void> {
    this.states.set(StatesEnum.LOADING);
    try {
      const archivoRef = ref(storage, url);
      await deleteObject(archivoRef);
      this.states.set(StatesEnum.SUCCESS);
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
    }
  }
}
