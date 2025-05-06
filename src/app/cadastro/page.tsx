// ===============================================
// 📄 ARQUIVO: src/app/cadastro/page.tsx
// 🎯 OBJETIVO: Coletar dados do respondente e avaliado com campos melhor formatados
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
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ddd, setDDD] = useState("");
  const [telefone, setTelefone] = useState("");
  const [ehWhatsapp, setEhWhatsapp] = useState<null | boolean>(null);
  const [nascimento, setNascimento] = useState("");
  const [estadoUF, setEstadoUF] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");

  const cidadesDoEstado = estadosCidades.find((e) => e.sigla === estadoUF)?.cidades || [];

  const [nomeAvaliado, setNomeAvaliado] = useState("");
  const [idadeAvaliado, setIdadeAvaliado] = useState("");
  const [relacao, setRelacao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !ddd || !telefone || ehWhatsapp === null || !nascimento || !estadoUF || !cidadeSelecionada) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const celular = `(${ddd}) ${telefone}`;

    setRespondente({
      nome,
      email,
      celular,
      ehWhatsapp,
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

    router.push("/instrucoes");
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h1>📝 Cadastro</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <label>
          Nome completo:
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite aqui seu nome completo..."
            style={{ width: "100%" }}
            required
          />
        </label>

        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@provedor.com"
            required
          />
        </label>

        <label>
          Celular:
          <div style={{ display: "flex", gap: "1em" }}>
            <input
              type="text"
              value={ddd}
              onChange={(e) => setDDD(e.target.value.replace(/\D/g, ""))}
              placeholder="DDD"
              maxLength={2}
              style={{ width: "80px" }}
              required
            />
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ""))}
              placeholder="999999999"
              required
            />
          </div>
        </label>

        <div>
          <p>É WhatsApp:</p>
          <label>
            <input
              type="radio"
              name="ehWhatsapp"
              checked={ehWhatsapp === true}
              onChange={() => setEhWhatsapp(true)}
            />{" "}
            Sim
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input
              type="radio"
              name="ehWhatsapp"
              checked={ehWhatsapp === false}
              onChange={() => setEhWhatsapp(false)}
            />{" "}
            Não
          </label>
        </div>

        <label>
          Data de nascimento:
          <input
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            required
          />
        </label>

        <label>
          Estado (UF):
          <select value={estadoUF} onChange={(e) => setEstadoUF(e.target.value)} required>
            <option value="">Selecione um estado</option>
            {estadosCidades.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.nome} ({estado.sigla})
              </option>
            ))}
          </select>
        </label>

        <label>
          Cidade:
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
        </label>

        <div style={{ marginTop: "1em" }}>
          <label>Você está fazendo o teste:</label>
          <br />
          <label>
            <input type="radio" checked={meRespondo} onChange={() => setMeRespondo(true)} /> Para você
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input type="radio" checked={!meRespondo} onChange={() => setMeRespondo(false)} /> Para outra pessoa
          </label>
        </div>

        {!meRespondo && (
          <div style={{ marginTop: "1em", display: "flex", flexDirection: "column", gap: "1em" }}>
            <label>
              Nome do avaliado:
              <input
                value={nomeAvaliado}
                onChange={(e) => setNomeAvaliado(e.target.value)}
                placeholder="Nome completo da pessoa avaliada"
                required
              />
            </label>

            <label>
              Idade:
              <input
                type="number"
                min={1}
                value={idadeAvaliado}
                onChange={(e) => setIdadeAvaliado(e.target.value)}
                placeholder="Ex: 14"
                required
              />
            </label>

            <label>
              Relação com o avaliado:
              <input
                value={relacao}
                onChange={(e) => setRelacao(e.target.value)}
                placeholder="Ex: Mãe, professor, responsável legal..."
                required
              />
            </label>
          </div>
        )}

        <button type="submit" style={{ marginTop: "1em" }}>
          Iniciar Teste →
        </button>
      </form>
    </div>
  );
}
