import { usuarioAtualQuery } from 'modules/entidades/sessao';
import { type LoaderFunction, redirect } from 'react-router';
import { queryClient } from '../../queryClient';

/** Onboarding: exige sessão e só abre enquanto ele estiver pendente. */
export const requireOnboardingPendenteLoader: LoaderFunction = async () => {
  const usuario = await queryClient.query({
    ...usuarioAtualQuery,
    staleTime: 'static',
  });

  if (!usuario) return redirect('/');
  if (usuario.onboardingConcluidoEm) return redirect('/dashboard');

  return null;
};
