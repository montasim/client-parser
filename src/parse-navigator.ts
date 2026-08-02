import type { ClientHints, ClientInfo, NavigatorLike } from './types';
import { parseClient } from './parse-client';

const HIGH_ENTROPY_HINTS = [
    'architecture',
    'bitness',
    'fullVersionList',
    'model',
    'platformVersion',
    'wow64',
] as const;

export async function parseNavigator(
    navigatorLike: NavigatorLike
): Promise<ClientInfo> {
    const uaData = navigatorLike.userAgentData;
    const lowEntropy: ClientHints | undefined = uaData
        ? {
              ...(uaData.brands ? { brands: uaData.brands } : {}),
              ...(uaData.mobile !== undefined ? { mobile: uaData.mobile } : {}),
              ...(uaData.platform ? { platform: uaData.platform } : {}),
          }
        : undefined;

    let highEntropy: ClientHints | undefined;
    try {
        highEntropy = await uaData?.getHighEntropyValues?.(HIGH_ENTROPY_HINTS);
    } catch {
        // Client Hints may be denied by browser policy; low-entropy data remains useful.
    }

    const clientHints =
        lowEntropy || highEntropy
            ? { ...lowEntropy, ...highEntropy }
            : undefined;
    return parseClient({
        ...(navigatorLike.userAgent
            ? { userAgent: navigatorLike.userAgent }
            : {}),
        ...(navigatorLike.platform ? { platform: navigatorLike.platform } : {}),
        ...(navigatorLike.maxTouchPoints !== undefined
            ? { maxTouchPoints: navigatorLike.maxTouchPoints }
            : {}),
        ...(clientHints ? { clientHints } : {}),
    });
}
