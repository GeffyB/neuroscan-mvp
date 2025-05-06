// =============================
// 🎯 Armazena dados da sessão
// =============================

import { create } from "zustand";

type Avaliado = {
  nome: string;
  idade: number;
  relacao: string;
};

type Resposta = {
  perguntaId: string;
  valor: number;
};

type Pergunta = {
  id: string;
  texto: string;
  categoria: string;
  condicoes: string[];
  faixa_etaria: string[];
  peso: number;
  tempo_limite: number;
  tipo: string;
  respostas: { texto: string; valor: number }[];
};

type EstadoGlobal = {
  respondente: {
    nome: string;
    email: string;
    celular: string;
    ehWhatsapp: boolean;
    cidade: string;
    nascimento: string;
    paraOutraPessoa: boolean;
  };
  avaliado?: Avaliado;
  respostas: Resposta[];
  perguntasSorteadas: Pergunta[];
  setRespondente: (data: EstadoGlobal["respondente"]) => void;
  setAvaliado: (data: Avaliado) => void;
  adicionarResposta: (resposta: Resposta) => void;
  setPerguntasSorteadas: (perguntas: Pergunta[]) => void;
  resetarTudo: () => void;
};

export const useUserStore = create<EstadoGlobal>((set) => ({
  respondente: {
    nome: "",
    email: "",
    celular: "",
    ehWhatsapp: false,
    cidade: "",
    nascimento: "",
    paraOutraPessoa: false,
  },
  avaliado: undefined,
  respostas: [],
  perguntasSorteadas: [],
  setRespondente: (data) => set({ respondente: data }),
  setAvaliado: (data) => set({ avaliado: data }),
  adicionarResposta: (resposta) =>
    set((state) => ({ respostas: [...state.respostas, resposta] })),
  setPerguntasSorteadas: (perguntas) => set({ perguntasSorteadas: perguntas }),
  resetarTudo: () =>
    set({
      respondente: {
        nome: "",
        email: "",
        celular: "",
        ehWhatsapp: false,
        cidade: "",
        nascimento: "",
        paraOutraPessoa: false,
      },
      avaliado: undefined,
      respostas: [],
      perguntasSorteadas: [],
    }),
}));
