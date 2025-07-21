export interface IDeviceInfo {
    /** The general category of the device: "android", "ios", "windows_phone", "pc", or "unknown". */
    type: 'android' | 'ios' | 'windows_phone' | 'pc' | 'unknown';
    /** The operating system name (e.g., "Android", "iOS", "Windows", "macOS", "Linux"). */
    os?: string;
    /** The version of the operating system. */
    osVersion?: string;
    /** True if the device is likely a tablet, false otherwise. */
    isTablet?: boolean;
    /** True if the device is a mobile phone or tablet, false otherwise. */
    isMobile?: boolean;
    /** The name of the browser (e.g., "Chrome", "Safari", "Firefox", "Edge", "IE", "Opera"). */
    browser?: string;
    /** The version of the browser. */
    browserVersion?: string;
}
