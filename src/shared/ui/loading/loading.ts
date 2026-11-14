import { create } from 'zustand';

interface ProgressOptions {
  total: number;
  /** Texto exibido no progresso. Use `\n` para quebrar linha. */
  label: string;
  /** Exibe "atual de total" junto do label. */
  exibirContagem?: boolean;
  modo?: 'circular' | 'linear';
}

export interface ProgressState extends ProgressOptions {
  atual: number;
}

interface Etapa {
  /** Texto antes de começar (ex.: "Importar extrato"). */
  pendente: string;
  /** Texto enquanto executa (ex.: "Lendo o arquivo"). */
  ativa: string;
  /** Texto depois de concluída (ex.: "Extrato importado"). */
  concluida: string;
}

export interface StepsState {
  /** Etapas com a mensagem de erro das que falharam. */
  etapas: Array<Etapa & { erro?: string }>;
  /** Índice da etapa em execução; igual ao total quando todas foram concluídas. */
  atual: number;
}

type Bloqueio =
  | { id: number; tipo: 'indeterminado'; label?: string }
  | { id: number; tipo: 'progresso'; progresso: ProgressState }
  | { id: number; tipo: 'etapas'; etapas: StepsState };

const useLoadingStore = create<{ bloqueios: Bloqueio[] }>(() => ({
  bloqueios: [],
}));

let proximoId = 0;

const abrir = (bloqueio: Bloqueio) => {
  useLoadingStore.setState((state) => ({
    bloqueios: [...state.bloqueios, bloqueio],
  }));

  return () => {
    useLoadingStore.setState((state) => ({
      bloqueios: state.bloqueios.filter((item) => item.id !== bloqueio.id),
    }));
  };
};

const substituir = (id: number, novo: (bloqueio: Bloqueio) => Bloqueio) => {
  useLoadingStore.setState((state) => ({
    bloqueios: state.bloqueios.map((bloqueio) =>
      bloqueio.id === id ? novo(bloqueio) : bloqueio,
    ),
  }));
};

/**
 * Loading que bloqueia a tela. Cada chamada abre um bloqueio próprio, então operações
 * simultâneas não liberam a tela umas das outras. Só o bloqueio mais recente é exibido.
 */
export const Loading = {
  /** Bloqueia a tela, com um texto opcional ao lado do spinner. */
  show(label?: string) {
    return { hide: abrir({ id: ++proximoId, tipo: 'indeterminado', label }) };
  },

  /** Bloqueia a tela enquanto a promise executa, liberando também em caso de erro. */
  async while<T>(promise: Promise<T>, label?: string): Promise<T> {
    const loading = Loading.show(label);

    try {
      return await promise;
    } finally {
      loading.hide();
    }
  },

  /**
   * Bloqueia a tela exibindo um progresso, que começa em 0. Use `update` a cada avanço e
   * `hide` ao terminar, de preferência em um `finally`.
   */
  progress(options: ProgressOptions) {
    const id = ++proximoId;
    const hide = abrir({
      id,
      tipo: 'progresso',
      progresso: { ...options, atual: 0 },
    });

    return {
      update({
        atual,
        label,
        total,
      }: {
        atual: number;
        label?: string;
        total?: number;
      }) {
        substituir(id, (bloqueio) =>
          bloqueio.tipo === 'progresso'
            ? {
                ...bloqueio,
                progresso: {
                  ...bloqueio.progresso,
                  atual,
                  label: label ?? bloqueio.progresso.label,
                  total: total ?? bloqueio.progresso.total,
                },
              }
            : bloqueio,
        );
      },
      hide,
    };
  },

  /**
   * Bloqueia a tela exibindo uma lista de etapas, começando pela primeira em execução. Use
   * `next` ao concluir cada etapa, `fail` quando ela falhar e `hide` ao terminar.
   */
  steps(etapas: Etapa[]) {
    const id = ++proximoId;
    const hide = abrir({ id, tipo: 'etapas', etapas: { etapas, atual: 0 } });

    const atualizar = (novo: (estado: StepsState) => StepsState) =>
      substituir(id, (bloqueio) =>
        bloqueio.tipo === 'etapas'
          ? { ...bloqueio, etapas: novo(bloqueio.etapas) }
          : bloqueio,
      );
    const proxima = (estado: StepsState) =>
      Math.min(estado.atual + 1, estado.etapas.length);

    return {
      /** Conclui a etapa atual e inicia a próxima. */
      next() {
        atualizar((estado) => ({ ...estado, atual: proxima(estado) }));
      },
      /** Conclui a etapa atual com erro, exibindo a mensagem no lugar do texto dela, e inicia a próxima. */
      fail(mensagem: string) {
        atualizar((estado) => ({
          etapas: estado.etapas.map((etapa, indice) =>
            indice === estado.atual ? { ...etapa, erro: mensagem } : etapa,
          ),
          atual: proxima(estado),
        }));
      },
      hide,
    };
  },
};

/** Bloqueio mais recente, ou null quando a tela está liberada. */
export const useLoading = () =>
  useLoadingStore((state) => state.bloqueios.at(-1) ?? null);
