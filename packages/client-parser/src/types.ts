export const DEVICE_TYPES = [
    'mobile',
    'tablet',
    'desktop',
    'smart-tv',
    'console',
    'wearable',
    'embedded',
    'unknown',
] as const;

export type DeviceType = (typeof DEVICE_TYPES)[number];

export const DETECTION_SOURCES = [
    'user-agent',
    'client-hints',
    'headers',
    'platform',
] as const;

export type DetectionSource = (typeof DETECTION_SOURCES)[number];
export type Confidence = 'high' | 'medium' | 'low';

export interface DeviceInfo {
    type: DeviceType;
    name?: string;
    vendor?: string;
    model?: string;
}

export interface BrowserInfo {
    name: string;
    version?: string;
    major?: string;
}

export interface OperatingSystemInfo {
    name: string;
    version?: string;
    architecture?: string;
}

export interface EngineInfo {
    name: string;
    version?: string;
}

export type BotCategory =
    'crawler' | 'preview' | 'automation' | 'monitoring' | 'unknown';

export interface BotInfo {
    isBot: boolean;
    name?: string;
    category?: BotCategory;
}

export interface ClientInfo {
    userAgent?: string;
    device: DeviceInfo;
    browser: BrowserInfo;
    os: OperatingSystemInfo;
    engine: EngineInfo;
    bot: BotInfo;
    isMobile: boolean;
    isTablet: boolean;
    source: DetectionSource[];
    confidence: Confidence;
}

export interface ClientHints {
    brands?: readonly ClientHintBrand[];
    fullVersionList?: readonly ClientHintBrand[];
    mobile?: boolean;
    platform?: string;
    platformVersion?: string;
    architecture?: string;
    bitness?: string;
    model?: string;
    wow64?: boolean;
}

export interface ClientHintBrand {
    brand: string;
    version: string;
}

export type HeaderValue = string | string[] | undefined;

export interface HeaderRecord {
    [name: string]: HeaderValue;
}

export interface HeaderAccessor {
    get(name: string): string | null;
}

export type ClientHeaders = HeaderRecord | HeaderAccessor;

export interface ClientEvidence {
    userAgent?: string;
    platform?: string;
    maxTouchPoints?: number;
    headers?: ClientHeaders;
    clientHints?: ClientHints;
}

export interface NavigatorUADataLike {
    brands?: readonly ClientHintBrand[];
    mobile?: boolean;
    platform?: string;
    getHighEntropyValues?(hints: readonly string[]): Promise<ClientHints>;
}

export interface NavigatorLike {
    userAgent?: string;
    platform?: string;
    maxTouchPoints?: number;
    userAgentData?: NavigatorUADataLike;
}

/** @deprecated Use ClientInfo. */
export type IDeviceInfo = ClientInfo;
