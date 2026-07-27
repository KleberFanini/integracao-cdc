# 🏢 Portal CDC — Sistemas Internos

Portal centralizado para acesso rápido às plataformas e ferramentas internas do Centro de Desenvolvimento e Cidadania (CDC). Um linktree corporativo organizado por departamentos com busca, temas claro/escuro e suporte integrado.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)

## ✨ Funcionalidades

- **📌 Organização por Departamentos**: Filtre sistemas por Administrativo, Financeiro, RH, Comunicação, TI, Monitoramento e Educa
- **🔍 Busca Inteligente**: Pesquise por nome, descrição, categoria ou departamento
- **🌓 Tema Claro/Escuro**: Alternância com persistência no localStorage
- **🎨 Design Responsivo**: Adapta-se perfeitamente a desktop, tablet e mobile
- **📊 Contador de Sistemas**: Visualize quantos sistemas cada departamento possui
- **🆘 Suporte Integrado**: Botão flutuante para relatar problemas
- **🚀 Performance**: Next.js 15 com App Router e componentes otimizados

## 🛠️ Tecnologias

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS 4
- **Ícones**: Lucide React
- **Fontes**: Inter e Plus Jakarta Sans
- **Deploy**: Easypanel (Docker)

## 📋 Pré-requisitos

- Node.js 18.17+
- npm, yarn ou pnpm
- Docker (para deploy no Easypanel)

## 🚀 Como Executar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/portal-cdc.git
cd portal-cdc
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure os dados

Edite o arquivo src/data/systems.json com seus sistemas:

```json
[
  {
    "name": "Nome do Sistema",
    "description": "Descrição do sistema",
    "url": "https://link-do-sistema.com",
    "icon": "Globe",
    "category": "Categoria",
    "department": "Departamento"
  }
]
```

### 4. Adicione o logo

Coloque sua logo em public/logo-cdc.png (recomendado: 180x180px).

### 5. Configure o formulário de suporte

No src/app/page.tsx, substitua o link do formulário:

```tsx
href="https://forms.gle/SEU_FORMULARIO_AQUI" // ← Substitua pelo seu link
```

### 6. Execute o projeto

```bash
npm run dev
```

### 📁 Estrutura do Projeto

```text
src/
├── app/
│   ├── globals.css      # Estilos globais e tema
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página principal
├── data/
│   └── systems.json     # Dados dos sistemas
public/
├── logo-cdc.png         # Logo da organização
└── favicon.ico          # Favicon
```

### 🎨 Personalização

Adicionar um novo departamento

### 1. No page.tsx, adicione na lista DEPARTMENTS:

```tsx
const DEPARTMENTS = [
  // ... existentes
  "Novo Departamento"
];
```

## 📦 Deploy no Easypanel

### 1. Configure o next.config.js

```js

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = nextConfig
```

### 2. Crie um Dockerfile

Crie um arquivo Dockerfile na raiz do projeto:

```dockerfile
FROM node:20-slim AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile
COPY . .
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```
