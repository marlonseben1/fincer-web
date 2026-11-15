export interface Usuario {
  id: string;
  nome: string;
  email: string;
  /** ISO 8601; null enquanto o onboarding não foi concluído. */
  onboardingConcluidoEm: string | null;
}
