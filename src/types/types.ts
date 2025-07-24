import { DEVICE_TYPES, OS_NAMES, BROWSER_NAMES } from '../constants/names';

/**
 * Interface for the 'device' property within IDeviceInfo.
 */
export interface IDeviceDetails {
    type: (typeof DEVICE_TYPES)[keyof typeof DEVICE_TYPES];
    name: string; // e.g., 'unknown', 'iPhone', 'Galaxy S21'
    model: string; // e.g., 'unknown', 'iPhone13,4'
    manufacturer?: string; // e.g., 'unknown', 'Apple', 'Samsung'
}

/**
 * Interface for the 'engine' property within IDeviceInfo.
 */
export interface IEngineInfo {
    name: string; // e.g., 'unknown', 'WebKit', 'Gecko', 'Blink'
    version: string; // e.g., 'unknown', '537.36', '91.0'
}

/**
 * Interface for the 'os' property within IDeviceInfo.
 */
export interface IOSInfo {
    name: (typeof OS_NAMES)[keyof typeof OS_NAMES] | string; // e.g., 'Windows', 'iOS', 'Android'. Using string for 'unknown' or unlisted OS.
    version?: string; // e.g., '10.0', '14.5.1'
    architecture?: string; // e.g., 'x64', 'ARM'
}

/**
 * Interface for the 'browser' property within IDeviceInfo.
 */
export interface IBrowserInfo {
    name: (typeof BROWSER_NAMES)[keyof typeof BROWSER_NAMES] | string; // e.g., 'Chrome', 'Firefox', 'Safari'. Using string for 'unknown' or unlisted browser.
    version: string; // e.g., '126.0.0.0', '91.0.4472.124'
}

/**
 * Main interface for detailed device information.
 */
export interface IDeviceInfo {
    /**
     * The raw User Agent string.
     */
    userAgentString: string;
    /**
     * Detailed information about the device itself.
     */
    device: IDeviceDetails;
    /**
     * Information about the rendering engine.
     */
    engine: IEngineInfo;
    /**
     * Information about the operating system.
     */
    os: IOSInfo;
    /**
     * Information about the browser.
     */
    browser: IBrowserInfo;
    /**
     * The platform detected (e.g., 'Win32', 'MacIntel', 'Linux x86_64').
     */
    platform: string;
    /**
     * Indicates if the user agent is a bot.
     */
    isBot: boolean;
}
