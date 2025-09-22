// lidertechLibCentralModule/servicios/auth.service.ts
import { Injectable, signal, WritableSignal, computed } from '@angular/core';
import { auth, firestore } from '../../config/firebase-config';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);
  private _usuario: WritableSignal<User | null> = signal(null);
  public usuario = this._usuario.asReadonly();
  public tieneRolAdmin = computed(() => {
    return this.usuario()?.email === 'admin@lidertech.com';
  });

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this._usuario.set(user);
    });
  }

  public async iniciarSesion(correo: string, contrasena: string): Promise<void> {
    this.states.set(StatesEnum.LOADING);
    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      this.states.set(StatesEnum.SUCCESS);
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
    }
  }

  public async cerrarSesion(): Promise<void> {
    this.states.set(StatesEnum.LOADING);
    try {
      await signOut(auth);
      this.states.set(StatesEnum.SUCCESS);
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
    }
  }
}
