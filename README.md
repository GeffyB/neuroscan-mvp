# NeuroScan – MVP de Triagem Digital para Neurodivergências

Este é o MVP do **NeuroScan**, um WebApp interativo para triagem indicativa de condições como **TEA**, **TDAH**, **TOD** e **Altas Habilidades**. O objetivo é fornecer uma triagem inicial (não diagnóstica), coletar leads qualificados e encaminhar para avaliação profissional.

---

## Tecnologias Utilizadas

- Next.js (App Router)
- TypeScript
- Zustand (gerenciamento de estado global)
- Firebase Firestore (persistência dos resultados)
- Tailwind CSS (apenas vestígios no setup, uso majoritário de CSS-in-JS)
- ESLint (boas práticas)
- EmailJS / Nodemailer (em breve)

---

## Estrutura de Páginas

| Rota         | Descrição                            |
|--------------|--------------------------------------|
| `/`          | Tela de boas-vindas                  |
| `/cadastro`  | Formulário de identificação          |
| `/instrucoes`| Explicação do teste e boas práticas  |
| `/teste`     | Perguntas adaptadas com timer        |
| `/resultado` | Resultado parcial com feedback e gravação no Firestore |
| `/fim`       | Agradecimento e orientação final      |

---

## Funcionalidades Principais

- Cadastro validado (nome, email, telefone – DDD 2 dígitos e telefone 8/9 dígitos)
- Fluxo seguro anti-cheat (bloqueia navegação/reload no teste)
- Sorteio inteligente de 20 perguntas (5 por categoria, faixa etária adaptada)
- Timer individual em cada pergunta
- Salvamento automático do resultado e respostas no Firestore ao final do teste
- Layout responsivo, visual profissional e acessível

---

## Como Rodar o Projeto Localmente

```bash
git clone git@github.com:GeffyB/neuroscan-mvp.git
cd neuroscan-mvp
npm install
npm run dev
```

Depois, acesse no navegador:  
[http://localhost:3000](http://localhost:3000)

---

## Versão Atual

- **v0.9.0** – Integração com Firebase Firestore (persistência de resultados), refinamento visual, validações incrementadas, fluxo de navegação e proteção contra manipulação.

---

## 📦 Histórico de Versões

| Versão   | Data       | Descrição                                                                 |
|----------|------------|---------------------------------------------------------------------------|
| v0.9.0   | 2025-07-02 | Integração Firestore, paleta profissional, validação e UX aprimorada      |
| v0.8.1   | 2025-07-01 | Controle anti-cheat/back/refresh e validação reforçada no cadastro        |
| v0.8.0   | 2025-06-12 | Refinamento visual, responsividade e unificação da identidade visual      |
| v0.7.2   | 2025-05-04 | Reformulação visual do cadastro (telefone, WhatsApp, campos bem espaçados)|
| v0.7.0   | 2025-05-04 | Tela de instruções antes do teste                                         |
| v0.6.0   | 2025-05-04 | Sorteio inteligente de 20 perguntas (5 por categoria) com base clínica    |
| v0.5.0   | 2025-05-04 | Integração do banco TEA completo com 60 perguntas categorizadas ADOS/ADI-R|
| v0.4.0   | 2025-05-04 | Teste interativo com timer, validação, bloqueio de resposta e Zustand     |
| v0.3.2   | 2025-05-03 | Cadastro com seleção de Estado + Cidade usando base oficial completa      |
| v0.3.0   | 2025-05-03 | Formulário de cadastro com fluxo condicional (respondente e avaliado)     |
| v0.2.0   | 2025-05-01 | Estrutura de páginas e navegação base                                    |
| v0.1.0   | 2025-04-30 | Setup inicial do projeto com Next.js, TypeScript e Tailwind              |

---

## Novidades da v0.9.0

- **Firebase Firestore:** resultado e respostas agora são salvos automaticamente, garantindo persistência dos dados.
- **Validação refinada:** DDD e telefone com limitação de dígitos já no input; bloqueios redundantes para evitar erros.
- **Visual:** layout e paleta mais sóbrios, identidade visual alinhada ao perfil profissional e acolhedor da plataforma.
- **Fluxo:** anti-cheat reforçado, timers confiáveis, navegação guiada e segura.

---

## ⚖️ Aviso Legal

Este sistema **não substitui avaliação médica** e está em fase de prototipagem. Todos os dados devem ser tratados conforme boas práticas de privacidade e segurança (LGPD).  
Os resultados têm caráter exclusivamente indicativo e não constituem diagnóstico definitivo.

---
