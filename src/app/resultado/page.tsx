// ============================================
// 📄 ARQUIVO: src/app/resultado/page.tsx (refinado, profissional)
// ============================================

"use client";

import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Resultado() {
  const router = useRouter();
  const { respondente, avaliado, respostas, perguntasSorteadas } = useUserStore();

  const [total, setTotal] = useState(0);
  const [porCategoria, setPorCategoria] = useState<{ [key: string]: number }>({});
  const [salvou, setSalvou] = useState(false);

  useEffect(() => {
    if (!respostas.length) {
      router.push("/");
      return;
    }

    const somaTotal = respostas.reduce((acc, curr) => acc + curr.valor, 0);
    setTotal(somaTotal);

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

    // --- SALVA NO FIRESTORE, AGORA SEM CAMPOS undefined E COM TIPAGEM FLEXÍVEL ---
    async function salvarFirestore() {
      if (salvou) return; // Já salvou, não repete

      // Prepara objeto para enviar ao Firestore SEM undefined
      const dadosParaSalvar: Record<string, any> = {
        respondente: respondente || {},
        respostas: respostas || [],
        resultado: {
          total: somaTotal,
          porCategoria: mediaCat,
        },
        criadoEm: serverTimestamp(),
      };
      // Só adiciona avaliado se existir
      if (avaliado) {
        dadosParaSalvar.avaliado = avaliado;
      }

      // LOG antes de salvar
      // console.log("[Firebase] Tentando salvar resultado no Firestore...");
      // console.log("[Firebase] Dados enviados:", dadosParaSalvar);

      try {
        const docRef = await addDoc(collection(db, "testes"), dadosParaSalvar);
        setSalvou(true);
        // LOG de sucesso
        // console.log("[Firebase] Resultado SALVO com sucesso! Doc ID:", docRef.id);
      } catch (e) {
        // LOG de erro detalhado
        // console.error("[Firebase] ERRO ao salvar no Firestore:", e);
      }
    }
    salvarFirestore();
    // eslint-disable-next-line
  }, []);

  const nomeExibido = avaliado?.nome || respondente.nome;

  // Paleta e layout profissional
  const corFundo = "#F6F9FB";
  const corPrimaria = "#2563eb";
  const corSecundaria = "#1e293b";
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
        background: corFundo,
        minHeight: "100vh",
        boxShadow: "0 0 32px #e0e7ef40"
      }}
    >
      <h1 style={{
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "1em",
        letterSpacing: "-0.02em"
      }}>
        Resultado de {nomeExibido}
      </h1>

      <p style={{ marginBottom: "1em", lineHeight: 1.6, fontSize: "1.08rem" }}>
        Teste concluído! Com base nas suas respostas, foi gerada uma pontuação indicativa para cada grupo avaliado.
      </p>

      <h2 style={{ fontSize: "1.25rem", marginTop: "1.5em", marginBottom: "0.5em", fontWeight: 600 }}>
        Pontuação Geral
      </h2>
      <p style={{ marginBottom: "1em", fontSize: "1.1em" }}>
        <strong>Total:</strong> {total} pontos
      </p>

      <h2 style={{ fontSize: "1.25rem", marginTop: "1.5em", marginBottom: "0.5em", fontWeight: 600 }}>
        Pontuação por Categoria
      </h2>
      <ul style={{ listStyle: "none", paddingLeft: 0, marginBottom: "1.5em" }}>
        {Object.entries(porCategoria).map(([categoria, media]) => (
          <li key={categoria} style={{ marginBottom: "0.5em", fontSize: "1.05em" }}>
            <strong>{categoria}:</strong> {media} (média)
          </li>
        ))}
      </ul>

      <hr style={{ margin: "2em 0", borderColor: corBorda }} />

      <p style={{ fontSize: "0.95em", color: corTextoSec, marginBottom: "0.75em" }}>
        Os resultados foram calculados com base nos testes clínicos <strong>ADOS-2</strong> e <strong>ADI-R</strong>, reconhecidos por sua alta confiabilidade na triagem de neurodivergências.<br />
        Este teste não é diagnóstico, mas serve como base indicativa.
      </p>

      <p style={{ fontSize: "0.95em", color: corTextoSec, marginBottom: "0.75em" }}>
        Você receberá em breve, por e-mail e/ou WhatsApp, um relatório personalizado feito por um profissional da área, com recomendações e próximos passos.
      </p>

      <p style={{ marginBottom: "2em", lineHeight: 1.6, color: corTextoSec }}>
        Obrigado por confiar no <strong>NeuroScan</strong>. Desejamos clareza e acolhimento em sua jornada.
      </p>

      <button
        onClick={() => router.push("/fim")}
        style={{
          padding: "0.75em 1.5em",
          backgroundColor: corPrimaria,
          color: "#fff",
          border: "none",
          borderRadius: "0.75em",
          fontWeight: 600,
          fontSize: "1.08em",
          cursor: "pointer",
          letterSpacing: "0.02em",
          boxShadow: "0 2px 12px #2563eb30",
        }}
      >
        Finalizar
      </button>
    </div>
  );
}
