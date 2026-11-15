import { ApiError, httpClient } from 'shared/lib/httpClient';
import type { ApiSuccessResponse } from 'shared/types/api';
import type { Usuario } from '../types/usuario';

type RespostaUsuario = ApiSuccessResponse<{ usuario: Usuario }>;

async function loginComGoogle(token: string): Promise<Usuario> {
  const { data } = await httpClient.post<RespostaUsuario>('/v1/auth/google', {
    token,
  });
  return data.data.usuario;
}

async function buscarUsuarioAtual(): Promise<Usuario | null> {
  try {
    const { data } = await httpClient.get<RespostaUsuario>('/v1/auth/me');
    return data.data.usuario;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    throw error;
  }
}

async function logout(): Promise<void> {
  await httpClient.post('/v1/auth/logout');
}

export const SessaoApi = {
  loginComGoogle,
  buscarUsuarioAtual,
  logout,
};
