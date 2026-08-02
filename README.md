# client-parser

[![npm version](https://img.shields.io/npm/v/client-parser.svg)](https://www.npmjs.com/package/client-parser)
[![CI](https://github.com/montasim/client-parser/actions/workflows/ci.yml/badge.svg)](https://github.com/montasim/client-parser/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/client-parser.svg)](./LICENSE)

A tiny, type-safe client classifier with User-Agent, Client Hints, and HTTP header support.

- Zero runtime dependencies
- Works in browsers, Node.js, edge runtimes, ESM, and CommonJS
- Detects browser, OS, device category, rendering engine, and common bots
- Uses structured Client Hints when available and User-Agent fallback everywhere else
- Reports evidence sources and confidence instead of pretending heuristics are certain

> Client classification is appropriate for analytics, diagnostics, and presentation hints. Do not use it for authentication, authorization, or feature support checks. Prefer feature detection when behavior depends on a browser capability.

## Installation

```sh
npm install client-parser
```

## Quick start

```ts
import { parseClient } from 'client-parser';

const client = parseClient(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.54 Mobile/15E148 Safari/604.1'
);

console.log(client.device.type); // "mobile"
console.log(client.browser.name); // "Chrome"
console.log(client.os.name); // "iOS"
console.log(client.engine.name); // "WebKit"
console.log(client.isMobile); // true
```

The default export is also `parseClient`:

```js
import parseClient from 'client-parser';
```

CommonJS is supported:

```js
const { parseClient } = require('client-parser');
```

## Server-side header parsing

Pass a plain header object or any object with a `Headers`-compatible `get()` method. Header names are case-insensitive.

```ts
import { parseClient } from 'client-parser';

const client = parseClient({
    headers: request.headers,
});
```

The parser understands these User-Agent Client Hint headers:

- `Sec-CH-UA`
- `Sec-CH-UA-Full-Version-List`
- `Sec-CH-UA-Mobile`
- `Sec-CH-UA-Platform`
- `Sec-CH-UA-Platform-Version`
- `Sec-CH-UA-Arch`
- `Sec-CH-UA-Bitness`
- `Sec-CH-UA-Model`
- `Sec-CH-UA-WoW64`

High-entropy hints are only sent when the browser and server policy allow them. A server can request them with `Accept-CH`:

```http
Accept-CH: Sec-CH-UA-Full-Version-List, Sec-CH-UA-Platform-Version, Sec-CH-UA-Arch, Sec-CH-UA-Bitness, Sec-CH-UA-Model
```

## Browser Client Hints

`parseNavigator` collects available high-entropy hints and gracefully falls back when the API is unavailable or permission is denied.

```ts
import { parseNavigator } from 'client-parser';

const client = await parseNavigator(navigator);
```

For framework-independent code, pass evidence directly:

```ts
const client = parseClient({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints,
    clientHints: {
        brands: [{ brand: 'Google Chrome', version: '126' }],
        mobile: false,
        platform: 'Windows',
    },
});
```

`platform` and `maxTouchPoints` allow the parser to recognize iPadOS browsers using desktop mode.

## Result

```ts
interface ClientInfo {
    userAgent?: string;
    device: {
        type:
            | 'mobile'
            | 'tablet'
            | 'desktop'
            | 'smart-tv'
            | 'console'
            | 'wearable'
            | 'embedded'
            | 'unknown';
        name?: string;
        vendor?: string;
        model?: string;
    };
    browser: {
        name: string;
        version?: string;
        major?: string;
    };
    os: {
        name: string;
        version?: string;
        architecture?: string;
    };
    engine: {
        name: string;
        version?: string;
    };
    bot: {
        isBot: boolean;
        name?: string;
        category?:
            | 'crawler'
            | 'preview'
            | 'automation'
            | 'monitoring'
            | 'unknown';
    };
    isMobile: boolean;
    isTablet: boolean;
    source: Array<'user-agent' | 'client-hints' | 'headers' | 'platform'>;
    confidence: 'high' | 'medium' | 'low';
}
```

Unavailable details are omitted. Categorical fields use `"unknown"` only when no useful classification can be made.

## API

### `parseClient(input?)`

Synchronously classifies a User-Agent string or a `ClientEvidence` object.

### `parseNavigator(navigatorLike)`

Asynchronously collects Client Hints from a browser navigator and classifies the result.

### `parseClientHintHeaders(headers)`

Parses `Sec-CH-UA-*` headers into the normalized `ClientHints` shape.

### `getDeviceType(input?)`

Deprecated compatibility alias for `parseClient`. New code should use `parseClient`.

All public interfaces and string unions are exported as TypeScript types.

## Accuracy and privacy

User-Agent strings can be reduced, spoofed, or ambiguous. Client Hints are more structured but are not supported by every browser, and high-entropy values may be withheld. The `source` and `confidence` fields help applications account for those limitations.

The package performs no network requests, stores no data, and has no runtime dependencies. User-Agent input is capped at 8 KiB before parsing to limit resource abuse.

## Migration from 0.0.x

- Replace `getDeviceType()` with `parseClient()`; the old name remains temporarily available.
- Device types now describe form factor (`mobile`, `tablet`, `desktop`, and so on), rather than operating-system family.
- Use `result.bot.isBot` instead of `result.isBot`.
- Placeholder fields such as `model: "unknown"` are now omitted.
- `isMobile` and `isTablet` are now implemented.
- Import public types directly, for example `import type { ClientInfo } from 'client-parser'`.

## Development

```sh
npm ci
npm run check
```

`npm run check` runs strict type checking, linting, formatting checks, tests, builds both module formats, validates package metadata, and smoke-tests the published entry points.

## License

[MIT](./LICENSE) © Mohammad Montasim-Al-Mamun Shuvo
