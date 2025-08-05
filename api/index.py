# ==============================================================================
# PARTE 1: CONFIGURAÇÃO E CARREGAMENTO DE DADOS
# ==============================================================================
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any
from sklearn.tree import DecisionTreeClassifier
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import warnings

# Carrega as variáveis do arquivo .env
load_dotenv()

#Acessar as variáveis de ambiente
url_case1 = os.getenv('URL_CASE1')
url_case2 = os.getenv('URL_CASE2')
url_case3 = os.getenv('URL_CASE3')

# Ignorar avisos futuros para manter a saída limpa
warnings.simplefilter(action='ignore', category=FutureWarning)

print("--- Módulo de Análise Laboratorial Inteligente ---")
print("Passo 1: Carregando as bases de conhecimento...")

# Função para converter o link do Google Sheets para o formato de download CSV
def formatar_url_gsheets(url):
    return url.replace('/edit?usp=sharing', '/export?format=csv')

# URLs das suas planilhas
# url_triador = formatar_url_gsheets('https://docs.google.com/spreadsheets/d/1WGxbB1jQVfC7Lfd7dyvMTymV6Q8AAkUuQ7J_gyNG53Y/edit?usp=sharing')
url_case1 = formatar_url_gsheets(url_case1)
url_case2 = formatar_url_gsheets(url_case2)
url_case3 = formatar_url_gsheets(url_case3)

# Carregando os dados em DataFrames
try:
    # df_triador = pd.read_csv(url_triador)
    df_case1 = pd.read_csv(url_case1)
    df_case2 = pd.read_csv(url_case2)
    df_case3 = pd.read_csv(url_case3)
    print("Sucesso! Todas as 4 tabelas foram carregadas.\n")
except Exception as e:
    print(f"Erro ao carregar as planilhas: {e}")
    print("Verifique se os links estão corretos e compartilhados como 'Qualquer pessoa com o link'.")

# ==============================================================================
# PARTE 2: PRÉ-PROCESSAMENTO E TREINAMENTO DOS MODELOS ESPECIALISTAS
# ==============================================================================

print("Passo 2: Treinando os modelos especialistas...")

def treinar_modelo_especialista(df, nome_coluna_diagnostico):
    """
    Função reutilizável para pré-processar e treinar um modelo de árvore de decisão.
    """
    # Tratar células vazias como 'Nao_Informado'
    df_tratado = df.fillna('Nao_Informado')

    # Separar as features (X) do label (y)
    X = df_tratado.drop(nome_coluna_diagnostico, axis=1)
    y = df_tratado[nome_coluna_diagnostico]

    # Converter colunas de texto em colunas numéricas (One-Hot Encoding)
    X_encoded = pd.get_dummies(X)

    # Treinar o modelo
    modelo = DecisionTreeClassifier(random_state=42)
    modelo.fit(X_encoded, y)

    # Retornar o modelo treinado e as colunas usadas no treino (essencial!)
    return modelo, X_encoded.columns

# Treinando um modelo para cada Case
modelo_case1, colunas_case1 = treinar_modelo_especialista(df_case1, 'DIAGNÓSTICO_VERMELHA')
print("- Modelo Especialista do Case 1 (Série Vermelha) treinado.")

modelo_case2, colunas_case2 = treinar_modelo_especialista(df_case2, 'DIAGNÓSTICO_BRANCA')
print("- Modelo Especialista do Case 2 (Série Branca) treinado.")

modelo_case3, colunas_case3 = treinar_modelo_especialista(df_case3, 'DIAGNÓSTICO_PLAQUETAS')
print("- Modelo Especialista do Case 3 (Plaquetas) treinado.\n")

# Agrupando os modelos e colunas para fácil acesso
modelos_e_colunas = {
    'Case 1': (modelo_case1, colunas_case1),
    'Case 2': (modelo_case2, colunas_case2),
    'Case 3': (modelo_case3, colunas_case3)
}

# ==============================================================================
# PARTE 3: O ORQUESTRADOR - A FUNÇÃO PRINCIPAL DE ANÁLISE
# ==============================================================================
#
#print("Passo 3: Construindo o orquestrador do sistema...")
#
#
#def analisar_hemograma_completo(dados_paciente, modelos):
#
#    relatorio_final = {}
#
#    # --- NÍVEL 2: MÓDULOS DE ANÁLISE (acionando os modelos) ---
#    print("Nível 2 (Especialistas): Acionando modelos...")
#
#    for case in modelos:
#        modelo, colunas_treino = modelos[case]
#
#        # Preparar os dados do paciente para o modelo específico
#        df_paciente = pd.DataFrame([dados_paciente])
#        df_paciente_encoded = pd.get_dummies(df_paciente)
#
#        # Garantir que o df do paciente tenha exatamente as mesmas colunas do treino
#        df_paciente_final = df_paciente_encoded.reindex(columns=colunas_treino, fill_value=0)
#
#        # Fazer a predição
#        predicao = modelo.predict(df_paciente_final)
#
#        # Adicionar ao relatório
#        nome_analise = f"Analise_{case.replace(' ', '_')}"
#        relatorio_final[nome_analise] = predicao[0]
#
#    return relatorio_final
#
#print("Sucesso! Sistema pronto para receber exames.\n")
#
#
# ==============================================================================
# PARTE 4: EXEMPLO DE USO
# ==============================================================================

# Vamos simular um novo paciente com anemia e plaquetas baixas.
# Note que não informamos os parâmetros opcionais (Eosinofilos, Monocitos, etc.)

#print ('********** INSERIR NAS PERGUNTAS A SEGUIR: ALTO, NORMAL OU BAIXO; SIM OU NÃO *********\n OBS: EM PARAMETROS AUSENTES, DEIXAR EM BRANCO\n')

app = FastAPI()

origins = [
    "http://localhost:4200", # A origem do app Angular
    "https://diagvet-lab.onrender.com" # A origem do app Angular no Render
]

# Configuração do CORS para permitir requisições do frontend
# Isso é necessário para que o frontend possa se comunicar com a API sem problemas de CORS.
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos (GET, POST, etc)
    allow_headers=["*"], # Permite todos os cabeçalhos
)
# ------------------------------------

# Modelo Pydantic para validação dos dados do paciente
# Isso garante que os dados recebidos estejam no formato correto e ajuda na documentação da API.
class Hemograma(BaseModel):    
    Eritrocitos: str
    Hematocrito: str
    VCM: str
    CHCM: str
    RDW: str
    Reticulocitos: str
    Leucocitos_Totais: str
    Neutrofilos_Seg: str
    Neutrofilos_Bast: str
    Linfocitos: str
    Monocitos: str
    Eosinofilos: str
    Plaquetas: str
    PDW: str
    VPM: str
    Observacao_Agregados: str
    Grafico_Plq: str


@app.post("/api/analisar_hemograma")
def analisar_hemograma(novo_paciente: Hemograma):
    # Convertendo o modelo Pydantic para dicionário
    dados_paciente = novo_paciente.dict()
    relatorio_final={}
    # Executa a análise completa
    for case in modelos_e_colunas:
        modelo, colunas_treino = modelos_e_colunas[case]

        # Preparar os dados do paciente para o modelo específico
        df_paciente = pd.DataFrame([dados_paciente])
        df_paciente_encoded = pd.get_dummies(df_paciente)
        
        # Garantir que o df do paciente tenha exatamente as mesmas colunas do treino
        df_paciente_final = df_paciente_encoded.reindex(columns=colunas_treino, fill_value=0)
        # Fazer a predição
        predicao = modelo.predict(df_paciente_final)
        
        # Adicionar ao relatório
        nome_analise = f"Analise_{case.replace(' ', '_')}"
        relatorio_final[nome_analise] = predicao[0]
        #print(f"Análise {nome_analise} concluída: {predicao[0]}")
    return relatorio_final


#novo_paciente = {
#    'Eritrocitos': Eritrocitos,
#    'Hematocrito': Hematocrito,
#    'VCM': VCM,
#    'CHCM': CHCM,
#    'RDW': RDW,
#    'Reticulocitos': Reticulocitos,
#    'Leucocitos_Totais': Leucocitos_Totais,
#    'Neutrofilos_Seg': Neutrofilos_Seg,
#    'Neutrofilos_Bast': Neutrofilos_Bast,
#    'Linfocitos': Linfocitos,
#    'Monocitos': Monocitos,
#    'Eosinofilos': Eosinofilos,
#    'Plaquetas': Plaquetas,
#    'PDW': PDW,
#    'VPM': VPM,
#    'Observacao_Agregados': Observacao_Agregados,
#    'Gráfico Plq': Grafico_Plq
#  }
#
## Executa a análise completa
#laudo_final = analisar_hemograma_completo(novo_paciente, modelos_e_colunas)
#
## Imprime o laudo final de forma organizada
#print("\n================== LAUDO INTELIGENTE GERADO ==================")
#if laudo_final:
#    for chave, valor in laudo_final.items():
#        print(f"-> {chave}: {valor}")
#else:
#    print("Não foi possível gerar um laudo.")
#print("============================================================")