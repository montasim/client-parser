import type {
    ClientEvidence,
    ClientHints,
    ClientInfo,
    Confidence,
    DetectionSource,
} from './types';
import { detectBot } from './detectors/bot';
import { detectBrowser, detectBrowserFromHints } from './detectors/browser';
import { detectDevice } from './detectors/device';
import { detectEngine } from './detectors/engine';
import { detectOS, detectOSFromHints } from './detectors/os';
import { addSource, normalizeUserAgent, readHeader } from './internal/helpers';
import { parseClientHintHeaders } from './parsers/client-hints';

function mergeHints(
    headerHints?: ClientHints,
    explicitHints?: ClientHints
): ClientHints | undefined {
    if (!headerHints && !explicitHints) return undefined;
    const merged = { ...headerHints, ...explicitHints };
    return Object.keys(merged).length > 0 ? merged : undefined;
}

function confidenceFor(
    sources: DetectionSource[],
    knownParts: number
): Confidence {
    if (sources.includes('client-hints') && knownParts >= 2) return 'high';
    if (knownParts >= 2) return 'medium';
    return 'low';
}

export function parseClient(input: string | ClientEvidence = ''): ClientInfo {
    const evidence: ClientEvidence =
        typeof input === 'string' ? { userAgent: input } : input;
    const sources: DetectionSource[] = [];
    const headerUserAgent = readHeader(evidence.headers, 'user-agent');
    const userAgent = normalizeUserAgent(evidence.userAgent ?? headerUserAgent);
    const headerHints = parseClientHintHeaders(evidence.headers);
    const hints = mergeHints(headerHints, evidence.clientHints);

    if (userAgent) addSource(sources, 'user-agent');
    if (headerUserAgent || headerHints) addSource(sources, 'headers');
    if (hints) addSource(sources, 'client-hints');
    if (evidence.platform || evidence.maxTouchPoints !== undefined) {
        addSource(sources, 'platform');
    }

    const ua = userAgent ?? '';
    const isIPadDesktop =
        /MacIntel/i.test(evidence.platform ?? '') &&
        (evidence.maxTouchPoints ?? 0) > 1;
    const browser = detectBrowserFromHints(hints) ?? detectBrowser(ua);
    const os =
        detectOSFromHints(hints) ??
        detectOS(ua, evidence.platform, isIPadDesktop);
    const device = detectDevice(ua, hints, isIPadDesktop);
    const engine = detectEngine(ua, browser, os);
    const bot = detectBot(ua);
    const knownParts = [browser.name, os.name, device.type].filter(
        (value) => value !== 'unknown'
    ).length;

    return {
        ...(userAgent ? { userAgent } : {}),
        device,
        browser,
        os,
        engine,
        bot,
        isMobile: device.type === 'mobile',
        isTablet: device.type === 'tablet',
        source: sources,
        confidence: confidenceFor(sources, knownParts),
    };
}

/** @deprecated Use parseClient. */
export const getDeviceType = parseClient;
