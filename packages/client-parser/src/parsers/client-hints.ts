import type { ClientHintBrand, ClientHints, ClientHeaders } from '../types';
import { readHeader, unquote } from '../internal/helpers';

function parseBoolean(value?: string): boolean | undefined {
    if (!value) return undefined;
    if (/^\??1$/.test(value.trim())) return true;
    if (/^\??0$/.test(value.trim())) return false;
    return undefined;
}

function parseBrands(value?: string): ClientHintBrand[] | undefined {
    if (!value) return undefined;
    const brands = [...value.matchAll(/"([^"]+)"\s*;\s*v="([^"]+)"/g)].map(
        (match) => ({ brand: match[1]!, version: match[2]! })
    );
    return brands.length ? brands : undefined;
}

export function parseClientHintHeaders(
    headers?: ClientHeaders
): ClientHints | undefined {
    if (!headers) return undefined;

    const brands = parseBrands(readHeader(headers, 'sec-ch-ua'));
    const fullVersionList = parseBrands(
        readHeader(headers, 'sec-ch-ua-full-version-list')
    );
    const mobile = parseBoolean(readHeader(headers, 'sec-ch-ua-mobile'));
    const platform = unquote(readHeader(headers, 'sec-ch-ua-platform'));
    const platformVersion = unquote(
        readHeader(headers, 'sec-ch-ua-platform-version')
    );
    const architecture = unquote(readHeader(headers, 'sec-ch-ua-arch'));
    const bitness = unquote(readHeader(headers, 'sec-ch-ua-bitness'));
    const model = unquote(readHeader(headers, 'sec-ch-ua-model'));
    const wow64 = parseBoolean(readHeader(headers, 'sec-ch-ua-wow64'));
    const hints: ClientHints = {
        ...(brands ? { brands } : {}),
        ...(fullVersionList ? { fullVersionList } : {}),
        ...(mobile !== undefined ? { mobile } : {}),
        ...(platform ? { platform } : {}),
        ...(platformVersion ? { platformVersion } : {}),
        ...(architecture ? { architecture } : {}),
        ...(bitness ? { bitness } : {}),
        ...(model ? { model } : {}),
        ...(wow64 !== undefined ? { wow64 } : {}),
    };

    return Object.values(hints).some((value) => value !== undefined)
        ? hints
        : undefined;
}
