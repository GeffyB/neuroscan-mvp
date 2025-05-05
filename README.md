# NeuroScan – MVP de Triagem Digital para Neurodivergências

Este é o MVP do **NeuroScan**, um WebApp interativo para triagem indicativa de condições como **TEA**, **TDAH**, **TOD** e **Altas Habilidades**. O objetivo é fornecer uma triagem inicial (não diagnóstica), coletar leads qualificados e encaminhar para avaliação profissional.

---

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- ESLint
- Zustand (em breve)
- EmailJS / Nodemailer (em breve)

---

## Estrutura de Páginas (v0.2.0)

| Rota         | Descrição                        |
|--------------|----------------------------------|
| `/`          | Tela de boas-vindas              |
| `/cadastro`  | Formulário de identificação      |
| `/teste`     | Perguntas indicativas (mock)     |
| `/resultado` | Exibição do percentual estimado  |
| `/fim`       | Agradecimento e CTA final        |

> ⚠️ Navegação direta entre páginas só está habilitada em modo de desenvolvimento (`NODE_ENV=development`).

---

## Como Rodar o Projeto Localmente

```bash
git clone git@github.com:GeffyB/neuroscan-mvp.git
cd neuroscan-mvp
npm install
npm run dev
```

Depois, acesse no navegador:

```
http://localhost:3000
```

---

## Versão Atual

- **v0.4.0** – Teste interativo funcional com timer, controle e armazenamento

---

## 📦 Histórico de Versões

| Versão   | Data       | Descrição                                                                 |
|----------|------------|---------------------------------------------------------------------------|
| v0.4.0   | 2025-05-04 | Teste interativo com timer, validação, bloqueio de resposta e Zustand     |
| v0.3.2   | 2025-05-03 | Cadastro com seleção de Estado + Cidade usando base oficial completa      |
| v0.3.0   | 2025-05-03 | Formulário de cadastro com fluxo condicional (respondente e avaliado)     |
| v0.2.0   | 2025-05-01 | Estrutura de páginas e navegação base                                     |
| v0.1.0   | 2025-04-30 | Setup inicial do projeto com Next.js, TypeScript e Tailwind               |

---

## ⚖️ Aviso Legal

Este sistema **não substitui avaliação médica** e está em fase de prototipagem. Todos os dados devem ser tratados conforme boas práticas de privacidade e segurança (LGPD).