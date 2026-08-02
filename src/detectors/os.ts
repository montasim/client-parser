import type { ClientHints, OperatingSystemInfo } from '../types';
import { firstMatch, normalizeVersion } from '../internal/helpers';
import { PATTERNS } from '../internal/patterns';

function withDetails(
    name: string,
    version?: string,
    architecture?: string
): OperatingSystemInfo {
    const normalizedVersion = normalizeVersion(version);
    return {
        name,
        ...(normalizedVersion ? { version: normalizedVersion } : {}),
        ...(architecture ? { architecture } : {}),
    };
}

function windowsName(platformVersion?: string): string {
    const major = Number(platformVersion?.split('.')[0]);
    return major >= 13 ? 'Windows 11' : 'Windows';
}

export function detectOSFromHints(
    hints?: ClientHints
): OperatingSystemInfo | undefined {
    if (!hints?.platform) return undefined;
    const platform = hints.platform;
    const architecture = [hints.architecture, hints.bitness]
        .filter(Boolean)
        .join(' ');
    if (/windows/i.test(platform)) {
        return withDetails(
            windowsName(hints.platformVersion),
            hints.platformVersion,
            architecture
        );
    }
    if (/macOS/i.test(platform)) {
        return withDetails('macOS', hints.platformVersion, architecture);
    }
    if (/android/i.test(platform)) {
        return withDetails('Android', hints.platformVersion, architecture);
    }
    if (/chrome os/i.test(platform)) {
        return withDetails('ChromeOS', hints.platformVersion, architecture);
    }
    if (/linux/i.test(platform)) {
        return withDetails('Linux', hints.platformVersion, architecture);
    }
    if (/iOS/i.test(platform)) {
        return withDetails('iOS', hints.platformVersion, architecture);
    }
    return withDetails(platform, hints.platformVersion, architecture);
}

export function detectOS(
    userAgent: string,
    platform?: string,
    isIPadDesktop = false
): OperatingSystemInfo {
    if (isIPadDesktop) return withDetails('iPadOS');

    const rules: ReadonlyArray<[RegExp, string]> = [
        [PATTERNS.os.windowsPhone, 'Windows Phone'],
        [PATTERNS.os.android, 'Android'],
        [PATTERNS.os.chromeOS, 'ChromeOS'],
        [PATTERNS.os.windows, 'Windows'],
        [PATTERNS.os.macOS, 'macOS'],
        [PATTERNS.os.kaiOS, 'KaiOS'],
    ];

    if (PATTERNS.os.iosDevice.test(userAgent)) {
        return withDetails(
            'iOS',
            firstMatch(userAgent, PATTERNS.os.iosVersion)
        );
    }

    for (const [pattern, name] of rules) {
        const match = pattern.exec(userAgent);
        if (match) return withDetails(name, match[1]);
    }

    if (PATTERNS.os.linux.test(userAgent)) return withDetails('Linux');
    if (platform && /linux/i.test(platform)) return withDetails('Linux');
    if (platform && /win/i.test(platform)) return withDetails('Windows');
    if (platform && /mac/i.test(platform)) return withDetails('macOS');
    return withDetails('unknown');
}
