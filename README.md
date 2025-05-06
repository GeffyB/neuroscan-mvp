# NeuroScan – MVP de Triagem Digital para Neurodivergências

Este é o MVP do **NeuroScan**, um WebApp interativo para triagem indicativa de condições como **TEA**, **TDAH**, **TOD** e **Altas Habilidades**. O objetivo é fornecer uma triagem inicial (não diagnóstica), coletar leads qualificados e encaminhar para avaliação profissional.

---

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- ESLint
- Zustand
- EmailJS / Nodemailer (em breve)

---

## Estrutura de Páginas (v0.7.2)

| Rota         | Descrição                            |
|--------------|--------------------------------------|
| `/`          | Tela de boas-vindas                  |
| `/cadastro`  | Formulário de identificação          |
| `/instrucoes`| Explicação do teste e boas práticas  |
| `/teste`     | Perguntas adaptadas com timer        |
| `/resultado` | Resultado parcial com feedback       |
| `/fim`       | Agradecimento e chamada para ação    |

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

- **v0.7.2** – Reformulação visual do cadastro e tela inicial com mais credibilidade e acessibilidade

---

## 📦 Histórico de Versões

| Versão   | Data       | Descrição                                                                 |
|----------|------------|---------------------------------------------------------------------------|
| v0.7.2   | 2025-05-04 | Reformulação visual do cadastro (telefone, WhatsApp, campos bem espaçados) |
| v0.7.0   | 2025-05-04 | Tela de instruções antes do teste                                          |
| v0.6.0   | 2025-05-04 | Sorteio inteligente de 20 perguntas (5 por categoria) com base clínica     |
| v0.5.0   | 2025-05-04 | Integração do banco TEA completo com 60 perguntas categorizadas ADOS/ADI-R |
| v0.4.0   | 2025-05-04 | Teste interativo com timer, validação, bloqueio de resposta e Zustand     |
| v0.3.2   | 2025-05-03 | Cadastro com seleção de Estado + Cidade usando base oficial completa      |
| v0.3.0   | 2025-05-03 | Formulário de cadastro com fluxo condicional (respondente e avaliado)     |
| v0.2.0   | 2025-05-01 | Estrutura de páginas e navegação base                                     |
| v0.1.0   | 2025-04-30 | Setup inicial do projeto com Next.js, TypeScript e Tailwind               |

---

## ⚖️ Aviso Legal

Este sistema **não substitui avaliação médica** e está em fase de prototipagem. Todos os dados devem ser tratados conforme boas práticas de privacidade e segurança (LGPD).