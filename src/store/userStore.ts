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

type EstadoGlobal = {
  respondente: {
    nome: string;
    email: string;
    cidade: string;
    nascimento: string;
    paraOutraPessoa: boolean;
  };
  avaliado?: Avaliado;
  respostas: Resposta[];
  setRespondente: (data: EstadoGlobal["respondente"]) => void;
  setAvaliado: (data: Avaliado) => void;
  adicionarResposta: (resposta: Resposta) => void;
  resetarTudo: () => void;
};

export const useUserStore = create<EstadoGlobal>((set) => ({
  respondente: {
    nome: "",
    email: "",
    cidade: "",
    nascimento: "",
    paraOutraPessoa: false,
  },
  avaliado: undefined,
  respostas: [],
  setRespondente: (data) => set({ respondente: data }),
  setAvaliado: (data) => set({ avaliado: data }),
  adicionarResposta: (resposta) =>
    set((state) => ({ respostas: [...state.respostas, resposta] })),
  resetarTudo: () =>
    set({
      respondente: {
        nome: "",
        email: "",
        cidade: "",
        nascimento: "",
        paraOutraPessoa: false,
      },
      avaliado: undefined,
      respostas: [],
    }),
}));
