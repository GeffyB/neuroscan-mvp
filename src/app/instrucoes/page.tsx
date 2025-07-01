// ===============================================
// 📄 ARQUIVO: src/app/instrucoes/page.tsx (refinado)
// ===============================================

"use client";

import { useRouter } from "next/navigation";

export default function Instrucoes() {
  const router = useRouter();

  const iniciarTeste = () => {
    router.push("/teste");
  };

  // Paleta visual alinhada ao restante do app
  const corFundo = "#F6F9FB";
  const corPrimaria = "#2563eb";
  const corSecundaria = "#1e293b";
  const corBorda = "#cbd5e1";
  const corDestaque = "#e0e7ef";

  return (
    <div
      style={{
        background: corFundo,
        maxWidth: 700,
        minHeight: "100vh",
        margin: "0 auto",
        padding: "2.5em 1.5em",
        fontFamily: "'Inter', sans-serif",
        color: corSecundaria,
        boxShadow: "0 0 32px #e0e7ef40"
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "1em" }}>
        Instruções para o Teste
      </h1>

      <p style={{ fontSize: "1.07rem", marginBottom: "1.2em", lineHeight: 1.6 }}>
        Este teste digital tem como objetivo auxiliar na triagem inicial de possíveis sinais de neurodivergências, baseando-se em protocolos clínicos reconhecidos. Leia com atenção antes de iniciar:
      </p>

      <ul style={{ marginTop: "1em", marginBottom: "1.5em", paddingLeft: "1.25em" }}>
        <li style={{ marginBottom: "0.6em" }}>
          <strong>Duração estimada:</strong> cerca de 10 a 15 minutos.
        </li>
        <li style={{ marginBottom: "0.6em" }}>
          Realize o teste em um ambiente calmo, sem interrupções.
        </li>
        <li style={{ marginBottom: "0.6em" }}>
          Cada pergunta tem limite de tempo. Após esse tempo, a questão será bloqueada.
        </li>
        <li>
          Responda com sinceridade e foco, considerando comportamentos reais e recorrentes.
        </li>
      </ul>

      <h2 style={{ fontSize: "1.18rem", fontWeight: 600, margin: "1.2em 0 0.5em 0" }}>
        Como responder
      </h2>

      <p style={{ marginBottom: "0.6em" }}>
        As perguntas apresentam opções como:
      </p>
      <ul style={{ marginBottom: "1.2em", paddingLeft: "1.25em" }}>
        <li><strong>Nunca</strong> – O comportamento não ocorre.</li>
        <li><strong>Às vezes</strong> – Ocorre em situações pontuais.</li>
        <li><strong>Frequentemente</strong> – Ocorre em boa parte das situações.</li>
        <li><strong>Quase sempre</strong> – É uma característica constante.</li>
      </ul>

      <div style={{
        marginTop: "1.5em",
        padding: "1em 1.2em",
        background: corDestaque,
        borderRadius: "0.75em",
        border: `1.5px solid ${corBorda}`,
        marginBottom: "2em"
      }}>
        <strong>Exemplo:</strong>
        <p style={{ margin: "0.5em 0 0.2em 0" }}>Você se distrai facilmente durante conversas importantes?</p>
        <p style={{ color: "#475569", fontSize: "0.97em" }}>
          Se isso acontece ocasionalmente, marque "Às vezes". Se for constante, marque "Quase sempre".
        </p>
      </div>

      <button
        onClick={iniciarTeste}
        style={{
          marginTop: "2em",
          padding: "0.85em 2.2em",
          backgroundColor: corPrimaria,
          color: "#fff",
          border: "none",
          borderRadius: "0.75em",
          fontWeight: 600,
          fontSize: "1.08em",
          cursor: "pointer",
          letterSpacing: "0.02em",
          boxShadow: "0 2px 12px #2563eb30",
          transition: "background 0.2s, color 0.2s"
        }}
      >
        Iniciar Teste
      </button>

      <p style={{ fontSize: "0.9em", marginTop: "2em", color: "#64748b" }}>
        As perguntas deste teste são inspiradas em instrumentos de referência clínica como o <strong>ADOS-2</strong> e o <strong>ADI-R</strong>.  
        O NeuroScan utiliza uma versão adaptada para triagem digital, sem finalidade diagnóstica, mas com rigor científico.
      </p>
    </div>
  );
}
