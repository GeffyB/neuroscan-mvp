// ===============================================
// 📄 ARQUIVO: src/app/teste/page.tsx
// 🎯 OBJETIVO: Sorteio e execução do teste dinâmico com base clínica
// ===============================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import perguntasBase from "@/data/perguntas-tea-avancado.json";
import { useUserStore } from "@/store/userStore";

export default function Teste() {
  const router = useRouter();
  const {
    avaliado,
    perguntasSorteadas,
    setPerguntasSorteadas,
    adicionarResposta,
  } = useUserStore();

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [podeAvancar, setPodeAvancar] = useState(false);

  // 🔀 Função de sorteio balanceado
  function sortearPerguntas() {
    const idade = avaliado?.idade || 18;
    const faixa = idade < 13 ? "crianca" : idade < 18 ? "adolescente" : "adulto";

    const categorias = ["Comunicação Social", "Interação Recíproca", "Comportamentos Repetitivos", "Sensorialidade"];
    let selecionadas: typeof perguntasBase = [];

    categorias.forEach((cat) => {
      const porCategoria = perguntasBase.filter(
        (p) => p.categoria === cat && p.faixa_etaria.includes(faixa)
      );
      const embaralhadas = porCategoria.sort(() => Math.random() - 0.5);
      selecionadas.push(...embaralhadas.slice(0, 5));
    });

    return selecionadas.sort(() => Math.random() - 0.5);
  }

  // 🔁 Ao carregar a página, sorteia se necessário
  useEffect(() => {
    if (!perguntasSorteadas.length) {
      const sorteadas = sortearPerguntas();
      setPerguntasSorteadas(sorteadas);
    }
  }, []);

  const perguntas = perguntasSorteadas;
  const perguntaAtual = perguntas[indiceAtual];

  // ⏱️ Timer reiniciado a cada pergunta
  useEffect(() => {
    if (!perguntaAtual) return;
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
  }, [indiceAtual, perguntaAtual]);

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

  if (!perguntaAtual) return <p>🔃 Carregando teste...</p>;

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
