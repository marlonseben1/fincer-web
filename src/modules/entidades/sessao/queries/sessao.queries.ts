import { queryOptions } from '@tanstack/react-query';
import { SessaoApi } from '../api/sessao.api';

export const sessaoKeys = {
  usuarioAtual: ['sessao', 'usuario-atual'] as const,
};

export const usuarioAtualQuery = queryOptions({
  queryKey: sessaoKeys.usuarioAtual,
  queryFn: SessaoApi.buscarUsuarioAtual,
  staleTime: Number.POSITIVE_INFINITY,
});
