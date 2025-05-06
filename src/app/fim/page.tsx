// ======================================
// 📦 ARQUIVO: src/app/fim/page.tsx
// ======================================

"use client"; // 👈 necessário para permitir interatividade

export default function Fim() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      <h1>🎉 Obrigado por concluir o NeuroScan!</h1>

      <p>
        Sua participação é muito importante. Este teste foi elaborado com base em protocolos reconhecidos (como o ADOS-2 e ADI-R) para fornecer uma <strong>triagem inicial</strong> de neurodivergências.
      </p>

      <p>
        Um profissional da nossa equipe poderá entrar em contato em breve pelo <strong>e-mail</strong> ou <strong>WhatsApp</strong> fornecido durante o cadastro, com orientações e encaminhamentos adequados.
      </p>

      <p style={{ fontSize: "0.9em", color: "#555", marginTop: "1em" }}>
        ⚠️ Este teste não substitui uma avaliação médica. Os dados são utilizados exclusivamente para fins de triagem e recomendação profissional.
      </p>

      <p style={{ marginTop: "2em" }}>
        💡 Enquanto isso, conheça nossos conteúdos educativos e entenda mais sobre TEA, TDAH e outras condições neurodivergentes.
      </p>

      <button
        onClick={() => window.location.href = "https://neuroscan.com.br/conteudo"}
        style={{ marginTop: "1em" }}
      >
        Acessar Conteúdos →
      </button>
    </div>
  );
}
