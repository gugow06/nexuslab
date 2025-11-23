# 🚀 NexusLab: Plataforma Inteligente para o Futuro do Trabalho

## 💡 Sobre o Projeto

O **NexusLab** (Solução Nexio) é uma plataforma Full Stack projetada para enfrentar os desafios do **Futuro do Trabalho**. Em um cenário de avanços tecnológicos disruptivos, como a **Inteligência Artificial** e a **automação**, nossa solução visa garantir uma transição justa, inclusiva e sustentável para o mercado.

Utilizamos a tecnologia para personalizar jornadas de **aprendizagem e requalificação**, combatendo as desigualdades e preparando jovens para carreiras que ainda estão surgindo.

---

### Conexão com os ODS da ONU

O projeto está diretamente alinhado com os **Objetivos de Desenvolvimento Sustentável (ODS)** da ONU:

* **ODS 8**: Trabalho decente e crescimento econômico.
* **ODS 4**: Educação de qualidade (requalificação contínua).
* **ODS 10**: Redução das desigualdades (inclusão produtiva).
* **ODS 9**: Indústria, inovação e infraestrutura.

---

### 🛠️ Tecnologias Utilizadas

O projeto é construído em uma arquitetura **distribuída, segura e escalável**, utilizando:

| Componente | Tecnologia Principal | Framework/ORM |
| :--- | :--- | :--- |
| **Backend (API RESTful)** | Node.js, TypeScript | Express.js (ou similar), Drizzle ORM |
| **Frontend (Mobile)** | TypeScript | Framework Mobile (p. ex., React Native/Expo) |
| **Banco de Dados** | Relacional | PostgreSQL (ou similar), Drizzle ORM |
| **Segurança** | Autenticação com **JWT** | Hashing de senha com **Bcrypt** |
| **Simulação IoT** | Node.js/Python Script | Simulação de dados de bem-estar |

---

### ⚙️ Instruções de Execução

Siga os passos abaixo para configurar e executar a aplicação localmente.

#### **Pré-requisitos**

Certifique-se de ter instalado em sua máquina:

* **Node.js** (versão 18+ ou superior).
* Gerenciador de pacotes **NPM** ou **Yarn**.
* Um servidor de banco de dados relacional (Ex: **PostgreSQL**) ou um banco de dados local (Ex: **SQLite**).
* Um emulador ou dispositivo físico para executar o **Frontend Mobile**.

#### **Passo 1: Configuração do Backend (API)**

1.  Navegue até a pasta do servidor:
    ```bash
    cd server
    ```
2.  Instale as dependências do Node.js:
    ```bash
    npm install
    # ou yarn install
    ```
3.  Crie um arquivo **`.env`** na raiz da pasta `server` e configure a string de conexão do seu banco de dados e as chaves de segurança (o `DB_URL` é vital para o Drizzle ORM e a API):
    ```env
    DB_URL="[SUA_STRING_DE_CONEXAO_DO_DB]"
    JWT_SECRET="[SUA_CHAVE_SECRETA_PARA_JWT]"
    API_PORT=3000
    ```
4.  Aplique as migrações do Drizzle para criar as tabelas no banco de dados, utilizando o `drizzle.config.ts`:
    ```bash
    npx drizzle-kit push:pg
    ```
5.  Inicie o servidor API:
    ```bash
    npm run dev
    # O servidor estará disponível em http://localhost:3000
    ```

#### **Passo 2: Configuração do Frontend Mobile**

1.  Navegue até a pasta do cliente:
    ```bash
    cd ../client
    ```
2.  Instale as dependências:
    ```bash
    npm install
    # ou yarn install
    ```
3.  Certifique-se de que a URL da API no código-fonte do cliente está apontando corretamente para o backend (`http://IP_DA_MAQUINA:3000` se estiver usando um emulador).
4.  Inicie o aplicativo (Exemplo com Expo):
    ```bash
    npx expo start
    ```
    Siga as instruções do terminal para abrir no seu emulador ou dispositivo físico.

#### **Passo 3: Simulação de IoT**

1.  A simulação é feita via um script na pasta `/simulation`.
2.  Instale as dependências da simulação (se houver, como `request` ou `mqtt`):
    ```bash
    cd ../simulation
    npm install
    ```
3.  Execute o script de simulação. Este script envia dados mockados de **Nível de Ruído** e **Nível de Stress** periodicamente para o endpoint da API, simulando um dispositivo de monitoramento de bem-estar.
    ```bash
    npm run simulate
    ```

---

### 👥 Equipe

| Nome do Integrante | RM |
| :--- | :--- |
| GUSTAVO CRISTIANO PESSOA DE SOUZA | 551924 |
| RICARDO AKIRA KATO LOPES | 551447 |
| KEVIN RICHARD XAVIER | 551736 |
| VINICIUS DO CARMO FONSECA FREITAS | 97599 |
| LUCAS LAIA MANENTTI | 97709 |
