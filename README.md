<h1 align="center">
  🚀 CTRL Save
</h1>

<p align="center">
  <b>Salve automaticamente tudo que você copia — rápido, organizado e inteligente.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Electron-3b3b3b?style=for-the-badge&logo=electron&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Vite-5a2fe1?style=for-the-badge&logo=vite&logoColor=yellow"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white"/>
</p>

<p align="center">
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-instalação">Instalação</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 🎯 Visão Geral

O **CTRL Save** é um aplicativo desktop desenvolvido para monitorar sua área de transferência e salvar automaticamente tudo o que você copia. É a ferramenta ideal para estudantes, programadores e profissionais que lidam com grandes volumes de texto e precisam de um histórico confiável.

> **Destaque:** Interface moderna com animações fluidas e suporte a "Quick Slots" para acesso rápido.

---

## ✨ Funcionalidades

### 🔄 Captura Inteligente
- **Monitoramento em Tempo Real:** Registra qualquer texto copiado (CTRL+C).
- **Organização Diária:** O histórico é separado por dia automaticamente.
- **Feedback Visual:** Atualização instantânea do painel.

### 🧩 10 Quick Slots (Acesso Rápido)
Slots fixos para armazenar dados recorrentes (CPFs, links, snippets de código).
- [x] Clique único para copiar.
- [x] Armazenamento local persistente.

### 🗂 Modos de Armazenamento

| Modo | Descrição | Persistência |
| :--- | :--- | :--- |
| **Daily Copy** | Armazena tudo copiado no dia corrente. | Reseta diariamente 🕒 |
| **Permanent Copy** | Itens fixos adicionados manualmente. | Salvo para sempre 💾 |

---

## 💻 Interface e Tecnologia

O projeto foi construído focando em performance e estética:

- **Electron + Vite:** Hot reload ultra-rápido e build otimizado.
- **UI Moderna:** Estilização com **TailwindCSS**.
- **Animações:** Feedback visual suave utilizando **Framer Motion**.

### 📂 Estrutura do Projeto

```bash
src/
 └─ renderer/
     ├─ index.html
     └─ src/      # Componentes React e Lógica

```
## 📦 Instalação e Uso

Certifique-se de ter o **Node.js** instalado.

1. **Clone o repositório e instale as dependências:**
```bash
npm install

npm run dev
```
---

🚧 Roadmap
[ ] 🔳 Seleção de área da tela para gravação (Screenshot parcial)

[ ] 🔲 Sistema de busca nos textos copiados (Search Bar)

[ ] 🔲 Exportação do histórico (TXT/JSON)

[ ] 🔲 Modo claro/escuro (Dark Mode Toggle)

[ ] 🔲 Sistema de Tags e organização avançada
