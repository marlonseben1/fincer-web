import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SessaoApi } from '../api/sessao.api';
import type { Usuario } from '../types/usuario';
import { sessaoKeys } from './sessao.queries';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<Usuario, Error, string>({
    mutationFn: SessaoApi.loginComGoogle,
    onSuccess: (usuario) => {
      queryClient.setQueryData(sessaoKeys.usuarioAtual, usuario);
    },
  });
}
