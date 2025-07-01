// =============================
// 📄 ARQUIVO: src/app/page.tsx (refinado, profissional)
// =============================

export default function Home() {
  // Paleta: azul acinzentado suave, fundo offwhite
  const corFundo = "#F6F9FB";
  const corPrimaria = "#2563eb";
  const corSecundaria = "#1e293b";
  const corAlerta = "#c02628";
  const corBorda = "#cbd5e1";

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "2.5em 1.5em",
        fontFamily: "'Inter', sans-serif",
        color: corSecundaria,
        background: corFundo,
        minHeight: "100vh",
        boxShadow: "0 0 32px #e0e7ef40"
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "1.5em" }}>
        Bem-vindo(a) ao NeuroScan
      </h1>

      <p style={{ marginBottom: "1em", fontSize: "1.08rem", lineHeight: "1.65" }}>
        O <strong>NeuroScan</strong> é uma solução digital de triagem baseada em protocolos clínicos reconhecidos (<em>ADOS-2</em> e <em>ADI-R</em>), desenvolvida para apoiar a identificação inicial de sinais de neurodivergências, como <strong>TEA</strong>, <strong>TDAH</strong> e outros perfis cognitivos.
      </p>

      <p style={{ marginBottom: "1em", fontSize: "1.08rem", lineHeight: "1.65" }}>
        O teste é organizado em perguntas objetivas e com tempo limitado, promovendo análise fiel e resultados confiáveis. Ao término, um especialista poderá fornecer orientações personalizadas.
      </p>

      <div style={{
        background: "#fff6f6",
        color: corAlerta,
        fontWeight: 600,
        padding: "1em 1.2em",
        borderRadius: "0.75em",
        marginBottom: "2em",
        border: `1.5px solid #ffd5d5`
      }}>
        Importante: esta triagem não substitui avaliação clínica profissional.
      </div>

      <a
        href="/cadastro"
        style={{
          display: "inline-block",
          backgroundColor: corPrimaria,
          color: "#fff",
          padding: "0.9em 2.2em",
          borderRadius: "0.75em",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "1.1em",
          boxShadow: "0 2px 12px #2563eb30",
          letterSpacing: "0.02em",
          transition: "background 0.2s, color 0.2s"
        }}
      >
        Iniciar Cadastro
      </a>
    </div>
  );
}
