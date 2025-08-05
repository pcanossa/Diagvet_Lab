# 🩸 DIAgvetLab - Plataforma de Análise Veterinária

## 📖 Sobre o Projeto

O **DIAgvetLab** é uma aplicação SaaS (Software as a Service) para auxiliar médicos veterinários na interpretação de hemogramas. A ferramenta utiliza modelos de Inteligência Artificial (Aprendizado de Máquina) para analisar os parâmetros do exame e fornecer sugestões de diagnóstico baseadas em padrões clínicos, otimizando o tempo e apoiando a decisão clínica.

Este projeto nasceu da necessidade de criar uma ferramenta de apoio que seja rápida, acessível e baseada em conhecimento especializado, transformando dados laboratoriais em insights acionáveis.

O atual estado do projeto, apresenta-se em MVP.

## 🚀 Arquitetura e Tecnologias

O projeto foi construído com uma arquitetura moderna e desacoplada, separando a interface do usuário (Front-end) da lógica de inteligência artificial (Back-end), comunicando-se via API REST.

### Frontend
- **Framework:** Angular (v19+, com componentes Standalone)
- **Estilização:** Bootstrap 5, Tailwind e CSS5 customizado
- **Responsabilidade:** Coletar os dados do exame através de um formulário interativo, enviar para a API, e exibir o laudo gerado de forma clara e organizada.

### Backend
- **Framework:** Python com FastAPI
- **Inteligência Artificial:** Scikit-learn (utilizando modelos de Árvore de Decisão)
- **Manipulação de Dados:** Pandas
- **Responsabilidade:** Receber os dados do hemograma via um endpoint de API, processá-los, passá-los pelos modelos de IA treinados e retornar um laudo estruturado em formato JSON.

## ✨ Funcionalidades do MVP
- **Análise Modular:** O sistema analisa o hemograma em três módulos especialistas independentes:
  1.  **Série Vermelha (Case 1):** Focado em anemias e policitemias.
  2.  **Série Branca (Case 2):** Focado em padrões inflamatórios, infecciosos e de estresse.
  3.  **Plaquetas (Case 3):** Focado em trombocitopenias e trombocitoses.
- **Interface Intuitiva:** Um formulário simples e direto para a inserção dos parâmetros do exame.
- **Laudo Estruturado:** Exibição clara das interpretações geradas pela IA para cada série celular analisada.
- **Base de Conhecimento Externa:** A inteligência dos modelos é alimentada por planilhas Google Sheets, realizada por especialista (Patologista Veterinário(a)), permitindo que a base de conhecimento seja atualizada e expandida de forma contínua e supervisionada, sem a necessidade de alterar o código.
- **Segurança:** As URLs das planilhas são protegidas como variáveis de ambiente no servidor, não ficando expostas no código, bem como, o acesso à API, limitada por CORS, restringindo acesso por IP.

## ☁️ Deploy
O MVP está hospedado na nuvem utilizando as seguintes plataformas:
- **Frontend (Angular):** Publicado como um "Static Site" na Render.
- **Backend (API FastAPI):** Publicado como um "Web Service" na Render.
Esta arquitetura garante escalabilidade, separação de responsabilidades e um fluxo de deploy automatizado a partir do GitHub.

## 🛠️ Como Executar o Projeto Localmente
Para rodar o MVP em sua máquina, você precisará executar o Front-end e o Back-end separadamente em dois terminais.

### 1. Executando o Backend (API com FastAPI)
1. Navegue até a pasta da API
```Shell

cd /caminho/para/seu/projeto/api
```

2. (Recomendado) Crie e ative um ambiente virtual

```Python
python -m venv .venv
# No Windows:
.\.venv\Scripts\activate
# No MacOS/Linux:
source .venv/bin/activate
```

3. Instale as dependências

```Python
pip install -r requirements.txt
```

4.  Crie um arquivo .env na pasta /api para as URLs das planilhas

```.env
# Exemplo de conteúdo para o ficheiro .env:
URL_CASE_1=https://docs.google.com/spreadsheets/d/seu_link_aqui/edit?usp=sharing
URL_CASE_2=https://docs.google.com/spreadsheets/d/seu_link_aqui/edit?usp=sharing
URL_CASE_3=https://docs.google.com/spreadsheets/d/seu_link_aqui/edit?usp=sharing
```

5. Inicie o servidor da API

```Shell
# O servidor rodará em http://localhost:8000
uvicorn index:app --reload
```

### 2. Executando o Frontend (Aplicação Angular)
1. Num novo terminal, navegue até a pasta do Frontend

```Shell
cd /caminho/para/seu/projeto/Frontend
```

2. Instale as dependências do Node.js (só precisa de fazer isto uma vez)

```Shell
npm install
```

3. Inicie o servidor de desenvolvimento do Angular

```Shell
# A aplicação estará acessível em http://localhost:4200
ng serve
```

Após iniciar ambos os servidores, abra o seu navegador em http://localhost:4200 para usar a aplicação.

## Status Atual do Projeto

**MVP Funcional** acessível em: [**LINK**](https://diagvet-lab.onrender.com/)

