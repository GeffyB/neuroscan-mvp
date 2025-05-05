// ===============================================
// 📄 ARQUIVO: src/app/teste/page.tsx
// 🎯 OBJETIVO: Exibir perguntas, controlar timer e salvar respostas
// ===============================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import perguntas from "@/data/perguntas-tea-avancado.json";
import { useUserStore } from "@/store/userStore";

export default function Teste() {
  const router = useRouter();
  const { adicionarResposta } = useUserStore();

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(perguntas[0].tempo_limite);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [podeAvancar, setPodeAvancar] = useState(false);

  const perguntaAtual = perguntas[indiceAtual];

  // Inicia e reseta o timer a cada pergunta
  useEffect(() => {
    setTempoRestante(perguntaAtual.tempo_limite);
    setRespostaSelecionada(null);
    setPodeAvancar(false);

    const timer = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPodeAvancar(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [indiceAtual]);

  const handleAvancar = () => {
    if (respostaSelecionada !== null) {
      adicionarResposta({ perguntaId: perguntaAtual.id, valor: respostaSelecionada });
    }

    if (indiceAtual + 1 < perguntas.length) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      router.push("/resultado");
    }
  };

  return (
    <div>
      <h1>🧠 Teste NeuroScan</h1>

      <p><strong>{indiceAtual + 1} / {perguntas.length}</strong></p>
      <p>⏱️ Tempo restante: {tempoRestante}s</p>

      <h2>{perguntaAtual.texto}</h2>

      {perguntaAtual.respostas.map((resposta, index) => (
        <label key={index} style={{ display: "block", marginTop: "0.5em" }}>
          <input
            type="radio"
            name="resposta"
            value={resposta.valor}
            checked={respostaSelecionada === resposta.valor}
            disabled={tempoRestante === 0}
            onChange={() => {
              setRespostaSelecionada(resposta.valor);
              setPodeAvancar(true);
            }}
          />
          {resposta.texto}
        </label>
      ))}

      <button
        onClick={handleAvancar}
        disabled={!podeAvancar}
        style={{ marginTop: "1em" }}
      >
        {indiceAtual + 1 === perguntas.length ? "Finalizar Teste" : "Próxima →"}
      </button>
    </div>
  );
}
