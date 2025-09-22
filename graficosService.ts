// lidertechLibCentralModule/servicios/graf.service.ts
import { Injectable } from '@angular/core';
import { Chart, ChartType, ChartData, ChartOptions, ChartConfiguration } from 'chart.js';
import { CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend, ArcElement, LineController, PointElement, LineElement, RadialLinearScale, Filler } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend, ArcElement, LineController, PointElement, LineElement, RadialLinearScale, Filler);

@Injectable({
  providedIn: 'root',
})
export class GraficosService {
  public crearConfiguracionGrafico(
    tipo: ChartType,
    etiquetas: string[],
    datasets: ChartData['datasets'],
    opciones?: ChartOptions
  ): ChartConfiguration {
    return {
      type: tipo,
      data: {
        labels: etiquetas,
        datasets: datasets,
      },
      options: opciones,
    };
  }

  public crearGrafico(idCanvas: string, configuracion: ChartConfiguration): Chart | null {
    const canvasElemento = document.getElementById(idCanvas) as HTMLCanvasElement;
    if (canvasElemento) {
      return new Chart(canvasElemento, configuracion);
    }
    return null;
  }

  public actualizarDatosGrafico(grafico: Chart, nuevosDatos: ChartData): void {
    grafico.data = nuevosDatos;
    grafico.update();
  }
}
