/**
 * @fileoverview Provides a utility function to detect detailed device information based on the User Agent string.
 * This module exports a function `getDeviceType` that analyzes the browser's User Agent
 * to determine the operating system, device type (mobile, tablet, PC), browser name, and browser version.
 *
 * @module src/index.ts
 * @version 1.0.0
 * @license CC BY-NC-ND 4.0
 *
 * @contact Mohammad Montasim -Al- Mamun Shuvo
 * @created 2025-07-23
 * @contactEmail montasimmamun@gmail.com
 * @contactGithub https://github.com/montasim
 */

import { IDeviceInfo } from './interfaces/interface';
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
    // Windows Phone (before Android and iOS)
    if (USER_AGENT_REGEX.WINDOWS_PHONE.test(userAgent)) {
        deviceInfo.type = DEVICE_TYPES.WINDOWS_PHONE;
        deviceInfo.os = OS_NAMES.WINDOWS_PHONE;
        deviceInfo.isMobile = true;
        const wpMatch = userAgent.match(USER_AGENT_REGEX.WINDOWS_PHONE_VERSION);
        if (wpMatch) {
            deviceInfo.osVersion = wpMatch[1];
        }
        return;
    }

    // iPad detection
    if (USER_AGENT_REGEX.IPAD.test(userAgent)) {
        deviceInfo.type = DEVICE_TYPES.IOS;
        deviceInfo.os = OS_NAMES.IOS;
        const versionMatch = userAgent.match(USER_AGENT_REGEX.IOS_VERSION);
        if (versionMatch) {
            deviceInfo.osVersion = versionMatch[1].replace(/_/g, '.');
        }
        deviceInfo.isMobile = true;
        deviceInfo.isTablet = true;
        return;
    }

    // iPhone
    const iPhoneMatch = userAgent.match(USER_AGENT_REGEX.IPHONE);
    if (iPhoneMatch) {
        deviceInfo.type = DEVICE_TYPES.IOS;
        deviceInfo.os = OS_NAMES.IOS;
        deviceInfo.osVersion = iPhoneMatch[1].replace(/_/g, '.');
        deviceInfo.isMobile = true;
        deviceInfo.isTablet = false;
        return;
    }

    // Android (more specific to avoid Windows Phone false positives)
    const androidMatch = userAgent.match(USER_AGENT_REGEX.ANDROID);
    if (androidMatch && !USER_AGENT_REGEX.WINDOWS_PHONE.test(userAgent)) {
        deviceInfo.type = DEVICE_TYPES.ANDROID;
        deviceInfo.os = OS_NAMES.ANDROID;
        deviceInfo.osVersion = androidMatch[1];
        deviceInfo.isMobile = true;

        if (
            !USER_AGENT_REGEX.MOBILE_OR_MOBI.test(userAgent) ||
            USER_AGENT_REGEX.TABLET_OR_SMT_OR_KF.test(userAgent)
        ) {
            deviceInfo.isTablet = true;
        }
        return;
    }

    // Windows PC
    const windowsMatch = userAgent.match(USER_AGENT_REGEX.WINDOWS_NT);
    if (windowsMatch) {
        deviceInfo.type = DEVICE_TYPES.PC;
        deviceInfo.os = OS_NAMES.WINDOWS;
        deviceInfo.osVersion = windowsMatch[1];
        return;
    }

    // macOS (only if not iPad or iPhone)
    if (
        USER_AGENT_REGEX.MAC_OS_X.test(userAgent) &&
        !USER_AGENT_REGEX.NOT_IPAD_IPHONE.test(userAgent)
    ) {
        deviceInfo.type = DEVICE_TYPES.PC;
        deviceInfo.os = OS_NAMES.MACOS;
        const macMatch = userAgent.match(USER_AGENT_REGEX.MAC_OS_X);
        if (macMatch) {
            deviceInfo.osVersion = macMatch[1].replace(/_/g, '.');
        }
        return;
    }

    // Linux
    if (
        USER_AGENT_REGEX.LINUX.test(userAgent) &&
        !USER_AGENT_REGEX.NOT_ANDROID.test(userAgent)
    ) {
        deviceInfo.type = DEVICE_TYPES.PC;
        deviceInfo.os = OS_NAMES.LINUX;
        return;
    }
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
    // Edge (Chromium)
    const edgeMatch = userAgent.match(USER_AGENT_REGEX.EDGE);
    if (edgeMatch) {
        deviceInfo.browser = BROWSER_NAMES.EDGE;
        deviceInfo.browserVersion = edgeMatch[1];
        return;
    }

    // Opera
    const operaMatch = userAgent.match(USER_AGENT_REGEX.OPERA);
    if (operaMatch) {
        deviceInfo.browser = BROWSER_NAMES.OPERA;
        deviceInfo.browserVersion = operaMatch[1];
        return;
    }

    // Firefox
    const firefoxMatch = userAgent.match(USER_AGENT_REGEX.FIREFOX);
    if (firefoxMatch) {
        deviceInfo.browser = BROWSER_NAMES.FIREFOX;
        deviceInfo.browserVersion = firefoxMatch[1];
        return;
    }

    // Chrome / CriOS (only if not Edge or Opera)
    const chromeMatch = userAgent.match(USER_AGENT_REGEX.CHROME_CRIOS);
    if (chromeMatch && !USER_AGENT_REGEX.NOT_EDGE_OPERA.test(userAgent)) {
        deviceInfo.browser = BROWSER_NAMES.CHROME;
        deviceInfo.browserVersion = chromeMatch[1];
        return;
    }

    // Safari (only if not Chrome, Edge, Opera, or Firefox)
    if (
        USER_AGENT_REGEX.SAFARI.test(userAgent) &&
        !USER_AGENT_REGEX.NOT_CHROME_CRIOS_EDGE_OPERA_FIREFOX.test(userAgent)
    ) {
        const safariMatch = userAgent.match(USER_AGENT_REGEX.SAFARI_VERSION);
        if (safariMatch) {
            deviceInfo.browser = BROWSER_NAMES.SAFARI;
            deviceInfo.browserVersion = safariMatch[1];
        }
        return;
    }

    // Internet Explorer
    const ieMatch = userAgent.match(USER_AGENT_REGEX.INTERNET_EXPLORER);
    if (ieMatch) {
        deviceInfo.browser = BROWSER_NAMES.INTERNET_EXPLORER;
        deviceInfo.browserVersion = ieMatch[1] || ieMatch[2];
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
 * The `isMobile` and `isTablet` booleans indicate the device's form factor.
 * The `browser` property will contain the browser name (e.g., 'Edge', 'Opera', 'Firefox', 'Chrome', 'Safari', 'Internet Explorer').
 * The `browserVersion` property will provide the version of the detected browser.
 */
const getDeviceType = (userAgent: string): IDeviceInfo => {
    const deviceInfo: IDeviceInfo = {
        type: 'unknown',
        isMobile: false,
        isTablet: false,
    };

    _detectOSAndDevice(userAgent, deviceInfo);
    _detectBrowser(userAgent, deviceInfo);

    return deviceInfo;
};

/**
 * Exports the `getDeviceType` function for use in CommonJS environments.
 * @type {function(): IDeviceInfo}
 */
export default getDeviceType;
