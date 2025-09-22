// lidertechLibCentralModule/servicios/grid-responsive.service.ts
import { Injectable, signal, WritableSignal, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class GridResposiveService {
  public esMovil: WritableSignal<boolean> = signal(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.esMovil.set(result.matches);
    });
  }

  public getColumnas(columnasBase: number): WritableSignal<number> {
    const columnas = signal(columnasBase);
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.Handset]) {
          columnas.set(1);
        } else if (result.breakpoints[Breakpoints.Tablet]) {
          columnas.set(2);
        } else if (result.breakpoints[Breakpoints.Web]) {
          columnas.set(columnasBase);
        }
      }
    });
    return columnas;
  }
}
