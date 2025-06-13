// ============================================
// 📦 ARQUIVO: src/app/resultado/page.tsx
// ============================================

// 🎯 OBJETIVO: Mostrar resultado baseado nas respostas e categorias

"use client";

import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Resultado() {
  const router = useRouter();
  const { respondente, avaliado, respostas, perguntasSorteadas } = useUserStore();

  const [total, setTotal] = useState(0);
  const [porCategoria, setPorCategoria] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (!respostas.length) {
      router.push("/");
      return;
    }

    // Soma total
    const somaTotal = respostas.reduce((acc, curr) => acc + curr.valor, 0);
    setTotal(somaTotal);

    // Pontuação por categoria
    const catPontuadas: { [key: string]: number[] } = {};
    respostas.forEach(({ perguntaId, valor }) => {
      const pergunta = perguntasSorteadas.find((p) => p.id === perguntaId);
      if (pergunta) {
        pergunta.condicoes.forEach((cond) => {
          if (!catPontuadas[cond]) catPontuadas[cond] = [];
          catPontuadas[cond].push(valor);
        });
      }
    });

    const mediaCat: { [key: string]: number } = {};
    Object.entries(catPontuadas).forEach(([cond, valores]) => {
      const media = valores.reduce((a, b) => a + b, 0) / valores.length;
      mediaCat[cond] = Math.round(media * 100) / 100;
    });

    setPorCategoria(mediaCat);
  }, []);

  const nomeExibido = avaliado?.nome || respondente.nome;

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "2em 1em",
        fontFamily: "'Inter', sans-serif",
        color: "#1f2937",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1em", display: "flex", alignItems: "center", gap: "0.5em" }}>
        📈 Resultado de {nomeExibido}
      </h1>

      <p style={{ marginBottom: "1em", lineHeight: 1.6 }}>
        ✅ Teste concluído! Com base nas suas respostas, foi gerada uma pontuação indicativa para cada grupo avaliado.
      </p>

      <h2 style={{ fontSize: "1.25rem", marginTop: "1.5em", marginBottom: "0.5em" }}>🎯 Pontuação Geral</h2>
      <p style={{ marginBottom: "1em" }}><strong>Total:</strong> {total} pontos</p>

      <h2 style={{ fontSize: "1.25rem", marginTop: "1.5em", marginBottom: "0.5em" }}>🧩 Pontuação por Categoria</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0, marginBottom: "1.5em" }}>
        {Object.entries(porCategoria).map(([categoria, media]) => (
          <li key={categoria} style={{ marginBottom: "0.5em" }}>
            <strong>{categoria}:</strong> {media} (média)
          </li>
        ))}
      </ul>

      <hr style={{ margin: "2em 0", borderColor: "#e5e7eb" }} />

      <p style={{ fontSize: "0.95em", color: "#374151", marginBottom: "0.75em" }}>
        🧠 Os resultados foram calculados com base nos testes clínicos <strong>ADOS-2</strong> e <strong>ADI-R</strong>, reconhecidos por sua alta confiabilidade na triagem de neurodivergências.
        Este teste não é diagnóstico, mas serve como base indicativa.
      </p>

      <p style={{ fontSize: "0.95em", color: "#374151", marginBottom: "0.75em" }}>
        📬 Você receberá em breve, por e-mail e/ou WhatsApp, um relatório personalizado feito por um profissional da área, com recomendações e próximos passos.
      </p>

      <p style={{ marginBottom: "2em", lineHeight: 1.6 }}>
        🧡 Obrigado por confiar no <strong>NeuroScan</strong>. Desejamos clareza e acolhimento em sua jornada.
      </p>

      <button
        onClick={() => router.push("/fim")}
        style={{
          padding: "0.75em 1.5em",
          backgroundColor: "#7C3AED",
          color: "#fff",
          border: "none",
          borderRadius: "0.75em",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Finalizar →
      </button>
    </div>
  );
}
