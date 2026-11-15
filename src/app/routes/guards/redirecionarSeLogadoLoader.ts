import { usuarioAtualQuery } from 'modules/entidades/sessao';
import { type LoaderFunction, redirect } from 'react-router';
import { queryClient } from '../../queryClient';

/** Tela de login: quem já tem sessão segue direto para o app. */
export const redirecionarSeLogadoLoader: LoaderFunction = async () => {
  const usuario = await queryClient.query({
    ...usuarioAtualQuery,
    staleTime: 'static',
  });

  if (!usuario) return null;

  return redirect(usuario.onboardingConcluidoEm ? '/dashboard' : '/onboarding');
};
