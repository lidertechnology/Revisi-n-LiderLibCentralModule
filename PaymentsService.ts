// lidertechLibCentralModule/servicios/payment.service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';
import { WriteService } from './write.service';
import { StatesEnum } from '../enums/states.enum';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import { TransakSDK } from '@transak/transak-sdk';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  public states: WritableSignal<StatesEnum> = signal(StatesEnum.DEFAULT);

  constructor(private writeService: WriteService) {}

  public async iniciarPago(proveedor: 'ramp' | 'transak', configuracion: any): Promise<void> {
    this.states.set(StatesEnum.LOADING);
    try {
      switch (proveedor) {
        case 'ramp':
          const ramp = new RampInstantSDK(configuracion);
          ramp.show();
          ramp.on('PURCHASE_SUCCESSFUL', async (datos: any) => {
            const transaccion = { ...datos, proveedor: 'ramp', fecha: new Date() };
            await this.writeService.crearDocumento('transacciones', null, transaccion);
            this.states.set(StatesEnum.SUCCESS);
          });
          break;

        case 'transak':
          const transak = new TransakSDK(configuracion);
          transak.init();
          transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, async (datos: any) => {
            const transaccion = { ...datos, proveedor: 'transak', fecha: new Date() };
            await this.writeService.crearDocumento('transacciones', null, transaccion);
            this.states.set(StatesEnum.SUCCESS);
          });
          break;

        default:
          throw new Error('Proveedor de pago no soportado.');
      }
    } catch (error) {
      this.states.set(StatesEnum.ERROR);
    }
  }
}
