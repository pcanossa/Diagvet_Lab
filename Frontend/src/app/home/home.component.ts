import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para *ngIf, *ngFor
import { FormsModule } from '@angular/forms';   // Necessário para [(ngModel)]

@Component({
  selector: 'app-root',
  standalone: true, // << IMPORTANTE: Declara o componente como independente.
  imports: [
    CommonModule,   // << Importa os módulos que o template HTML vai usar.
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // --- Propriedades para os dados do formulário com valores iniciais ---
  eritrocitos: string = 'Normal';
  hematocrito: string = 'Normal';
  vcm: string = 'Normal';
  chcm: string = 'Normal';
  rdw: string = 'Normal';
  reticulocitos: string = 'Nao_Informado';
  leucocitos_totais: string = 'Normal';
  neutrofilos_seg: string = 'Normal';
  neutrofilos_bast: string = 'Nao_Informado';
  linfocitos: string = 'Normal';
  monocitos: string = 'Nao_Informado';
  eosinofilos: string = 'Nao_Informado';
  plaquetas: string = 'Normal';
  pdw: string = 'Nao_Informado';
  vpm: string = 'Nao_Informado';
  febre_clinica: string = 'Nao';
  observacao_agregados: string = 'Nao';
  grafico_plq: string = 'Nao_Informado';

  // --- Propriedades para controlar o estado da UI (visibilidade dos elementos) ---
  isLoading: boolean = false;
  results: any[] | null = null; // Armazenará o laudo da API

  // --- Método chamado quando o formulário é enviado ---
  analisarHemograma(): void {
    this.isLoading = true;
    this.results = null;

    // Dados do paciente a serem enviados para a API
    const dadosPaciente = {
      'Eritrocitos': this.eritrocitos,
      'Hematocrito': this.hematocrito,
      'VCM': this.vcm,
      'CHCM': this.chcm,
      'RDW': this.rdw,
      'Reticulocitos': this.reticulocitos,
      'Leucocitos_Totais': this.leucocitos_totais,
      'Neutrofilos_Seg': this.neutrofilos_seg,
      'Neutrofilos_Bast': this.neutrofilos_bast,
      'Linfocitos': this.linfocitos,
      'Monocitos': this.monocitos,
      'Eosinofilos': this.eosinofilos,
      'Plaquetas': this.plaquetas,
      'PDW': this.pdw,
      'VPM': this.vpm,
      'Observacao_Agregados': this.observacao_agregados,
      'Gráfico Plq': this.grafico_plq,
      'Febre_Clinica': this.febre_clinica
    };

    // Simulação da chamada da API (em um app real, use o HttpClient do Angular)
    console.log("Enviando para API (simulado):", dadosPaciente);

    setTimeout(() => {
      // Resposta simulada que a sua API Python retornaria
      const mockApiResponse = {
        "Analise_Case_1": "Anemia Regenerativa - Sugestivo de Hemólise",
        "Analise_Case_2": "Leucograma de Estresse (Padrão Corticoide)",
        "Analise_Case_3": "Trombocitopenia Real - Sugestivo de Consumo/Destruição Periférica"
      };

       // Transforma o objeto de resposta em um array para ser usado pelo *ngFor no template
      this.results = Object.entries(mockApiResponse).map(([chave, valor]) => ({
          titulo: chave.replace('Analise_', '').replace(/_/g, ' '),
          diagnostico: valor
      }));

      console.log("Resposta da API (simulado):", this.results);

      this.isLoading = false;
    }, 2000); // Simula 2 segundos de espera da rede
  }

  // --- Método para voltar ao formulário e realizar uma nova análise ---
  realizarNovaAnalise(): void {
    this.results = null;
    this.isLoading = false;
  }
}
