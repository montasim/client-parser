import type { BrowserInfo, ClientHints } from '../types';
import { browserInfo, firstMatch, usefulBrands } from '../internal/helpers';
import { PATTERNS } from '../internal/patterns';

const BRAND_NAMES: ReadonlyArray<[RegExp, string]> = [
    [/Microsoft Edge/i, 'Edge'],
    [/Opera/i, 'Opera'],
    [/Brave/i, 'Brave'],
    [/Vivaldi/i, 'Vivaldi'],
    [/Samsung Internet/i, 'Samsung Internet'],
    [/Google Chrome/i, 'Chrome'],
    [/Chromium/i, 'Chromium'],
];

export function detectBrowserFromHints(
    hints?: ClientHints
): BrowserInfo | undefined {
    const brands = usefulBrands(hints?.fullVersionList ?? hints?.brands);
    for (const [pattern, name] of BRAND_NAMES) {
        const match = brands.find(({ brand }) => pattern.test(brand));
        if (match) return browserInfo(name, match.version);
    }
    return undefined;
}

export function detectBrowser(userAgent: string): BrowserInfo {
    const rules: ReadonlyArray<[RegExp, string]> = [
        [PATTERNS.browser.edge, 'Edge'],
        [PATTERNS.browser.operaMini, 'Opera Mini'],
        [PATTERNS.browser.opera, 'Opera'],
        [PATTERNS.browser.samsung, 'Samsung Internet'],
        [PATTERNS.browser.firefoxIOS, 'Firefox'],
        [PATTERNS.browser.firefox, 'Firefox'],
        [PATTERNS.browser.electron, 'Electron'],
        [PATTERNS.browser.instagram, 'Instagram'],
        [PATTERNS.browser.facebook, 'Facebook'],
        [PATTERNS.browser.chrome, 'Chrome'],
        [PATTERNS.browser.safari, 'Safari'],
        [PATTERNS.browser.ie, 'Internet Explorer'],
        [PATTERNS.browser.postman, 'Postman'],
        [PATTERNS.browser.curl, 'curl'],
        [PATTERNS.browser.wget, 'Wget'],
    ];

    for (const [pattern, name] of rules) {
        const version = firstMatch(userAgent, pattern);
        if (version) return browserInfo(name, version);
    }

    const legacyOpera = firstMatch(userAgent, PATTERNS.browser.operaLegacy);
    if (legacyOpera) {
        return browserInfo(
            'Opera',
            firstMatch(userAgent, PATTERNS.browser.operaVersion) ?? legacyOpera
        );
    }

    return browserInfo('unknown');
}
