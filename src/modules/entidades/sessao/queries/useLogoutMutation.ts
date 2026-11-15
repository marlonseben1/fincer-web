import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notificacao } from 'shared/lib/sonner';
import { SessaoApi } from '../api/sessao.api';
import { sessaoKeys } from './sessao.queries';

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SessaoApi.logout,
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(sessaoKeys.usuarioAtual, null);
    },
    onError: () => Notificacao.erro({ titulo: 'Não foi possível sair' }),
  });
}
