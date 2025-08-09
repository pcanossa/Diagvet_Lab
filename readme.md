# 🩸 DIAgvetLab - Plataforma de Análise Veterinária

**🚧 Este projeto está em fase de produção e testes 🚧**

[![Status](https://img.shields.io/badge/status-MVP%20Beta-yellow)](https://diagvet-lab.onrender.com/)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Angular](https://img.shields.io/badge/angular-19+-red.svg)](https://angular.io/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)

## 📖 Sobre o Projeto

O **DIAgvetLab** é uma aplicação SaaS (Software as a Service) para auxiliar médicos veterinários na interpretação de hemogramas. A ferramenta utiliza modelos de Inteligência Artificial (Aprendizado de Máquina) para analisar os parâmetros do exame e fornecer sugestões de diagnóstico baseadas em padrões clínicos, otimizando o tempo e apoiando a decisão clínica.

Este projeto nasceu da necessidade de criar uma ferramenta de apoio que seja rápida, acessível e baseada em conhecimento especializado, transformando dados laboratoriais em insights acionáveis.

**🌐 [Acesse o MVP](https://diagvet-lab.onrender.com/)**

## 🎯 Como Funciona

O sistema funciona em camadas especializadas:

1. **Entrada de Dados**: Veterinário insere parâmetros do hemograma via interface web
2. **Análise Multimodal**: Três modelos especialistas analisam simultaneamente:
   - **Série Vermelha**: Detecção de anemias e policitemias
   - **Série Branca**: Identificação de padrões inflamatórios e infecciosos
   - **Plaquetas**: Análise de trombocitopenias e trombocitoses
3. **Laudo Inteligente**: Relatório estruturado com interpretações baseadas em IA

## 🚀 Arquitetura e Tecnologias

### Arquitetura Geral
```
Frontend (Angular) ←→ API REST ←→ Backend (FastAPI) ←→ Google Sheets (Base de Conhecimento)
```

### Stack Tecnológico

#### Backend (API)
- **Framework:** Python + FastAPI
- **Machine Learning:** Scikit-learn (Decision Tree Classifiers)
- **Processamento de Dados:** Pandas + NumPy
- **Validação:** Pydantic
- **Configuração:** python-dotenv
- **CORS:** Configurado para Angular e deploy

#### Frontend
- **Framework:** Angular 19+ (Componentes Standalone)
- **UI/UX:** Bootstrap 5 + Tailwind CSS + CSS5 personalizado
- **Responsividade:** Mobile-first design

#### Infraestrutura
- **Deploy:** Render (Frontend como Static Site, Backend como Web Service)
- **Base de Conhecimento:** Google Sheets (atualizável em tempo real)
- **Variáveis de Ambiente:** Protegidas no servidor

## ✨ Funcionalidades Detalhadas

### Análise Multimodal Inteligente
- **3 Modelos Especialistas Independentes**:
  - Case 1 (Série Vermelha): Análise de eritrócitos, hematócrito, VCM, CHCM, RDW, reticulócitos
  - Case 2 (Série Branca): Análise de leucócitos totais, neutrófilos, linfócitos, monócitos, eosinófilos
  - Case 3 (Plaquetas): Análise de contagem, PDW, VPM, agregados plaquetários

### Interface e Experiência
- **Formulário Intuitivo**: Entrada simplificada com validação em tempo real
- **Laudo Estruturado**: Resultados organizados por sistema celular
- **Design Responsivo**: Funciona em desktop, tablet e mobile

### Base de Conhecimento Dinâmica
- **Atualização Contínua**: Base de dados atualizada via Google Sheets
- **Supervisão Especializada**: Curada por patologista veterinário
- **Flexibilidade**: Novos casos podem ser adicionados sem alterar código

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Python 3.8+
- Node.js 18+
- npm ou yarn
- Conta Google (para configurar planilhas)

### 1. Clonando o Repositório
```bash
git clone https://github.com/seu-usuario/diagvet-lab.git
cd diagvet-lab
```

### 2. Configurando o Backend

```bash
# Navegue para a pasta da API
cd api

# Crie um ambiente virtual (recomendado)
python -m venv .venv

# Ative o ambiente virtual
# Windows:
.\.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Instale as dependências
pip install -r requirements.txt
```

### 3. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na pasta `/api`:

```env
# URLs das planilhas Google Sheets (formato de edição)
URL_CASE1=https://docs.google.com/spreadsheets/d/[ID_DA_PLANILHA_CASE1]/edit?usp=sharing
URL_CASE2=https://docs.google.com/spreadsheets/d/[ID_DA_PLANILHA_CASE2]/edit?usp=sharing
URL_CASE3=https://docs.google.com/spreadsheets/d/[ID_DA_PLANILHA_CASE3]/edit?usp=sharing
```

**Importante**: As planilhas devem estar configuradas como "Qualquer pessoa com o link pode visualizar".

### 4. Estrutura das Planilhas Google Sheets

As planilhas devem seguir esta estrutura:

#### Case 1 (Série Vermelha)
```
Eritrocitos | Hematocrito | VCM | CHCM | RDW | Reticulocitos | DIAGNÓSTICO_VERMELHA
BAIXO      | BAIXO       | ALTO| ALTO | ALTO| ALTO          | Anemia_Regenerativa
...
```

#### Case 2 (Série Branca)
```
Leucocitos_Totais | Neutrofilos_Seg | Neutrofilos_Bast | Linfocitos | ... | DIAGNÓSTICO_BRANCA
ALTO             | ALTO            | ALTO             | BAIXO      | ... | Inflamacao_Aguda
...
```

#### Case 3 (Plaquetas)
```
Plaquetas | PDW  | VPM   | Observacao_Agregados | Grafico_Plq | DIAGNÓSTICO_PLAQUETAS
BAIXO     | ALTO | ALTO  | SIM                  | NORMAL      | Trombocitopenia_Consumo
...
```

### 5. Executando o Backend

```bash
# Na pasta /api
uvicorn index:app --reload

# O servidor estará disponível em:
# - API: http://localhost:8000
# - Documentação automática: http://localhost:8000/docs
```

### 6. Configurando o Frontend

```bash
# Em um novo terminal, navegue para a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
ng serve

# A aplicação estará disponível em http://localhost:4200
```

## 📊 API Reference

### Endpoint Principal

**POST** `/api/analisar_hemograma`

**Request Body:**
```json
{
  "Eritrocitos": "BAIXO",
  "Hematocrito": "BAIXO",
  "VCM": "ALTO",
  "CHCM": "NORMAL",
  "RDW": "ALTO",
  "Reticulocitos": "ALTO",
  "Leucocitos_Totais": "NORMAL",
  "Neutrofilos_Seg": "NORMAL",
  "Neutrofilos_Bast": "NORMAL",
  "Linfocitos": "NORMAL",
  "Monocitos": "NORMAL",
  "Eosinofilos": "NORMAL",
  "Plaquetas": "NORMAL",
  "PDW": "NORMAL",
  "VPM": "NORMAL",
  "Observacao_Agregados": "NAO",
  "Grafico_Plq": "NORMAL"
}
```

**Response:**
```json
{
  "Analise_Case_1": "Anemia_Regenerativa",
  "Analise_Case_2": "Normal",
  "Analise_Case_3": "Normal"
}
```

### Valores Aceitos
- **Parâmetros numéricos**: `"baixo"`, `"normal"`, `"alto"`, `Nao_Informado`
- **Observações**: `"sim"`, `"nao"`, `Nao_Informado`
- **Campos em branco**: Automaticamente tratados como `"Nao_Informado"`

## 🚨 Limitações Conhecidas

- **Precisão**: Sistema em desenvolvimento, pode apresentar resultados imprecisos
- **Base de Dados**: Limitada ao conhecimento atual das planilhas
- **Conectividade**: Dependente da disponibilidade do Render e Google Sheets
- **Casos Específicos**: Podem apresentar interpretações inadequadas em situações complexas
- **Validação Clínica**: Necessita validação mais ampla com casos reais

## 🔒 Segurança e Privacidade

- URLs das planilhas protegidas como variáveis de ambiente
- CORS configurado para permitir apenas origens autorizadas
- Não armazenamento de dados sensíveis do paciente
- API RESTful stateless

## 🧪 Testes

```bash
# Backend - Testes unitários (quando disponíveis)
cd api
pytest

# Frontend - Testes Angular (quando disponíveis)
cd frontend
ng test
```

## 🚀 Deploy

### Render (Recomendado)

1. **Backend**: Deploy como Web Service conectando ao repositório GitHub
2. **Frontend**: Deploy como Static Site após build (`ng build`)

### Variáveis de Ambiente no Render
Configure as seguintes variáveis no painel do Render:
- `URL_CASE1`
- `URL_CASE2` 
- `URL_CASE3`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📋 Roadmap

### Versão 1.0
- [ ] Validação clínica ampliada
- [ ] Interface de administração para base de conhecimento
- [ ] Exportação de laudos em PDF
- [ ] Sistema de histórico de análises

### Versão 2.0
- [ ] Integração com sistemas LIMS
- [ ] Análise de tendências temporais
- [ ] Aprimoramento de modelo de ML
- [ ] Suporte multi-idiomas

## 📄 Licença

Distribuído sob a licença Apache 2.0. Veja `LICENSE` para mais informações.

## 👥 Equipe

**Patrícia Canossa** - *Desenvolvedora Principal & Patologista Veterinária*
- [GitHub](https://github.com/pcanossa)
- [LinkedIn](https://www.linkedin.com/in/patricia-canossa-gagliardi/)

## ⚖️ Aviso Legal

⚠️ **IMPORTANTE**: Este sistema é uma ferramenta de apoio diagnóstico e NÃO substitui o julgamento clínico profissional. Os resultados devem sempre ser interpretados por um médico veterinário qualificado. Sempre consulte literatura veterinária atualizada e diretrizes oficiais para decisões clínicas definitivas.

---

## 📊 Status do Projeto

- **Status Atual**: MVP Beta em Produção
- **Última Atualização**: 09/08/2025
- **Versão**: 0.1.0-beta
- **Ambiente de Produção**: [https://diagvet-lab.onrender.com/](https://diagvet-lab.onrender.com/)

---

### 📞 Suporte

Para questões técnicas, problemas ou sugestões:
- Abra uma [Issue](https://github.com/seu-usuario/diagvet-lab/issues)
- Entre em contato via [LinkedIn](https://www.linkedin.com/in/patricia-canossa-gagliardi/)