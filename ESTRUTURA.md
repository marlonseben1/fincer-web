# Estrutura do projeto

Organização por **domínio**.

```
src/
  app/          bootstrap: App, rotas, tema, queryClient, providers
  containers/   telas: montam as peças dos módulos
  modules/      tudo de um domínio: api, queries, store, regras, pecas
    entidades/  dados base que os fluxos consomem (ex.: sessao, contas, categorias)
    fluxos/     processos do negócio (ex.: lancamentos, orcamentos)
  shared/       genérico, não conhece nenhum domínio
    ui/         componentes por capacidade (ui/loading)
    lib/        httpClient, env, sonner
    utils/      funções genéricas
    types/      tipos globais (resposta da API, React Query)
```

## Regra principal: os imports só descem

```
app/ → containers/ → modules/fluxos/ → modules/entidades/ → shared/
```

`shared/` nunca importa de `modules/`, `containers/` ou `app/`. Uma entidade nunca importa um fluxo.
Se um domínio é consumido por vários fluxos e não depende de nenhum, é entidade.

## Módulo

```
modules/<entidades|fluxos>/<dominio>/
  api/  queries/  store/  regras/  pecas/   (só o que o módulo usa)
  index.ts                                   API pública
```

## Onde coloco meu código?

| É… | Vai para |
|---|---|
| Tela, rota ou layout de página; estado só da tela | `containers/` |
| Endpoint, query, store, regra, componente de um domínio | `modules/<nivel>/<dominio>/` |
| Genérico usado por **dois ou mais** módulos | `shared/` |
| Algo que conhece vários módulos (carga pós-login, reset de stores) | `app/` |
| Na dúvida | No módulo que usa. Só sobe para `shared/` quando um segundo precisar |

## Imports

- Entre módulos e pastas do `shared/`, só pelo `index.ts` (`modules/entidades/sessao`, `shared/ui/loading`).
- Dentro do módulo, imports relativos; nunca importe o `index.ts` do próprio módulo.
- Caminho a partir de `src/`, sem o prefixo `src/`. Aliases: `app/*`, `containers/*`, `modules/*`, `shared/*`.
- Em `modules/` e `shared/{ui,lib,utils}`: só named exports, sem `export default`, re-exports explícitos.

## Como é garantido

- `pnpm check` / `pnpm run ci`: `noRestrictedImports` e `noDefaultExport` no `biome.json` barram deep import,
  import na direção errada e default export.
- `pnpm lint:ciclos`: acusa ciclos de import.
- Ao criar um nível novo em `shared/`, atualize o `biome.json` e este arquivo.
