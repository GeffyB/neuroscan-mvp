// ===============================================
// 📄 ARQUIVO: src/app/cadastro/page.tsx (refinado)
// ===============================================

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import estadosCidades from "@/data/estados-cidades.json";

// Função para validar nome completo
function nomeEhCompleto(nome: string) {
  const partes = nome.trim().split(/\s+/);
  return partes.length >= 2 && partes.every((p) => p.length >= 3);
}

// Regex para email
function emailValido(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// DDD e telefone: só números, tamanhos mínimos
function dddValido(ddd: string) {
  return /^\d{2}$/.test(ddd);
}
function telefoneValido(tel: string) {
  return /^\d{8,9}$/.test(tel); // 8 ou 9 dígitos
}

// Data BR em formato dd/mm/yyyy
function dataBRValida(dateStr: string) {
  let [ano, mes, dia] = ["", "", ""];
  if (dateStr.includes("-")) {
    [ano, mes, dia] = dateStr.split("-");
  } else if (dateStr.includes("/")) {
    [dia, mes, ano] = dateStr.split("/");
  } else {
    return false;
  }
  const data = new Date(+ano, +mes - 1, +dia);
  const hoje = new Date();
  const minAno = hoje.getFullYear() - 120;
  if (data > hoje) return false;
  if (+ano < minAno) return false;
  return data.getFullYear() == +ano && (data.getMonth() + 1) == +mes && data.getDate() == +dia;
}

export default function Cadastro() {
  const router = useRouter();
  const { setRespondente, setAvaliado } = useUserStore();

  const [alertaDoChefinho, setAlertaDoChefinho] = useState<string | null>(null);

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

  useEffect(() => {
    const alerta = localStorage.getItem("neuroAlerta");
    if (alerta) {
      setAlertaDoChefinho(alerta);
      localStorage.removeItem("neuroAlerta");
    }
    localStorage.removeItem("neuroTokenMaluquinho");
  }, []);

  // BLOQUEIA ENTRADA DE DDD PARA APENAS 2 DÍGITOS NUMÉRICOS
  const handleDDD = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setDDD(value.slice(0, 2));
  };

  // BLOQUEIA TELEFONE PARA 8 OU 9 DÍGITOS NUMÉRICOS
  const handleTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 9) setTelefone(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomeEhCompleto(nome)) {
      alert("Nome deve ser completo (mínimo 2 palavras, cada uma com pelo menos 3 letras)");
      return;
    }
    if (!emailValido(email)) {
      alert("E-mail inválido. Digite um endereço válido!");
      return;
    }
    if (!dddValido(ddd)) {
      alert("DDD inválido. Use 2 dígitos (ex: 11)");
      return;
    }
    if (!telefoneValido(telefone)) {
      alert("Número de celular inválido. Use 8 ou 9 dígitos (apenas números).");
      return;
    }
    if (ehWhatsapp === null) {
      alert("Informe se é WhatsApp!");
      return;
    }
    if (!nascimento || !dataBRValida(nascimento)) {
      alert("Data de nascimento inválida ou no formato errado.");
      return;
    }
    if (!estadoUF) {
      alert("Selecione o estado.");
      return;
    }
    if (!cidadeSelecionada) {
      alert("Selecione a cidade.");
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
      if (!nomeEhCompleto(nomeAvaliado)) {
        alert("Nome do avaliado deve ser completo (mínimo 2 palavras, cada uma com pelo menos 3 letras)");
        return;
      }
      const idadeNum = parseInt(idadeAvaliado, 10);
      if (!idadeNum || idadeNum < 1 || idadeNum > 120) {
        alert("Idade do avaliado inválida.");
        return;
      }
      if (!relacao.trim()) {
        alert("Informe a relação com o avaliado.");
        return;
      }

      setAvaliado({
        nome: nomeAvaliado,
        idade: idadeNum,
        relacao,
      });
    }

    localStorage.setItem("neuroTokenMaluquinho", Date.now().toString());
    router.push("/instrucoes");
  };

  // ============ ESTILOS PARA NOVA PALETA PROFISSIONAL ============
  const corFundo = "#F6F9FB"; // suave azulada
  const corPrimaria = "#2563eb";
  const corSecundaria = "#1e293b";
  const corBorda = "#cbd5e1";

  return (
    <div style={{
      maxWidth: 700,
      minHeight: "100vh",
      margin: "0 auto",
      padding: "2em 1em",
      background: corFundo,
      fontFamily: "'Inter', sans-serif",
      color: corSecundaria,
      boxShadow: "0 0 32px #e0e7ef40"
    }}>
      <h1 style={{
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "1em",
        letterSpacing: "-0.02em"
      }}>
        Cadastro NeuroScan
      </h1>

      {alertaDoChefinho && (
        <div style={{
          background: "#fff8e1",
          color: "#ad8500",
          padding: "1em",
          borderRadius: "0.75em",
          marginBottom: "1em",
          fontWeight: 500,
          border: `1.5px solid #ffe066`
        }}>
          {alertaDoChefinho}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25em" }}>
        <label>
          Nome completo:
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome completo"
            style={{
              width: "100%",
              padding: "0.5em",
              borderRadius: "0.5em",
              border: `1px solid ${corBorda}`,
              background: "#fff"
            }}
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
            style={{
              padding: "0.5em",
              borderRadius: "0.5em",
              border: `1px solid ${corBorda}`,
              background: "#fff"
            }}
            required
          />
        </label>

        <label>
          Celular:
          <div style={{ display: "flex", gap: "1em" }}>
            <input
              type="text"
              value={ddd}
              onChange={handleDDD}
              placeholder="DDD"
              maxLength={2}
              style={{
                width: "80px",
                padding: "0.5em",
                borderRadius: "0.5em",
                border: `1px solid ${corBorda}`,
                background: "#fff"
              }}
              required
              inputMode="numeric"
            />
            <input
              type="text"
              value={telefone}
              onChange={handleTelefone}
              placeholder="Número (8 ou 9 dígitos)"
              minLength={8}
              maxLength={9}
              style={{
                flex: 1,
                padding: "0.5em",
                borderRadius: "0.5em",
                border: `1px solid ${corBorda}`,
                background: "#fff"
              }}
              required
              inputMode="numeric"
            />
          </div>
        </label>

        <div>
          <p style={{ margin: "0.3em 0 0.5em 0" }}>É WhatsApp:</p>
          <label style={{ marginRight: "1.5em" }}>
            <input
              type="radio"
              name="ehWhatsapp"
              checked={ehWhatsapp === true}
              onChange={() => setEhWhatsapp(true)}
            />{" "}
            Sim
          </label>
          <label>
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
            style={{
              padding: "0.5em",
              borderRadius: "0.5em",
              border: `1px solid ${corBorda}`,
              background: "#fff"
            }}
            required
          />
          <span style={{ color: "#888", fontSize: "0.9em" }}>Formato: dd/mm/aaaa</span>
        </label>

        <label>
          Estado (UF):
          <select
            value={estadoUF}
            onChange={(e) => setEstadoUF(e.target.value)}
            style={{
              padding: "0.5em",
              borderRadius: "0.5em",
              border: `1px solid ${corBorda}`,
              background: "#fff"
            }}
            required
          >
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
            disabled={!estadoUF}
            style={{
              padding: "0.5em",
              borderRadius: "0.5em",
              border: `1px solid ${corBorda}`,
              background: "#fff"
            }}
            required
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
          <label style={{ marginRight: "1.5em" }}>
            <input type="radio" checked={meRespondo} onChange={() => setMeRespondo(true)} /> Para você
          </label>
          <label>
            <input type="radio" checked={!meRespondo} onChange={() => setMeRespondo(false)} /> Para outra pessoa
          </label>
        </div>

        {!meRespondo && (
          <div style={{
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            background: "#f4f7fb",
            padding: "1em",
            borderRadius: "0.75em"
          }}>
            <label>
              Nome do avaliado:
              <input
                value={nomeAvaliado}
                onChange={(e) => setNomeAvaliado(e.target.value)}
                placeholder="Nome completo da pessoa avaliada"
                style={{
                  width: "100%",
                  padding: "0.5em",
                  borderRadius: "0.5em",
                  border: `1px solid ${corBorda}`,
                  background: "#fff"
                }}
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
                style={{
                  padding: "0.5em",
                  borderRadius: "0.5em",
                  border: `1px solid ${corBorda}`,
                  background: "#fff"
                }}
                required
              />
            </label>

            <label>
              Relação com o avaliado:
              <input
                value={relacao}
                onChange={(e) => setRelacao(e.target.value)}
                placeholder="Ex: Mãe, professor, responsável legal..."
                style={{
                  padding: "0.5em",
                  borderRadius: "0.5em",
                  border: `1px solid ${corBorda}`,
                  background: "#fff"
                }}
                required
              />
            </label>
          </div>
        )}

        <button
          type="submit"
          style={{
            marginTop: "2em",
            padding: "0.75em 1.5em",
            backgroundColor: corPrimaria,
            color: "#fff",
            border: "none",
            borderRadius: "0.75em",
            fontWeight: 600,
            fontSize: "1.05em",
            boxShadow: "0 2px 12px #2563eb30",
            cursor: "pointer",
            letterSpacing: "0.02em"
          }}
        >
          Iniciar Teste
        </button>
      </form>
    </div>
  );
}
