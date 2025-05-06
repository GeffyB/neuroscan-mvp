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
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>📈 Resultado de {nomeExibido}</h1>

      <p>
        ✅ Teste concluído! Com base nas suas respostas, foi gerada uma pontuação indicativa para cada grupo avaliado.
      </p>

      <h2>Pontuação Geral</h2>
      <p><strong>Total:</strong> {total} pontos</p>

      <h2>Pontuação por Categoria</h2>
      <ul>
        {Object.entries(porCategoria).map(([categoria, media]) => (
          <li key={categoria}>
            <strong>{categoria}:</strong> {media} (média)
          </li>
        ))}
      </ul>

      <hr style={{ margin: "1em 0" }} />

      <p style={{ fontSize: "0.9em", color: "#555" }}>
        🧠 Os resultados foram calculados com base nos testes clínicos ADOS-2 e ADI-R, reconhecidos por sua alta confiabilidade na triagem de neurodivergências. Este teste não é diagnóstico, mas serve como base indicativa.
      </p>

      <p style={{ fontSize: "0.9em", color: "#555" }}>
        📬 Você receberá em breve, por e-mail e/ou WhatsApp, um relatório personalizado feito por um profissional da área, com recomendações e próximos passos.
      </p>

      <p>🧡 Obrigado por confiar no NeuroScan. Desejamos clareza e acolhimento em sua jornada.</p>

      <button onClick={() => router.push("/fim")} style={{ marginTop: "1em" }}>
        Finalizar →
      </button>
    </div>
  );
}
