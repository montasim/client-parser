import type {
    BrowserInfo,
    ClientHintBrand,
    ClientHeaders,
    DetectionSource,
    HeaderAccessor,
    HeaderRecord,
} from '../types';
import { MAX_USER_AGENT_LENGTH } from './patterns';

export function normalizeUserAgent(value: unknown): string | undefined {
    if (typeof value !== 'string') return undefined;
    const normalized = value.trim();
    if (!normalized) return undefined;
    return normalized.slice(0, MAX_USER_AGENT_LENGTH);
}

export function normalizeVersion(value?: string): string | undefined {
    const version = value?.replace(/_/g, '.').trim();
    return version || undefined;
}

export function browserInfo(name: string, version?: string): BrowserInfo {
    const normalizedVersion = normalizeVersion(version);
    return {
        name,
        ...(normalizedVersion ? { version: normalizedVersion } : {}),
        ...(normalizedVersion
            ? { major: normalizedVersion.split('.')[0] }
            : {}),
    };
}

export function firstMatch(input: string, pattern: RegExp): string | undefined {
    const match = pattern.exec(input);
    return match?.[1] || match?.[2];
}

export function readHeader(
    headers: ClientHeaders | undefined,
    name: string
): string | undefined {
    if (!headers) return undefined;
    const accessor = headers as HeaderAccessor;
    if (typeof accessor.get === 'function') {
        return (
            accessor.get(name) ?? accessor.get(name.toLowerCase()) ?? undefined
        );
    }

    const wanted = name.toLowerCase();
    const record = headers as HeaderRecord;
    const entry = Object.entries(record).find(
        ([key]) => key.toLowerCase() === wanted
    )?.[1];
    return Array.isArray(entry) ? entry.join(', ') : entry;
}

export function addSource(
    sources: DetectionSource[],
    source: DetectionSource
): void {
    if (!sources.includes(source)) sources.push(source);
}

export function usefulBrands(
    brands: readonly ClientHintBrand[] = []
): ClientHintBrand[] {
    return brands.filter(
        ({ brand }) => !/not[\s_-]*a[\s_-]*brand/i.test(brand)
    );
}

export function unquote(value?: string): string | undefined {
    return value?.trim().replace(/^"|"$/g, '') || undefined;
}
