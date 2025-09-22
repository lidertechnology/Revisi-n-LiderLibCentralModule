// lidertechLibCentralModule/servicios/capacitor.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Network, NetworkStatus } from '@capacitor/network';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatesEnum } from '../enums/states.enum';

@Injectable({
  providedIn: 'root',
})
export class CapacitorService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  public async tomarFoto(): Promise<Photo | null> {
    this.states.set(StatesEnum.LOADING);
    try {
      const foto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
      this.states.set(StatesEnum.SUCCESS);
      return foto;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return null;
    }
  }

  public async obtenerGeolocalizacion(): Promise<Position | null> {
    this.states.set(StatesEnum.LOADING);
    try {
      const posicion = await Geolocation.getCurrentPosition();
      this.states.set(StatesEnum.SUCCESS);
      return posicion;
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
      return null;
    }
  }

  public async obtenerEstadoRed(): Promise<NetworkStatus> {
    return Network.getStatus();
  }

  public async vibrar(duracionMs: number): Promise<void> {
    await Haptics.impact({ style: ImpactStyle.Light });
    await Haptics.vibrate({ duration: duracionMs });
  }

  public async pedirPermisosCamara(): Promise<void> {
    await Camera.requestPermissions({ permissions: ['camera'] });
  }
  
  public async pedirPermisosGeolocalizacion(): Promise<void> {
    await Geolocation.requestPermissions({ permissions: ['location'] });
  }
}
