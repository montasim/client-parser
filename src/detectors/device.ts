import type { ClientHints, DeviceInfo, DeviceType } from '../types';
import { PATTERNS } from '../internal/patterns';

const ANDROID_VENDORS: ReadonlyArray<[RegExp, string]> = [
    [/^(?:SM-|SAMSUNG|GT-)/i, 'Samsung'],
    [/^(?:Pixel|Nexus)/i, 'Google'],
    [/^(?:moto|XT\d)/i, 'Motorola'],
    [/^(?:HUAWEI|HONOR)/i, 'Huawei'],
    [/^(?:ONEPLUS|CPH|OPPO)/i, 'OnePlus/Oppo'],
    [/^(?:Mi |Redmi|M\d{4})/i, 'Xiaomi'],
];

function nameFor(type: DeviceType): string | undefined {
    const names: Partial<Record<DeviceType, string>> = {
        mobile: 'Mobile',
        tablet: 'Tablet',
        desktop: 'Desktop',
        'smart-tv': 'Smart TV',
        console: 'Game Console',
        wearable: 'Wearable',
        embedded: 'Embedded Device',
    };
    return names[type];
}

function androidModel(userAgent: string): string | undefined {
    const candidate = PATTERNS.device.androidModel.exec(userAgent)?.[1]?.trim();
    if (!candidate || /^(?:wv|mobile|tablet)$/i.test(candidate))
        return undefined;
    return candidate.replace(/^U;\s*/i, '');
}

function vendorFor(model?: string): string | undefined {
    if (!model) return undefined;
    return ANDROID_VENDORS.find(([pattern]) => pattern.test(model))?.[1];
}

export function detectDevice(
    userAgent: string,
    hints: ClientHints | undefined,
    isIPadDesktop: boolean
): DeviceInfo {
    let type: DeviceType = 'unknown';

    if (PATTERNS.device.smartTV.test(userAgent)) type = 'smart-tv';
    else if (PATTERNS.device.console.test(userAgent)) type = 'console';
    else if (PATTERNS.device.wearable.test(userAgent)) type = 'wearable';
    else if (PATTERNS.device.embedded.test(userAgent)) type = 'embedded';
    else if (isIPadDesktop || /iPad/i.test(userAgent)) type = 'tablet';
    else if (/iPhone|iPod|Windows Phone/i.test(userAgent)) type = 'mobile';
    else if (/Android/i.test(userAgent)) {
        type =
            hints?.mobile === true || PATTERNS.device.mobile.test(userAgent)
                ? 'mobile'
                : 'tablet';
    } else if (
        hints?.mobile === true ||
        PATTERNS.device.mobile.test(userAgent)
    ) {
        type = 'mobile';
    } else if (PATTERNS.device.tablet.test(userAgent)) type = 'tablet';
    else if (/Windows|Macintosh|CrOS|Linux|X11/i.test(userAgent)) {
        type = 'desktop';
    }

    const hintedModel = hints?.model?.trim() || undefined;
    const model = hintedModel ?? androidModel(userAgent);
    const appleName = /iPhone/i.test(userAgent)
        ? 'iPhone'
        : /iPad/i.test(userAgent) || isIPadDesktop
          ? 'iPad'
          : /iPod/i.test(userAgent)
            ? 'iPod touch'
            : undefined;
    const name = appleName ?? nameFor(type);
    const vendor = appleName ? 'Apple' : vendorFor(model);

    return {
        type,
        ...(name ? { name } : {}),
        ...(model ? { model } : {}),
        ...(vendor ? { vendor } : {}),
    };
}
