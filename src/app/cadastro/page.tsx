// ===============================================
// 📄 ARQUIVO: src/app/cadastro/page.tsx
// 🎯 OBJETIVO: Coletar dados do respondente e avaliado com UF + cidade padronizados
// ===============================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import estadosCidades from "@/data/estados-cidades.json";

export default function Cadastro() {
  const router = useRouter();
  const { setRespondente, setAvaliado } = useUserStore();

  const [meRespondo, setMeRespondo] = useState(true);

  // 🍍 Dados do respondente
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [estadoUF, setEstadoUF] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");

  const cidadesDoEstado = estadosCidades.find((e) => e.sigla === estadoUF)?.cidades || [];

  // 🧒 Dados do avaliado (caso outro)
  const [nomeAvaliado, setNomeAvaliado] = useState("");
  const [idadeAvaliado, setIdadeAvaliado] = useState("");
  const [relacao, setRelacao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !nascimento || !estadoUF || !cidadeSelecionada) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    setRespondente({
      nome,
      email,
      cidade: `${cidadeSelecionada} - ${estadoUF}`,
      nascimento,
      paraOutraPessoa: !meRespondo,
    });

    if (!meRespondo) {
      if (!nomeAvaliado || !idadeAvaliado || !relacao) {
        alert("Preencha os dados do avaliado.");
        return;
      }

      setAvaliado({
        nome: nomeAvaliado,
        idade: parseInt(idadeAvaliado),
        relacao,
      });
    }

    router.push("/teste");
  };

  return (
    <div>
      <h1>📝 Cadastro</h1>

      <form onSubmit={handleSubmit}>
        <label>Nome completo:</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Data de nascimento:</label>
        <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} required />

        <label>Estado (UF):</label>
        <select value={estadoUF} onChange={(e) => setEstadoUF(e.target.value)} required>
          <option value="">Selecione um estado</option>
          {estadosCidades.map((estado) => (
            <option key={estado.sigla} value={estado.sigla}>
              {estado.nome} ({estado.sigla})
            </option>
          ))}
        </select>

        <label>Cidade:</label>
        <select
          value={cidadeSelecionada}
          onChange={(e) => setCidadeSelecionada(e.target.value)}
          required
          disabled={!estadoUF}
        >
          <option value="">Selecione uma cidade</option>
          {cidadesDoEstado.map((cidade) => (
            <option key={cidade.id} value={cidade.nome}>
              {cidade.nome}
            </option>
          ))}
        </select>

        <div style={{ marginTop: "1em" }}>
          <label>Você está fazendo o teste para:</label><br />
          <label>
            <input type="radio" checked={meRespondo} onChange={() => setMeRespondo(true)} /> Mim
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input type="radio" checked={!meRespondo} onChange={() => setMeRespondo(false)} /> Outra pessoa
          </label>
        </div>

        {!meRespondo && (
          <div style={{ marginTop: "1em" }}>
            <label>Nome do avaliado:</label>
            <input value={nomeAvaliado} onChange={(e) => setNomeAvaliado(e.target.value)} required />

            <label>Idade:</label>
            <input type="number" min={1} value={idadeAvaliado} onChange={(e) => setIdadeAvaliado(e.target.value)} required />

            <label>Relação com o avaliado:</label>
            <input value={relacao} onChange={(e) => setRelacao(e.target.value)} required />
          </div>
        )}

        <button type="submit" style={{ marginTop: "1em" }}>
          Iniciar Teste →
        </button>
      </form>
    </div>
  );
}
