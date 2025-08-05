import { Component, inject } from '@angular/core'; // Importa o decorador Component do Angular
import { CommonModule } from '@angular/common'; // Necessário para *ngIf, *ngFor
import { FormsModule } from '@angular/forms';   // Necessário para [(ngModel)]
import { HttpClient } from '@angular/common/http'; // Importe o HttpClient

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
  // --- Injeção de dependência do HttpClient para chamadas HTTP ---
  private http = inject(HttpClient);

  // --- Propriedades para os dados do formulário com valores iniciais ---
  eritrocitos: string = 'Normal';
  hematocrito: string = 'Normal';
  vcm: string = 'Normal';
  chcm: string = 'Normal';
  rdw: string = 'Normal';
  reticulocitos: string = 'Normal'
  leucocitos_totais: string = 'Normal';
  neutrofilos_seg: string = 'Normal';
  neutrofilos_bast: string = 'Normal'
  linfocitos: string = 'Normal';
  monocitos: string = 'Normal'
  eosinofilos: string = 'Normal'
  plaquetas: string = 'Normal';
  pdw: string = 'Normal'
  vpm: string = 'Normal'
  observacao_agregados: string = 'Não';
  grafico_plq: string = 'Normal'

  // --- Propriedades para controlar o estado da UI (visibilidade dos elementos) ---
  isLoading: boolean = false;
  results: any[] | null = null; // Armazenará o laudo da API

   private caseTitles: { [key: string]: string } = {
    'Analise_Case_1': 'Análise da Série Vermelha',
    'Analise_Case_2': 'Análise da Série Branca',
    'Analise_Case_3': 'Análise de Plaquetas'
  };


  // Função para tratar os dados do paciente antes de enviar para a API
    dateTreatment(dadosPaciente: { [key: string]: string }): { [key: string]: string } {
    const dadosTratados = { ...dadosPaciente }; // Cria uma cópia para evitar mutação
    for (const key in dadosTratados) {
      if (dadosTratados[key] === 'Não Informado') {
        // Substitui 'Não Informado' por 'nao_informado'
        dadosTratados[key] = 'nao_informado';
      } else {
        // Converte o valor para minúsculas, se necessário
        dadosTratados[key] = dadosTratados[key].toLowerCase();
      }
    }
    return dadosTratados;
  }

    realizarNovaAnalise(): void {
    this.results = null;
    this.isLoading = false;
  }


  // --- Método chamado quando o formulário é enviado ---
  analisarHemograma(): void {
    this.isLoading = true;
    this.results = null;

    // Dados do paciente a serem enviados para a API
    const dadosPaciente: { [key: string]: string } = {
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
      'Grafico_Plq': this.grafico_plq,
    };

    const dadosTratados = this.dateTreatment(dadosPaciente); // Tratamento dos dados
    console.log("Dados tratados para envio:", dadosTratados); // Log dos dados tratados


    // Chamada para a API
    this.http.post('https://diagvetlab-api.onrender.com/api/analisar_hemograma', dadosTratados).subscribe({
      next: (response: any) => {
        this.results = Object.entries(response).map(([chave, valor]) => ({
            titulo: this.caseTitles[chave] || chave.replace('Analise_', '').replace(/_/g, ' '),
            diagnostico: valor
        })
      );
        console.log("Resposta da API:", this.results);
        this.isLoading = false;
      },
      error: (error: any) => { // CORREÇÃO 3: Adicionado o tipo 'any' para o parâmetro de erro
        console.error("Erro ao chamar a API:", error);
        this.results = [{ titulo: "Erro na Análise", diagnostico: "Não foi possível processar a solicitação." }];
        this.isLoading = false;
      }
    });
  }



    // Simulação da chamada da API (em um app real, use o HttpClient do Angular)
    //console.log("Enviando para API (simulado):", dadosPaciente);

    //setTimeout(() => {
      // Resposta simulada que a sua API Python retornaria
      //const mockApiResponse = {
        //"Analise_Case_1": "Anemia Regenerativa - Sugestivo de Hemólise",
        //"Analise_Case_2": "Leucograma de Estresse (Padrão Corticoide)",
        //"Analise_Case_3": "Trombocitopenia Real - Sugestivo de Consumo/Destruição Periférica"
      //};

       // Transforma o objeto de resposta em um array para ser usado pelo *ngFor no template
      //this.results = Object.entries(mockApiResponse).map(([chave, valor]) => ({
          //titulo: chave.replace('Analise_', '').replace(/_/g, ' '),
          //diagnostico: valor
      //}));




  // --- Método para voltar ao formulário e realizar uma nova análise ---
}
