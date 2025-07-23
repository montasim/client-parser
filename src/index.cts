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

import { IDeviceInfo } from './interfaces/interface';

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
    if (/Windows Phone/i.test(userAgent)) {
        deviceInfo.type = 'windows_phone';
        deviceInfo.os = 'Windows Phone';
        deviceInfo.isMobile = true;
        const wpMatch = userAgent.match(/Windows Phone ([\d.]+)/i);
        if (wpMatch) {
            deviceInfo.osVersion = wpMatch[1];
        }
        return;
    }

    if (/iPad.*OS ([\d_]+)/i.test(userAgent)) {
        deviceInfo.type = 'ios';
        deviceInfo.os = 'iOS';
        const versionMatch = userAgent.match(/OS ([\d_]+)/i);
        if (versionMatch) {
            deviceInfo.osVersion = versionMatch[1].replace(/_/g, '.');
        }
        deviceInfo.isMobile = true;
        deviceInfo.isTablet = true;
        return;
    }

    const iPhoneMatch = userAgent.match(/iPhone.*OS ([\d_]+)/i);
    if (iPhoneMatch) {
        deviceInfo.type = 'ios';
        deviceInfo.os = 'iOS';
        deviceInfo.osVersion = iPhoneMatch[1].replace(/_/g, '.');
        deviceInfo.isMobile = true;
        deviceInfo.isTablet = false;
        return;
    }

    const androidMatch = userAgent.match(/Android ([\d.]+)/i);
    if (androidMatch && !/Windows Phone/i.test(userAgent)) {
        deviceInfo.type = 'android';
        deviceInfo.os = 'Android';
        deviceInfo.osVersion = androidMatch[1];
        deviceInfo.isMobile = true;

        if (
            !/Mobile|Mobi/i.test(userAgent) ||
            /Tablet|SM-T\d+|KF[A-Z0-9]{2,}/i.test(userAgent)
        ) {
            deviceInfo.isTablet = true;
        }
        return;
    }

    const windowsMatch = userAgent.match(/Windows NT ([\d.]+)/i);
    if (windowsMatch) {
        deviceInfo.type = 'pc';
        deviceInfo.os = 'Windows';
        deviceInfo.osVersion = windowsMatch[1];
        return;
    }

    if (
        /Macintosh.*Mac OS X ([\d_]+)/i.test(userAgent) &&
        !/iPad|iPhone/i.test(userAgent)
    ) {
        deviceInfo.type = 'pc';
        deviceInfo.os = 'macOS';
        const macMatch = userAgent.match(/Mac OS X ([\d_]+)/i);
        if (macMatch) {
            deviceInfo.osVersion = macMatch[1].replace(/_/g, '.');
        }
        return;
    }

    if (/Linux/i.test(userAgent) && !/Android/i.test(userAgent)) {
        deviceInfo.type = 'pc';
        deviceInfo.os = 'Linux';
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
    const edgeMatch = userAgent.match(/Edg(?:e|)\/([\d.]+)/i);
    if (edgeMatch) {
        deviceInfo.browser = 'Edge';
        deviceInfo.browserVersion = edgeMatch[1];
        return;
    }

    const operaMatch = userAgent.match(/OPR\/([\d.]+)/i);
    if (operaMatch) {
        deviceInfo.browser = 'Opera';
        deviceInfo.browserVersion = operaMatch[1];
        return;
    }

    const firefoxMatch = userAgent.match(/Firefox\/([\d.]+)/i);
    if (firefoxMatch) {
        deviceInfo.browser = 'Firefox';
        deviceInfo.browserVersion = firefoxMatch[1];
        return;
    }

    const chromeMatch = userAgent.match(/(?:Chrome|CriOS)\/([\d.]+)/i);
    if (chromeMatch && !/Edg|OPR/i.test(userAgent)) {
        deviceInfo.browser = 'Chrome';
        deviceInfo.browserVersion = chromeMatch[1];
        return;
    }

    if (
        /Safari\/([\d.]+)/i.test(userAgent) &&
        !/Chrome|CriOS|Edg|OPR|Firefox/i.test(userAgent)
    ) {
        const safariMatch = userAgent.match(/Version\/([\d.]+).*Safari/i);
        if (safariMatch) {
            deviceInfo.browser = 'Safari';
            deviceInfo.browserVersion = safariMatch[1];
        }
        return;
    }

    const ieMatch = userAgent.match(/MSIE ([\d.]+)|Trident\/.+?rv:([\d.]+)/i);
    if (ieMatch) {
        deviceInfo.browser = 'Internet Explorer';
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

module.exports = getDeviceType;
