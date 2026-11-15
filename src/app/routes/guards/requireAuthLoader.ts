import { usuarioAtualQuery } from 'modules/entidades/sessao';
import { type LoaderFunction, redirect } from 'react-router';
import { queryClient } from '../../queryClient';

/** Rotas privadas: exige sessão e onboarding concluído. */
export const requireAuthLoader: LoaderFunction = async () => {
  const usuario = await queryClient.query({
    ...usuarioAtualQuery,
    staleTime: 'static',
  });

  if (!usuario) return redirect('/');
  if (!usuario.onboardingConcluidoEm) return redirect('/onboarding');

  return null;
};
