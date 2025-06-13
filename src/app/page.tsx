// =============================
// 📄 ARQUIVO: src/app/page.tsx
// 🎯 OBJETIVO: Tela inicial de boas-vindas com explicação e início do fluxo
// =============================

export default function Home() {
  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "2.5em 1.5em",
        fontFamily: "'Inter', sans-serif",
        color: "#1f2937",
      }}
    >
      <h1 style={{ fontSize: "1.875rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5em", marginBottom: "1em" }}>
        🧠 Bem-vindo(a) ao NeuroScan
      </h1>

      <p style={{ marginBottom: "1em", fontSize: "1rem", lineHeight: "1.6" }}>
        O <strong>NeuroScan</strong> é uma ferramenta interativa de triagem digital baseada em testes clínicos reconhecidos como o <em>ADOS-2</em> e <em>ADI-R</em>.
      </p>

      <p style={{ marginBottom: "1em", fontSize: "1rem", lineHeight: "1.6" }}>
        Seu objetivo é oferecer uma <strong>triagem inicial confiável</strong> para identificar sinais de neurodivergências como <strong>TEA</strong>, <strong>TDAH</strong> e outras condições cognitivas.
      </p>

      <p style={{ marginBottom: "1em", color: "#b30000", fontWeight: "bold" }}>
        ⚠️ Importante: este teste não substitui uma avaliação médica profissional!
      </p>

      <p style={{ marginBottom: "2em", fontSize: "1rem", lineHeight: "1.6" }}>
        As perguntas são organizadas em um formato objetivo e com tempo limitado para garantir maior fidelidade na análise.
        Ao final, um especialista poderá entrar em contato com mais orientações baseadas nos seus resultados.
      </p>

      <a
        href="/cadastro"
        style={{
          display: "inline-block",
          backgroundColor: "#2563eb",
          color: "#fff",
          padding: "0.75em 1.5em",
          borderRadius: "0.75em",
          textDecoration: "none",
          fontWeight: 600,
        }}
        className="hover-effect"
      >
        🚀 Começar Cadastro
      </a>
    </div>
  );
}
