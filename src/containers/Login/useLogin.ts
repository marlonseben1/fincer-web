import { useLoginMutation } from 'modules/entidades/sessao';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function useLogin() {
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();
  const [erroGoogle, setErroGoogle] = useState<string>();

  function handleGoogleSuccess({ credential }: { credential?: string }) {
    if (!credential) return;
    setErroGoogle(undefined);

    loginMutation.mutate(credential, {
      onSuccess: () => navigate('/dashboard', { replace: true }),
    });
  }

  function handleGoogleError() {
    setErroGoogle('Não foi possível entrar com o Google. Tente novamente.');
  }

  const erro = loginMutation.isError ? loginMutation.error.message : erroGoogle;

  return { erro, handleGoogleSuccess, handleGoogleError };
}
