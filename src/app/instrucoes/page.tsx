// ===============================================
// 📄 ARQUIVO: src/app/instrucoes/page.tsx
// 🎯 OBJETIVO: Instruções antes do início do teste
// ===============================================

"use client";

import { useRouter } from "next/navigation";

export default function Instrucoes() {
  const router = useRouter();

  const iniciarTeste = () => {
    router.push("/teste");
  };

  return (
    <div style={{ padding: "2em", maxWidth: 700, margin: "0 auto" }}>
      <h1>📘 Instruções do Teste</h1>

      <p>
        Este teste é uma <strong>triagem indicativa</strong> para auxiliar na identificação de comportamentos associados a condições como o <strong>Transtorno do Espectro Autista (TEA)</strong>.
      </p>

      <ul style={{ marginTop: "1em", marginBottom: "1em" }}>
        <li>🕒 Duração estimada: cerca de 10 a 15 minutos.</li>
        <li>📵 Escolha um ambiente calmo, sem interrupções ou distrações.</li>
        <li>⏱️ Cada pergunta possui um limite de tempo. Após o tempo acabar, não será possível marcar uma resposta.</li>
        <li>🧠 Tente responder com sinceridade e foco, baseando-se em comportamentos reais e recorrentes.</li>
      </ul>

      <h2>🔍 Como responder</h2>

      <p>As perguntas possuem opções como:</p>

      <ul>
        <li><strong>Nunca</strong> – O comportamento não ocorre.</li>
        <li><strong>Às vezes</strong> – Ocorre em situações pontuais.</li>
        <li><strong>Frequentemente</strong> – Ocorre em boa parte das situações.</li>
        <li><strong>Quase sempre</strong> – É uma característica constante.</li>
      </ul>

      <div style={{ marginTop: "1.5em", padding: "1em", background: "#f0f0f0", borderRadius: "8px" }}>
        <strong>Exemplo:</strong>
        <p>“Você se distrai facilmente durante conversas importantes?”</p>
        <p><em>Se isso acontece ocasionalmente, marque "Às vezes". Se for constante, marque "Quase sempre".</em></p>
      </div>

      <button
        onClick={iniciarTeste}
        style={{
          marginTop: "2em",
          padding: "1em 2em",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1.1em",
        }}
      >
        Iniciar Teste →
      </button>

      <p style={{ fontSize: "0.8em", marginTop: "1.5em", color: "#555" }}>
       📌 As perguntas deste teste foram adaptadas com base em instrumentos de referência clínica como o <strong>ADOS-2</strong> (Autism Diagnostic Observation Schedule, 2ª edição) e o <strong>ADI-R</strong> (Autism Diagnostic Interview – Revised). Estes instrumentos são amplamente utilizados por especialistas para avaliação formal de TEA. O NeuroScan utiliza uma versão simplificada e não diagnóstica, com fins exclusivamente educativos e de triagem.
      </p>

    </div>
  );
}
