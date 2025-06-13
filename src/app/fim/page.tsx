// ======================================
// 📦 ARQUIVO: src/app/fim/page.tsx
// ======================================

"use client"; // 👈 necessário para permitir interatividade

export default function Fim() {
  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "2em 1em",
        fontFamily: "'Inter', sans-serif",
        color: "#1f2937",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1em" }}>
        🎉 Obrigado por concluir o NeuroScan!
      </h1>

      <p style={{ marginBottom: "1em", lineHeight: 1.6 }}>
        Sua participação é muito importante. Este teste foi elaborado com base em protocolos reconhecidos (como o <strong>ADOS-2</strong> e <strong>ADI-R</strong>) para fornecer uma <strong>triagem inicial</strong> de neurodivergências.
      </p>

      <p style={{ marginBottom: "1em", lineHeight: 1.6 }}>
        Um profissional da nossa equipe poderá entrar em contato em breve pelo <strong>e-mail</strong> ou <strong>WhatsApp</strong> fornecido durante o cadastro, com orientações e encaminhamentos adequados.
      </p>

      <p style={{ fontSize: "0.9em", color: "#555", marginTop: "1em", marginBottom: "2em" }}>
        ⚠️ Este teste não substitui uma avaliação médica. Os dados são utilizados exclusivamente para fins de triagem e recomendação profissional.
      </p>

      <p style={{ marginBottom: "2em", lineHeight: 1.6 }}>
        💡 Enquanto isso, conheça nossos conteúdos educativos e entenda mais sobre TEA, TDAH e outras condições neurodivergentes.
      </p>

      <button
        onClick={() => window.location.href = "https://neuroscan.com.br/conteudo"}
        style={{
          backgroundColor: "#7C3AED",
          color: "#fff",
          padding: "0.75em 1.5em",
          border: "none",
          borderRadius: "0.75em",
          fontWeight: 600,
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
      >
        Acessar Conteúdos →
      </button>
    </div>
  );
}
