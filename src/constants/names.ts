/**
 * Defines standardized string values for different device types.
 * These values are used to categorize devices detected via the User Agent string.
 * @readonly
 * @enum {string}
 */
export const DEVICE_TYPES = Object.freeze({
    /** Represents an unknown or uncategorized device type. */
    UNKNOWN: 'unknown',
    /** Represents a Windows Phone device. */
    WINDOWS_PHONE: 'windows_phone',
    /** Represents an iOS device (iPhone, iPad, iPod Touch). */
    IOS: 'ios',
    /** Represents an Android device. */
    ANDROID: 'android',
    /** Represents a personal computer (desktop or laptop). */
    PC: 'pc',
} as const);

/**
 * Defines standardized string values for common operating system names.
 * These values are used to identify the OS detected via the User Agent string.
 * @readonly
 * @enum {string}
 */
export const OS_NAMES = Object.freeze({
    /** Represents an unknown or uncategorized operating system. */
    UNKNOWN: 'unknown',
    /** Represents the Windows Phone operating system. */
    WINDOWS_PHONE: 'Windows Phone',
    /** Represents the iOS operating system. */
    IOS: 'iOS',
    /** Represents the Android operating system. */
    ANDROID: 'Android',
    /** Represents the Windows desktop operating system. */
    WINDOWS: 'Windows',
    /** Represents the macOS operating system. */
    MACOS: 'macOS',
    /** Represents the Linux operating system. */
    LINUX: 'Linux',
} as const);

/**
 * Defines standardized string values for common browser names.
 * These values are used to identify the browser detected via the User Agent string.
 * @readonly
 * @enum {string}
 */
export const BROWSER_NAMES = Object.freeze({
    /** Represents an unknown or uncategorized browser. */
    UNKNOWN: 'unknown',
    /** Represents the Microsoft Edge browser. */
    EDGE: 'Edge',
    /** Represents the Opera browser. */
    OPERA: 'Opera',
    /** Represents the Mozilla Firefox browser. */
    FIREFOX: 'Firefox',
    /** Represents the Google Chrome browser. */
    CHROME: 'Chrome',
    /** Represents the Apple Safari browser. */
    SAFARI: 'Safari',
    /** Represents the Internet Explorer browser. */
    INTERNET_EXPLORER: 'Internet Explorer',
} as const);
