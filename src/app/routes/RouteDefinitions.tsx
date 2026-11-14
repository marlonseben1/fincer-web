import { Erro404 } from 'containers/Erro404/Erro404';
import { Inicio } from 'containers/Inicio/Inicio';
import type { RouteObject } from 'react-router';

export const routeDefinitions = [
  { index: true, Component: Inicio },
  { path: '*', Component: Erro404 },
] as const satisfies RouteObject[];
