# fincer-web

Front do Fincer, sistema de finanças pessoais.
Vite + React + TypeScript, MUI, React Query, Zustand, Axios, React Router, Biome, pnpm.

## Rodando localmente

Com a [fincer-api](https://github.com/marlonseben1/fincer-api) rodando em `localhost:3004`:

```bash
pnpm install
cp .env.example .env
pnpm dev   # http://localhost:5173
```

Em dev, o Vite faz proxy de `/v1` para a API, então front e API ficam na mesma origem
e o cookie de sessão funciona sem configurar CORS.

## Scripts

| Script | O que faz |
|---|---|
| `pnpm dev` | servidor de desenvolvimento |
| `pnpm build` | typecheck + build de produção |
| `pnpm typecheck` | checagem de tipos |
| `pnpm check` | lint + formatação com correção (Biome) |
| `pnpm ci` | lint + formatação sem correção (usado no CI) |
