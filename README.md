# 📦 Upload Widget

Este projeto é um widget de upload de arquivos de alta performance, construído com foco em otimização de imagem no client-side, resiliência de rede e uma experiência de usuário fluida e reativa. Desenvolvido com base no conteúdo demonstrativo da **Pós-Graduação Full Stack com IA da [Rocketseat](https://app.rocketseat.com.br/)**

## Demonstração 
![demo](https://github.com/user-attachments/assets/b6d1a91f-8e57-4cc9-a1c2-9fe839514fb9)

## Copiar e colar
![copy-paste-ezgif com-optimize](https://github.com/user-attachments/assets/2b9ed2de-5b53-4a6a-b605-8ba08d63994a)

## Baixar foto
![download](https://github.com/user-attachments/assets/48098401-6fcc-4145-a72f-039394ee35bf)

---

## ✨ Funcionalidades Principais

- **Pipeline de Otimização de Imagem:** Imagens são redimensionadas e convertidas para **WebP** no navegador antes do upload, economizando banda e acelerando o processo.
- **Upload Resiliente:** Lida com interrupções de rede com uma lógica de **Retry** e permite o cancelamento de uploads em andamento.
- **Gestão de Estado Eficiente:** Utiliza **Zustand** com uma estrutura de `Map` para atualizações de alta performance O(1) na fila de uploads.
- **Feedback Visual Avançado:**
  - Barras de progresso circulares e lineares com feedback em tempo real.
  - Animações fluidas e micro-interações com **Framer Motion**.
  - Comparativo de tamanho (original vs. comprimido).
- **Interface Acessível (A11y):** Construído com base nos primitivos do **Radix UI** para garantir acessibilidade.

---

## 🚀 Tecnologias & Ferramentas

O projeto utiliza um stack moderno e performático para entregar a melhor experiência.

| Categoria | Ferramenta | Propósito |
| :--- | :--- | :--- |
| **Base** | React + TypeScript | Estrutura para uma UI tipada e escalável. |
| **Build & Pacotes** | Vite + pnpm | Build ultra-rápido e gerenciamento de dependências. |
| **Estilização** | Tailwind CSS (v4) | CSS utilitário com variáveis e animações. |
| **Animações** | Framer Motion | Animações de layout e físicas para transições naturais. |
| **Estado Global** | Zustand + Immer | Gerenciamento de estado simples e imutável |
| **Componentes** | Radix UI | Primitivos acessíveis (Collapsible, Progress, etc.). |
| **HTTP** | Axios | Requisições com monitoramento de progresso e cancelamento. |
| **Backend** | Fastify | Framework Node.js de alta performance para a API de upload. |
| **Armazenamento**| Cloudflare R2 | Armazenamento de objetos com API compatível com S3. |

---

## 🏗️ Decisões de Arquitetura

1.  **Imutabilidade com Immer:** Escolhido para simplificar mutações em estados de `Map`, evitando a complexidade de clonagens manuais e garantindo a reatividade correta.
2.  **Estado Derivado com Hooks:** O progresso geral e a contagem de uploads pendentes são calculados em tempo real com o hook `usePendingUploads`, evitando redundância e garantindo que o estado seja sempre a "única fonte da verdade".
3.  **Slot Pattern (Radix):** O `Slot` do Radix é usado no botão de download para que ele funcione como uma âncora `<a>` funcionalmente, mas mantendo os estilos e comportamentos de um botão, o que é ideal para semântica e SEO.

---

## 🛠️ Como Rodar o Projeto Localmente

Para executar o projeto, você precisará ter o **Node.js** (v18+) e o **pnpm** instalados. O projeto é dividido em duas partes: o `server` (backend disponibilizado pelo professor) e a `web` (frontend).

### 1. Configurando o Backend (`server`)

O backend é responsável por receber os arquivos e enviá-los para um serviço de armazenamento de objetos (Cloudflare R2).

```bash
# 1. Navegue até a pasta do servidor
cd server

# 2. Instale as dependências
pnpm install
```

#### Variáveis de Ambiente

Antes de iniciar o servidor, você precisa configurar as credenciais do seu serviço de armazenamento.

1.  Crie uma cópia do arquivo `.env.example` e renomeie para `.env`:
```bash
cp .env.example .env
```
2.  Abra o arquivo `.env` e preencha as variáveis com suas credenciais do Cloudflare R2:
```
CLOUDFLARE_ACCESS_KEY_ID="..."
CLOUDFLARE_SECRET_ACCESS_KEY="..."
CLOUDFLARE_BUCKET="..."
CLOUDFLARE_ACCOUNT_ID="..."
CLOUDFLARE_PUBLIC_URL="..."
```

3. Inicie o servidor backend
```bash
pnpm dev

# O servidor estará rodando em http://localhost:3333
```

### 2. Configurando o Frontend (`web`)

O frontend é a interface do widget de upload construída em React.

```bash
# 1. Em um novo terminal, navegue até a pasta web
cd web

# 2. Instale as dependências
pnpm install

# 3. Inicie a aplicação de desenvolvimento
pnpm dev

# A aplicação estará disponível em http://localhost:5173
```

Agora você pode abrir `http://localhost:5173` no seu navegador para interagir com o widget.

---

## 📝 Créditos

Projeto desenvolvido com base no conteúdo demonstrativo da **Pós-Graduação Full Stack com IA da Rocketseat**. A implementação expande o projeto original com os seguintes refinamentos:

- **Animações Refinadas:** Uso de física de mola (*spring physics*) com Framer Motion para criar interações e transições mais orgânicas.


- **Otimização Inteligente:** Adição de uma lógica que impede o reprocessamento de imagens `.webp` já otimizadas, evitando degradação de qualidade desnecessária.
