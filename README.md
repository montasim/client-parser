# client-parser

[![npm version](https://img.shields.io/npm/v/client-parser.svg)](https://www.npmjs.com/package/client-parser)
[![CI](https://github.com/montasim/client-parser/actions/workflows/ci.yml/badge.svg)](https://github.com/montasim/client-parser/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Support on SupportKori](https://img.shields.io/badge/Support-SupportKori-FFDD00)](https://www.supportkori.com/montasim)

A pnpm monorepo for the zero-dependency `client-parser` TypeScript library and its interactive TanStack Start playground and documentation site. Keeping both projects together lets the web app exercise the local package on every build, so library and documentation changes can ship from one repository.

**[Try the live playground](https://client-parser-demo.netlify.app) · [Read the interactive docs](https://client-parser-demo.netlify.app/docs) · [Install from npm](https://www.npmjs.com/package/client-parser)**

## What is included

| Workspace | Purpose | Documentation |
| --- | --- | --- |
| `packages/client-parser` | Published ESM/CommonJS TypeScript package for browser, OS, device, engine, and bot classification | [Package README](packages/client-parser/README.md) |
| `apps/web` | React 19 and TanStack Start playground and documentation site | [Web README](apps/web/README.md) |

The web workspace depends on `client-parser` through pnpm's `workspace:*` protocol. Local builds therefore use the package in this repository rather than a separately installed npm release.

## Quick start

Prerequisites:

- Node.js 22 (selected by `.node-version`; Node.js 20.19 or newer also works)
- pnpm 10.14.0

```sh
git clone https://github.com/montasim/client-parser.git
cd client-parser
pnpm install
pnpm dev
```

The root development command builds `client-parser` and starts the web app at [http://localhost:3000](http://localhost:3000). No environment variables or external services are required.

## Use the package

Consumers can install the published package independently:

```sh
pnpm add client-parser
```

```ts
import { parseClient } from 'client-parser'

const result = parseClient(navigator.userAgent)

console.log(result.browser.name)
console.log(result.os.name)
console.log(result.device.type)
console.log(result.confidence)
```

See the [package API documentation](packages/client-parser/README.md#api) for Client Hints, HTTP headers, navigator parsing, result types, and migration notes.

## Workspace commands

Run these commands from the repository root:

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Build the parser and start the web app on port 3000 |
| `pnpm build` | Build the parser followed by the web app |
| `pnpm build:parser` | Build ESM, CommonJS, declarations, and source maps |
| `pnpm build:web` | Build the parser and production web app |
| `pnpm test` | Run the parser's Vitest suite |
| `pnpm test:coverage` | Run parser tests with coverage |
| `pnpm check:parser` | Run the parser's complete package validation |
| `pnpm check:web` | Build the parser, then check and build the web app |
| `pnpm check` | Run all parser and web verification |
| `pnpm format` | Format every workspace that defines a formatter |

## Repository layout

```text
.
├── apps/
│   └── web/                 # TanStack Start site
├── packages/
│   └── client-parser/       # Published npm package, tests, and package docs
├── prototypes/              # Archived interface prototype
├── .github/workflows/       # Workspace CI and package publishing
├── netlify.toml             # Monorepo-aware web deployment
└── pnpm-workspace.yaml      # Workspace package discovery
```

The dependency direction is intentionally one-way: `apps/web` consumes `packages/client-parser`; the library does not depend on the application.

## Quality and release workflow

CI installs the frozen pnpm lockfile and runs `pnpm check`, covering parser types, lint, formatting, tests, package validation, and builds as well as the web app's formatting, linting, types, and production build.

Package releases use tags in the form `client-parser-vX.Y.Z`. The publish workflow verifies the tag against `packages/client-parser/package.json` before publishing that workspace to npm with provenance. The package remains pre-1.0; review its [changelog](packages/client-parser/CHANGELOG.md) and [release status](packages/client-parser/README.md#release-status) before upgrading.

## Deployment

The root [Netlify configuration](netlify.toml) runs `pnpm build:web` and publishes `apps/web/dist/client`. TanStack Start SSR and server functions are handled by the official Netlify Vite integration. Local Netlify development runs on port 8888 and targets the Vite server on port 3000.

## Accuracy, privacy, and security

Client classification is heuristic. Use it for analytics, diagnostics, and presentation hints—not authentication, authorization, or capability checks. Prefer feature detection when application behavior depends on browser support.

Parsing is local and does not itself make network requests or store client data. Applications integrating the package remain responsible for their own disclosure, consent, retention, and security practices. Report vulnerabilities privately using the [package security policy](packages/client-parser/SECURITY.md).

## Contributing and support

Issues and focused pull requests are welcome in the [GitHub repository](https://github.com/montasim/client-parser). Changes to parser classifications should include fixtures or tests and pass `pnpm check`. The repository does not currently include separate contribution or code-of-conduct documents; this section is the available contribution guidance.

Optional support through [SupportKori](https://www.supportkori.com/montasim) helps fund compatibility research and ongoing maintenance.

## Author and license

Created and maintained by [Mohammad Montasim-Al-Mamun Shuvo](https://github.com/montasim). Licensed under the [MIT License](LICENSE).
