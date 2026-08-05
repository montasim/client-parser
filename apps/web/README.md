# client-parser web

The TanStack Start playground and interactive documentation site for the local [`client-parser`](../../packages/client-parser) workspace.

Use the [workspace README](../../README.md) for installation, root commands, architecture, CI, deployment, support, and security guidance.

## Work on the web app

From the repository root:

```sh
pnpm install
pnpm dev:web
```

The site runs at [http://localhost:3000](http://localhost:3000). The root command first builds the parser because this app consumes its generated package exports.

From `apps/web`, the package-level commands are:

| Command                | Purpose                                                     |
| ---------------------- | ----------------------------------------------------------- |
| `pnpm dev`             | Start Vite on port 3000 (requires an existing parser build) |
| `pnpm build`           | Create the TanStack Start production build                  |
| `pnpm preview`         | Preview the production client build                         |
| `pnpm generate-routes` | Regenerate the typed route tree                             |
| `pnpm check`           | Check formatting, lint, types, and the production build     |

The root [Netlify configuration](../../netlify.toml) contains the monorepo-aware deployment paths.
