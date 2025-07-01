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
    // resetAll, // REMOVIDO porque não existe no store (ainda!)
  } = useUserStore();

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [podeAvancar, setPodeAvancar] = useState(false);

  // === Bloco Anti-cheat/Back/Refresh ==========
  useEffect(() => {
    // Nome maroto pro nosso token
    const neuroTokenMaluquinho = localStorage.getItem("neuroTokenMaluquinho");
    if (!neuroTokenMaluquinho) {
      // Aqui seria a limpeza de dados, mas por enquanto não precisa!
      // Sinaliza para o cadastro o motivo
      localStorage.setItem("neuroAlerta", "⚠️ Você tentou voltar ou recarregar a página durante o teste. Para garantir resultados confiáveis, é necessário reiniciar o cadastro e começar do zero.");
      router.replace("/cadastro");
    }
    // Remove o alerta assim que acessa o teste normalmente
    return () => {
      localStorage.removeItem("neuroAlerta");
    };
  }, []);
  // ============================================

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

  useEffect(() => {
    if (!perguntasSorteadas.length) {
      const sorteadas = sortearPerguntas();
      setPerguntasSorteadas(sorteadas);
    }
  }, []);

  const perguntas = perguntasSorteadas;
  const perguntaAtual = perguntas[indiceAtual];

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
      // Teste finalizado, pode remover o token
      localStorage.removeItem("neuroTokenMaluquinho");
      router.push("/resultado");
    }
  };

  if (!perguntaAtual) return <p>🔃 Carregando teste...</p>;

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
        🧠 Teste NeuroScan
      </h1>

      <p style={{ marginBottom: "0.5em" }}><strong>{indiceAtual + 1} / {perguntas.length}</strong></p>
      <p style={{ marginBottom: "1em" }}>⏱️ Tempo restante: {tempoRestante}s</p>

      <h2 style={{ fontSize: "1.25rem", marginBottom: "1em" }}>{perguntaAtual.texto}</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75em", marginTop: "1em" }}>
        {perguntaAtual.respostas.map((resposta, index) => (
          <button
            key={index}
            disabled={tempoRestante === 0}
            onClick={() => {
              setRespostaSelecionada(resposta.valor);
              setPodeAvancar(true);
            }}
            style={{
              textAlign: "left",
              width: "100%",
              padding: "0.75em 1em",
              borderRadius: "0.75em",
              border: "1px solid #3B82F6",
              backgroundColor: respostaSelecionada === resposta.valor ? "#2563EB" : "#DBEAFE",
              color: respostaSelecionada === resposta.valor ? "#fff" : "#1E40AF",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            {resposta.texto}
          </button>
        ))}
      </div>

      <button
        onClick={handleAvancar}
        disabled={!podeAvancar}
        style={{
          marginTop: "2em",
          padding: "0.75em 1.5em",
          backgroundColor: "#7C3AED",
          color: "#fff",
          border: "none",
          borderRadius: "0.75em",
          fontWeight: 600,
          cursor: podeAvancar ? "pointer" : "not-allowed",
          opacity: podeAvancar ? 1 : 0.5,
          transition: "background-color 0.2s",
        }}
      >
        {indiceAtual + 1 === perguntas.length ? "Finalizar Teste" : "Próxima →"}
      </button>
    </div>
  );
}
