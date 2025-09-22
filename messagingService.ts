// lidertechLibCentralModule/servicios/messaging.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { messaging } from '../../config/firebase-config';
import { getToken, onMessage } from 'firebase/messaging';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  public async solicitarPermisosNotificaciones(): Promise<string | null> {
    this.states.set(StatesEnum.LOADING);
    try {
      const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
      this.states.set(StatesEnum.SUCCESS);
      return token;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return null;
    }
  }

  public recibirMensajes(): void {
    onMessage(messaging, (payload) => {
      this.states.set(StatesEnum.SUCCESS);
    });
  }
}
