import type { BrowserInfo, EngineInfo, OperatingSystemInfo } from '../types';
import { firstMatch } from '../internal/helpers';
import { PATTERNS } from '../internal/patterns';

export function detectEngine(
    userAgent: string,
    browser: BrowserInfo,
    os: OperatingSystemInfo
): EngineInfo {
    const webkitVersion = firstMatch(userAgent, PATTERNS.browser.webkit);
    const prestoVersion = firstMatch(userAgent, PATTERNS.browser.presto);
    if (prestoVersion) return { name: 'Presto', version: prestoVersion };
    if (
        os.name === 'iOS' ||
        os.name === 'iPadOS' ||
        browser.name === 'Safari'
    ) {
        return {
            name: 'WebKit',
            ...(webkitVersion ? { version: webkitVersion } : {}),
        };
    }
    if (
        ['Chrome', 'Chromium', 'Edge', 'Opera', 'Samsung Internet'].includes(
            browser.name
        )
    ) {
        return { name: 'Blink' };
    }
    if (browser.name === 'Firefox') {
        const version = firstMatch(userAgent, PATTERNS.browser.gecko);
        return {
            name: 'Gecko',
            ...(version ? { version } : {}),
        };
    }
    if (browser.name === 'Internet Explorer') {
        const version = firstMatch(userAgent, PATTERNS.browser.trident);
        return {
            name: 'Trident',
            ...(version ? { version } : {}),
        };
    }
    if (webkitVersion) return { name: 'WebKit', version: webkitVersion };
    return { name: 'unknown' };
}
