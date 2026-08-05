export { parseClient, getDeviceType } from './parse-client';
export { parseNavigator } from './parse-navigator';
export { parseClientHintHeaders } from './parsers/client-hints';
export { DEVICE_TYPES, DETECTION_SOURCES } from './types';
export type {
    BotCategory,
    BotInfo,
    BrowserInfo,
    ClientEvidence,
    ClientHeaders,
    ClientHintBrand,
    ClientHints,
    ClientInfo,
    Confidence,
    DetectionSource,
    DeviceInfo,
    DeviceType,
    EngineInfo,
    HeaderAccessor,
    HeaderRecord,
    HeaderValue,
    IDeviceInfo,
    NavigatorLike,
    NavigatorUADataLike,
    OperatingSystemInfo,
} from './types';

export { parseClient as default } from './parse-client';
