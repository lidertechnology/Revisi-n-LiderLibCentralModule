// lidertechLibCentralModule/servicios/read.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { collection, getDocs, query, limit, orderBy, startAfter, where, QueryDocumentSnapshot, DocumentData, collectionGroup } from 'firebase/firestore';
import { firestore } from '../../config/firebase-config';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class ReadService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);
  private ultimoDocumento: WritableSignal<QueryDocumentSnapshot<DocumentData> | null> = signal(null);

  public async leerDocumentos(
    coleccion: string,
    limite: number = 10
  ): Promise<any[]> {
    this.states.set(StatesEnum.LOADING);
    try {
      const coleccionRef = collection(firestore, coleccion);
      const q = query(coleccionRef, orderBy('creationDate'), limit(limite));
      const querySnapshot = await getDocs(q);
      const documentos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.ultimoDocumento.set(querySnapshot.docs[querySnapshot.docs.length - 1]);
      this.states.set(StatesEnum.SUCCESS);
      return documentos;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return [];
    }
  }

  public async leerSiguientePagina(
    coleccion: string,
    limite: number = 10
  ): Promise<any[]> {
    this.states.set(StatesEnum.PAGINATING);
    if (!this.ultimoDocumento()) {
      this.states.set(StatesEnum.SUCCESS);
      return [];
    }
    try {
      const coleccionRef = collection(firestore, coleccion);
      const q = query(coleccionRef, orderBy('creationDate'), startAfter(this.ultimoDocumento()), limit(limite));
      const querySnapshot = await getDocs(q);
      const documentos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.ultimoDocumento.set(querySnapshot.docs[querySnapshot.docs.length - 1]);
      this.states.set(StatesEnum.SUCCESS);
      return documentos;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return [];
    }
  }

  public async leerDocumentosConFiltro(
    coleccion: string,
    campo: string,
    operador: any,
    valor: any,
    limite: number = 10
  ): Promise<any[]> {
    this.states.set(StatesEnum.LOADING);
    try {
      const coleccionRef = collection(firestore, coleccion);
      const q = query(coleccionRef, where(campo, operador, valor), limit(limite));
      const querySnapshot = await getDocs(q);
      const documentos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.states.set(StatesEnum.SUCCESS);
      return documentos;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return [];
    }
  }

  public async leerColeccionesAnidadas(
    coleccionPrincipal: string,
    idDocumentoPrincipal: string,
    subcoleccion: string
  ): Promise<any[]> {
    this.states.set(StatesEnum.LOADING);
    try {
      const coleccionRef = collection(firestore, coleccionPrincipal, idDocumentoPrincipal, subcoleccion);
      const querySnapshot = await getDocs(coleccionRef);
      const documentos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.states.set(StatesEnum.SUCCESS);
      return documentos;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return [];
    }
  }
}
