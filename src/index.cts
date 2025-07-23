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
 * This private helper function modifies the `deviceInfo` object in place, populating it with
 * the detected OS, OS version, device type ('windows_phone', 'ios', 'android', 'pc'), and
 * boolean flags for `isMobile` and `isTablet`.
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
 * This private helper function modifies the `deviceInfo` object in place,
 * populating it with the detected `browser` name and `browserVersion`.
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
 * This function retrieves the User Agent from `navigator.userAgent` and then
 * calls private helper functions to parse the OS, device type, browser name, and version.
 *
 * @returns {IDeviceInfo} An object containing detailed device information.
 * - `type`: {@link IDeviceInfo['type']} The general type of device ('unknown', 'windows_phone', 'ios', 'android', 'pc').
 * - `isMobile`: {@link IDeviceInfo['isMobile']} A boolean indicating if the device is a mobile phone.
 * - `isTablet`: {@link IDeviceInfo['isTablet']} A boolean indicating if the device is a tablet.
 * - `os`: {@link IDeviceInfo['os']} The operating system name (e.g., 'Windows Phone', 'iOS', 'Android', 'Windows', 'macOS', 'Linux').
 * - `osVersion`: {@link IDeviceInfo['osVersion']} The version of the operating system (if detectable).
 * - `browser`: {@link IDeviceInfo['browser']} The name of the browser (e.g., 'Edge', 'Opera', 'Firefox', 'Chrome', 'Safari', 'Internet Explorer').
 * - `browserVersion`: {@link IDeviceInfo['browserVersion']} The version of the browser (if detectable).
 */
const getDeviceType = (): IDeviceInfo => {
    const userAgent = navigator.userAgent;

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
module.exports = getDeviceType;
