import { useQuery } from '@tanstack/react-query';
import { usuarioAtualQuery } from './sessao.queries';

export function useUsuarioAtualQuery() {
  return useQuery(usuarioAtualQuery);
}
