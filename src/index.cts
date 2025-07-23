/**
 * @fileoverview Provides a utility function to detect detailed device information based on the User Agent string.
 * This module exports a function `getDeviceType` that analyzes the browser's User Agent
 * to determine the operating system, device type (mobile, tablet, PC), browser name, and browser version.
 * It's designed for CommonJS environments.
 *
 * @module src/index.cjs.ts
 * @version 1.0.0
 * @license CC BY-NC-ND 4.0
 *
 * @contact Mohammad Montasim -Al- Mamun Shuvo
 * @created 2025-07-23
 * @contactEmail montasimmamun@gmail.com
 * @contactGithub https://github.com/montasim
 */

import type { IDeviceInfo } from './interfaces/interface';
import USER_AGENT_REGEX from './constants/regex';
import { DEVICE_TYPES, OS_NAMES, BROWSER_NAMES } from './constants/names';

/**
 * Detects the operating system and device type (mobile, tablet, PC) based on the User Agent string.
 * This private helper function modifies the `deviceInfo` object in place.
 *
 * @private
 * @param {string} userAgent The browser's User Agent string.
 * @param {IDeviceInfo} deviceInfo The object to populate with detected OS and device type information.
 * @returns {void}
 */
const _detectOSAndDevice = (
    userAgent: string,
    deviceInfo: IDeviceInfo
): void => {
    // Order matters: More specific detections first.

    // 1. Windows Phone
    if (USER_AGENT_REGEX.WINDOWS_PHONE.test(userAgent)) {
        deviceInfo.device.type = DEVICE_TYPES.WINDOWS_PHONE;
        deviceInfo.os.name = OS_NAMES.WINDOWS_PHONE;
        const wpMatch = userAgent.match(USER_AGENT_REGEX.WINDOWS_PHONE); // Use the regex that captures a version
        if (wpMatch && wpMatch[1]) {
            deviceInfo.os.version = wpMatch[1];
        }
        deviceInfo.device.name = 'Windows Phone';
        return; // Important: return after detection
    }

    // 2. iOS Devices (iPad, iPhone, iPod)
    // iPad detection should come before general iPhone/iPod if you want to distinguish tablets
    if (USER_AGENT_REGEX.IPAD.test(userAgent)) {
        deviceInfo.device.type = DEVICE_TYPES.IOS; // You might want DEVICE_TYPES.IOS_TABLET if distinct
        deviceInfo.os.name = OS_NAMES.IOS;
        const versionMatch = userAgent.match(USER_AGENT_REGEX.IOS_VERSION);
        if (versionMatch && versionMatch[1]) {
            deviceInfo.os.version = versionMatch[1].replace(/_/g, '.');
        }
        deviceInfo.device.name = 'iPad';
        return;
    }

    const iPhoneMatch = userAgent.match(USER_AGENT_REGEX.IPHONE);
    if (iPhoneMatch) {
        deviceInfo.device.type = DEVICE_TYPES.IOS; // Mobile
        deviceInfo.os.name = OS_NAMES.IOS;
        const versionMatch = userAgent.match(USER_AGENT_REGEX.IOS_VERSION);
        if (versionMatch && versionMatch[1]) {
            deviceInfo.os.version = versionMatch[1].replace(/_/g, '.');
        }
        deviceInfo.device.name = 'iPhone';
        return;
    }

    const iPodMatch = userAgent.match(USER_AGENT_REGEX.IPOD);
    if (iPodMatch) {
        deviceInfo.device.type = DEVICE_TYPES.IOS; // Mobile
        deviceInfo.os.name = OS_NAMES.IOS;
        const versionMatch = userAgent.match(USER_AGENT_REGEX.IOS_VERSION);
        if (versionMatch && versionMatch[1]) {
            deviceInfo.os.version = versionMatch[1].replace(/_/g, '.');
        }
        deviceInfo.device.name = 'iPod Touch';
        return;
    }

    // 3. Android
    const androidMatch = userAgent.match(USER_AGENT_REGEX.ANDROID);
    // Ensure it's not a Windows Phone UA that might contain "Android" for some reason
    if (androidMatch) {
        // Removed !USER_AGENT_REGEX.WINDOWS_PHONE.test(userAgent) as it's already returned above
        deviceInfo.os.name = OS_NAMES.ANDROID;
        deviceInfo.os.version = androidMatch[1];

        // Differentiate Android Phone vs. Tablet
        if (USER_AGENT_REGEX.MOBILE_INDICATOR.test(userAgent)) {
            deviceInfo.device.type = DEVICE_TYPES.ANDROID; // Phone
            deviceInfo.device.name = 'Android Phone';
        } else if (USER_AGENT_REGEX.TABLET_INDICATOR.test(userAgent)) {
            deviceInfo.device.type = DEVICE_TYPES.ANDROID; // Tablet
            deviceInfo.device.name = 'Android Tablet';
        } else {
            // Default to mobile if no strong tablet indicator and not a known mobile indicator
            // This is a heuristic, Android UAs can be ambiguous
            deviceInfo.device.type = DEVICE_TYPES.ANDROID;
            deviceInfo.device.name = 'Android Device';
        }
        return;
    }

    // 4. Desktop OSes (Windows, macOS, Linux) - Checked after mobile OSes
    const windowsMatch = userAgent.match(USER_AGENT_REGEX.WINDOWS_NT);
    if (windowsMatch) {
        deviceInfo.device.type = DEVICE_TYPES.PC;
        deviceInfo.os.name = OS_NAMES.WINDOWS;
        deviceInfo.os.version = windowsMatch[1];
        deviceInfo.device.name = 'Windows PC';
        return;
    }

    // macOS
    // This comes after iOS devices, so if it's an iPad/iPhone, it would have returned already.
    if (USER_AGENT_REGEX.MAC_OS_X.test(userAgent)) {
        deviceInfo.device.type = DEVICE_TYPES.PC;
        deviceInfo.os.name = OS_NAMES.MACOS;
        const macMatch = userAgent.match(USER_AGENT_REGEX.MAC_OS_X);
        if (macMatch && macMatch[1]) {
            deviceInfo.os.version = macMatch[1].replace(/_/g, '.');
        }
        deviceInfo.device.name = 'macOS PC';
        return;
    }

    // Linux (checked after Android to ensure it's not an Android device)
    // The previous Android check handles Android, so this will only catch non-Android Linux.
    if (USER_AGENT_REGEX.LINUX.test(userAgent)) {
        deviceInfo.device.type = DEVICE_TYPES.PC;
        deviceInfo.os.name = OS_NAMES.LINUX;
        deviceInfo.device.name = 'Linux PC';
        return;
    }
    // If no specific OS matched, it remains 'unknown'
};

/**
 * Detects the browser name and version based on the User Agent string.
 * This private helper function modifies the `deviceInfo` object in place.
 *
 * @private
 * @param {string} userAgent The browser's User Agent string.
 * @param {IDeviceInfo} deviceInfo The object to populate with detected browser information.
 * @returns {void}
 */
const _detectBrowser = (userAgent: string, deviceInfo: IDeviceInfo): void => {
    // Order matters: More specific/overlapping browsers first.

    // 1. Microsoft Edge (Chromium-based)
    const edgeMatch = userAgent.match(USER_AGENT_REGEX.EDGE);
    if (edgeMatch) {
        deviceInfo.browser.name = BROWSER_NAMES.EDGE;
        deviceInfo.browser.version = edgeMatch[1];
        // Edge uses Blink engine (Chromium)
        const webkitMatch = userAgent.match(USER_AGENT_REGEX.WEBKIT_ENGINE);
        if (webkitMatch && webkitMatch[1]) {
            deviceInfo.engine.name = 'Blink'; // Chromium-based browsers identify as AppleWebKit
            deviceInfo.engine.version = webkitMatch[1];
        }
        return;
    }

    // 2. Opera (Chromium-based)
    const operaMatch = userAgent.match(USER_AGENT_REGEX.OPERA);
    if (operaMatch) {
        deviceInfo.browser.name = BROWSER_NAMES.OPERA;
        deviceInfo.browser.version = operaMatch[1];
        // Opera uses Blink engine (Chromium)
        const webkitMatch = userAgent.match(USER_AGENT_REGEX.WEBKIT_ENGINE);
        if (webkitMatch && webkitMatch[1]) {
            deviceInfo.engine.name = 'Blink';
            deviceInfo.engine.version = webkitMatch[1];
        }
        // Check for old Presto engine if needed (very rare now)
        const prestoMatch = userAgent.match(USER_AGENT_REGEX.PRESTO_ENGINE);
        if (prestoMatch && prestoMatch[1]) {
            deviceInfo.engine.name = 'Presto';
            deviceInfo.engine.version = prestoMatch[1];
        }
        return;
    }

    // 3. Firefox
    const firefoxMatch = userAgent.match(USER_AGENT_REGEX.FIREFOX);
    if (firefoxMatch) {
        deviceInfo.browser.name = BROWSER_NAMES.FIREFOX;
        deviceInfo.browser.version = firefoxMatch[1];
        // Firefox uses Gecko engine
        const geckoMatch = userAgent.match(USER_AGENT_REGEX.GECKO_ENGINE);
        if (geckoMatch && geckoMatch[1]) {
            deviceInfo.engine.name = 'Gecko';
            deviceInfo.engine.version = geckoMatch[1];
        }
        return;
    }

    // 4. Chrome / CriOS (Should come after Edge and Opera as they are also Chromium-based)
    const chromeMatch = userAgent.match(USER_AGENT_REGEX.CHROME_CRIOS);
    if (chromeMatch) {
        // Removed negative checks like NOT_EDGE_OPERA, as order handles it
        deviceInfo.browser.name = BROWSER_NAMES.CHROME;
        deviceInfo.browser.version = chromeMatch[1];
        // Chrome uses Blink engine
        const webkitMatch = userAgent.match(USER_AGENT_REGEX.WEBKIT_ENGINE);
        if (webkitMatch && webkitMatch[1]) {
            deviceInfo.engine.name = 'Blink';
            deviceInfo.engine.version = webkitMatch[1];
        }
        return;
    }

    // 5. Safari (Must come after all Chromium browsers, as they all contain "Safari")
    // To ensure it's actual Safari, check for "Version/X.Y.Z Safari/A.B.C" pattern.
    const safariVersionMatch = userAgent.match(USER_AGENT_REGEX.SAFARI_VERSION);
    if (safariVersionMatch) {
        deviceInfo.browser.name = BROWSER_NAMES.SAFARI;
        deviceInfo.browser.version = safariVersionMatch[1];
        // Safari uses WebKit engine
        const webkitMatch = userAgent.match(USER_AGENT_REGEX.WEBKIT_ENGINE);
        if (webkitMatch && webkitMatch[1]) {
            deviceInfo.engine.name = 'WebKit';
            deviceInfo.engine.version = webkitMatch[1];
        }
        return;
    }

    // 6. Internet Explorer
    const ieMatch = userAgent.match(USER_AGENT_REGEX.INTERNET_EXPLORER);
    if (ieMatch) {
        deviceInfo.browser.name = BROWSER_NAMES.INTERNET_EXPLORER;
        deviceInfo.browser.version = ieMatch[1] || ieMatch[2]; // IE10- vs IE11+
        // IE uses Trident engine
        const tridentMatch = userAgent.match(USER_AGENT_REGEX.TRIDENT_ENGINE);
        if (tridentMatch && tridentMatch[1]) {
            deviceInfo.engine.name = 'Trident';
            deviceInfo.engine.version = tridentMatch[1];
        }
        return;
    }
};

/**
 * Detects detailed information about the device based on the browser's User Agent string.
 * This function uses private helper functions `_detectOSAndDevice` and `_detectBrowser`
 * to populate an `IDeviceInfo` object.
 *
 * @returns {IDeviceInfo} An object containing detailed device information,
 * including operating system, device type (mobile, tablet, PC), browser name, and browser version.
 * The `type` property can be 'unknown', 'windows_phone', 'ios', 'android', 'pc'.
 * The `os` property will indicate the operating system (e.g., 'Windows Phone', 'iOS', 'Android', 'Windows', 'macOS', 'Linux').
 * The `osVersion` property will provide the version of the operating system if detectable.
 * The `browser` property will contain the browser name (e.g., 'Edge', 'Opera', 'Firefox', 'Chrome', 'Safari', 'Internet Explorer').
 * The `browserVersion` property will provide the version of the detected browser.
 */
const getDeviceType = (
    userAgent: string,
    platform: string = ''
): IDeviceInfo => {
    // Initialize deviceInfo with default 'unknown' values
    const deviceInfo: IDeviceInfo = {
        userAgentString: userAgent,
        device: {
            type: DEVICE_TYPES.UNKNOWN,
            name: 'unknown',
            model: 'unknown',
            manufacturer: 'unknown',
        },
        engine: {
            name: 'unknown',
            version: 'unknown',
        },
        os: {
            name: OS_NAMES.UNKNOWN,
            version: undefined, // undefined initially, will be populated if detected
            architecture: undefined, // undefined initially, will be populated if detected
        },
        browser: {
            name: BROWSER_NAMES.UNKNOWN,
            version: 'unknown',
        },
        platform: platform, // Can be passed as an argument if available (e.g., navigator.platform)
        isBot: false, // Requires separate bot detection logic
    };

    _detectOSAndDevice(userAgent, deviceInfo);
    _detectBrowser(userAgent, deviceInfo);

    return deviceInfo;
};

/**
 * Exports the `getDeviceType` function for use in CommonJS environments.
 * @type {function(): IDeviceInfo}
 */
module.exports = getDeviceType;
