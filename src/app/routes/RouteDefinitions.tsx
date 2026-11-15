import { Dashboard } from 'containers/Dashboard/Dashboard';
import { Erro404 } from 'containers/Erro404/Erro404';
import { Login } from 'containers/Login/Login';
import { Onboarding } from 'containers/Onboarding/Onboarding';
import type { RouteObject } from 'react-router';
import { redirecionarSeLogadoLoader } from './guards/redirecionarSeLogadoLoader';
import { requireAuthLoader } from './guards/requireAuthLoader';
import { requireOnboardingPendenteLoader } from './guards/requireOnboardingPendenteLoader';

const privateRoutes = [
  {
    loader: requireAuthLoader,
    children: [{ path: 'dashboard', Component: Dashboard }],
  },
] as const satisfies RouteObject[];

export const routeDefinitions = [
  { index: true, loader: redirecionarSeLogadoLoader, Component: Login },
  {
    path: 'onboarding',
    loader: requireOnboardingPendenteLoader,
    Component: Onboarding,
  },
  ...privateRoutes,
  { path: '*', Component: Erro404 },
] as const satisfies RouteObject[];
