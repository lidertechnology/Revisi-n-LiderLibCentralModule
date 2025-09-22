// lidertechLibCentralModule/servicios/write.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { doc, setDoc, addDoc, collection, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase-config';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class WriteService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  public async crearDocumento(
    coleccion: string,
    id: string | null,
    datos: any
  ): Promise<string> {
    this.states.set(StatesEnum.LOADING);
    try {
      const datosConFecha = { ...datos, creationDate: new Date(), lastUpdate: new Date() };
      if (id) {
        await setDoc(doc(firestore, coleccion, id), datosConFecha);
        this.states.set(StatesEnum.SUCCESS);
        return id;
      } else {
        const docRef = await addDoc(collection(firestore, coleccion), datosConFecha);
        this.states.set(StatesEnum.SUCCESS);
        return docRef.id;
      }
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return '';
    }
  }

  public async actualizarDocumento(
    coleccion: string,
    id: string,
    datos: any
  ): Promise<void> {
    this.states.set(StatesEnum.LOADING);
    try {
      const datosConFecha = { ...datos, lastUpdate: new Date() };
      await updateDoc(doc(firestore, coleccion, id), datosConFecha);
      this.states.set(StatesEnum.SUCCESS);
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
    }
  }

  public async eliminarDocumento(
    coleccion: string,
    id: string
  ): Promise<void> {
    this.states.set(StatesEnum.LOADING);
    try {
      await deleteDoc(doc(firestore, coleccion, id));
      this.states.set(StatesEnum.SUCCESS);
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
    }
  }
}
