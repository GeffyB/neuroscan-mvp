// ===============================================
// 📄 ARQUIVO: src/app/cadastro/page.tsx
// 🎯 OBJETIVO: Coletar dados do respondente e avaliado com melhor UI
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
  const [celular, setCelular] = useState("");
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

    if (!nome || !email || !celular || ehWhatsapp === null || !nascimento || !estadoUF || !cidadeSelecionada) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

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
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>📝 Cadastro</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <label>Nome completo:
          <input value={nome} onChange={(e) => setNome(e.target.value)} required />
        </label>

        <label>E-mail:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>Celular:
          <input type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} required />
        </label>

        <div>
          <p>É WhatsApp:</p>
          <label>
            <input
              type="radio"
              name="ehWhatsapp"
              checked={ehWhatsapp === true}
              onChange={() => setEhWhatsapp(true)}
            /> Sim
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input
              type="radio"
              name="ehWhatsapp"
              checked={ehWhatsapp === false}
              onChange={() => setEhWhatsapp(false)}
            /> Não
          </label>
        </div>

        <label>Data de nascimento:
          <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} required />
        </label>

        <label>Estado (UF):
          <select value={estadoUF} onChange={(e) => setEstadoUF(e.target.value)} required>
            <option value="">Selecione um estado</option>
            {estadosCidades.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.nome} ({estado.sigla})
              </option>
            ))}
          </select>
        </label>

        <label>Cidade:
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

        <div>
          <p>Você está fazendo o teste para:</p>
          <label>
            <input type="radio" checked={meRespondo} onChange={() => setMeRespondo(true)} /> Mim
          </label>
          <label style={{ marginLeft: "1em" }}>
            <input type="radio" checked={!meRespondo} onChange={() => setMeRespondo(false)} /> Outra pessoa
          </label>
        </div>

        {!meRespondo && (
          <>
            <label>Nome do avaliado:
              <input value={nomeAvaliado} onChange={(e) => setNomeAvaliado(e.target.value)} required />
            </label>

            <label>Idade:
              <input type="number" min={1} value={idadeAvaliado} onChange={(e) => setIdadeAvaliado(e.target.value)} required />
            </label>

            <label>Relação com o avaliado:
              <input value={relacao} onChange={(e) => setRelacao(e.target.value)} required />
            </label>
          </>
        )}

        <button type="submit">
          Iniciar Teste →
        </button>
      </form>
    </div>
  );
}
