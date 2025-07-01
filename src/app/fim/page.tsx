// ======================================
// 📄 ARQUIVO: src/app/fim/page.tsx (refinado, profissional)
// ======================================

"use client"; // necessário para permitir interatividade

export default function Fim() {
  // Paleta e estilo visual padronizado
  const corFundo = "#F6F9FB";
  const corPrimaria = "#2563eb";
  const corSecundaria = "#1e2937";
  const corBorda = "#cbd5e1";
  const corTextoSec = "#374151";

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "2em 1em",
        fontFamily: "'Inter', sans-serif",
        color: corSecundaria,
        textAlign: "center",
        background: corFundo,
        minHeight: "100vh",
        boxShadow: "0 0 32px #e0e7ef40"
      }}
    >
      <h1 style={{
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "1.2em",
        letterSpacing: "-0.02em"
      }}>
        Obrigado por concluir o NeuroScan!
      </h1>

      <p style={{ marginBottom: "1em", lineHeight: 1.6, fontSize: "1.08rem" }}>
        Sua participação é fundamental. O teste foi elaborado com base em protocolos reconhecidos (<strong>ADOS-2</strong> e <strong>ADI-R</strong>) para fornecer uma <strong>triagem inicial</strong> de neurodivergências.
      </p>

      <p style={{ marginBottom: "1em", lineHeight: 1.6 }}>
        Um profissional da nossa equipe poderá entrar em contato em breve pelo <strong>e-mail</strong> ou <strong>WhatsApp</strong> informado no cadastro, com orientações e recomendações adequadas.
      </p>

      <p style={{
        fontSize: "0.93em",
        color: corTextoSec,
        background: "#f9fafb",
        padding: "1em 0.5em",
        borderRadius: "0.75em",
        border: `1.5px solid ${corBorda}`,
        marginTop: "1.4em",
        marginBottom: "2em"
      }}>
        Este teste não substitui avaliação médica. Os dados são utilizados exclusivamente para fins de triagem e encaminhamento profissional.
      </p>

      <p style={{ marginBottom: "2.5em", lineHeight: 1.6, color: corTextoSec }}>
        Enquanto isso, acesse nossos conteúdos educativos e conheça mais sobre TEA, TDAH e outros perfis neurodivergentes.
      </p>

      <button
        onClick={() => window.location.href = "https://www.instagram.com/clinica.amekids/"}
        style={{
          backgroundColor: corPrimaria,
          color: "#fff",
          padding: "0.85em 2em",
          border: "none",
          borderRadius: "0.75em",
          fontWeight: 600,
          fontSize: "1.08em",
          cursor: "pointer",
          letterSpacing: "0.02em",
          boxShadow: "0 2px 12px #2563eb30",
          transition: "background-color 0.2s",
        }}
      >
        Acessar Conteúdos
      </button>
    </div>
  );
}
