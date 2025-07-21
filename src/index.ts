/**
 * @file index.ts
 * @description Provides a utility function to detect detailed device information based on the User Agent string.
 */

import { IDeviceInfo } from './interface';

/**
 * Detects the operating system and device type (mobile, tablet, PC) based on the User Agent string.
 * This is a helper function for `getDeviceType`.
 *
 * @param {string} userAgent The browser's User Agent string.
 * @param {IDeviceInfo} deviceInfo The object to populate with detected OS and device type information.
 * @private
 */
const _detectOSAndDevice = (
    userAgent: string,
    deviceInfo: IDeviceInfo
): void => {
    // Detect Android
    const androidMatch = userAgent.match(/Android ([\d.]+)/i);
    if (androidMatch) {
        deviceInfo.type = 'android';
        deviceInfo.os = 'Android';
        deviceInfo.osVersion = androidMatch[1];
        deviceInfo.isMobile = true;
        // Heuristic for Android tablet: "Android" without "Mobile" in UA, or specific tablet UAs
        if (!/Mobile|Mobi/i.test(userAgent) || /Tablet/i.test(userAgent)) {
            deviceInfo.isTablet = true;
        }
        return; // OS detected, no need to check further for primary type
    }

    // Detect iOS (iPhone, iPad, iPod)
    const iOSMatch = userAgent.match(/iPhone OS ([\d_]+)|iPad OS ([\d_]+)/i);
    if (iOSMatch) {
        deviceInfo.type = 'ios';
        deviceInfo.os = 'iOS';
        // Normalize version string (e.g., 17_0_3 to 17.0.3)
        deviceInfo.osVersion = (iOSMatch[1] || iOSMatch[2]).replace(/_/g, '.');
        deviceInfo.isMobile = true;
        if (/iPad/i.test(userAgent)) {
            deviceInfo.isTablet = true;
        }
        return; // OS detected
    }

    // Detect Windows Phone
    if (/Windows Phone/i.test(userAgent)) {
        deviceInfo.type = 'windows_phone';
        deviceInfo.os = 'Windows Phone';
        deviceInfo.isMobile = true;
        // Windows Phone versions are less consistently in UA, often just the OS name
        const wpMatch = userAgent.match(/Windows Phone ([\d.]+)/i);
        if (wpMatch) {
            deviceInfo.osVersion = wpMatch[1];
        }
        return; // OS detected
    }

    // Detect PC (Windows, Mac, Linux) - This is a bit more of a catch-all if it's not a known mobile OS
    const windowsMatch = userAgent.match(/Windows NT ([\d.]+)/i);
    if (windowsMatch) {
        deviceInfo.type = 'pc';
        deviceInfo.os = 'Windows';
        deviceInfo.osVersion = windowsMatch[1];
    } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
        deviceInfo.type = 'pc';
        deviceInfo.os = 'macOS';
        const macMatch = userAgent.match(/Mac OS X ([\d_.]+)/i);
        if (macMatch) {
            deviceInfo.osVersion = macMatch[1].replace(/_/g, '.');
        }
    } else if (/Linux/i.test(userAgent)) {
        deviceInfo.type = 'pc';
        deviceInfo.os = 'Linux';
        // Linux versions are highly varied and not reliably in UA, so no version extraction here.
    }
};

/**
 * Detects the browser name and version based on the User Agent string.
 * This is a helper function for `getDeviceType`.
 *
 * @param {string} userAgent The browser's User Agent string.
 * @param {IDeviceInfo} deviceInfo The object to populate with detected browser information.
 * @private
 */
const _detectBrowser = (userAgent: string, deviceInfo: IDeviceInfo): void => {
    // Order matters for browser detection, from most specific to least specific
    // Chrome (and Edge Chromium, Opera Chromium)
    const chromeMatch = userAgent.match(/(Chrome|CriOS|Edg|OPR)\/([\d.]+)/i);
    if (chromeMatch) {
        deviceInfo.browser = chromeMatch[1]
            .replace('CriOS', 'Chrome')
            .replace('Edg', 'Edge')
            .replace('OPR', 'Opera');
        deviceInfo.browserVersion = chromeMatch[2];
        return; // Browser detected
    }

    // Firefox
    const firefoxMatch = userAgent.match(/Firefox\/([\d.]+)/i);
    if (firefoxMatch) {
        deviceInfo.browser = 'Firefox';
        deviceInfo.browserVersion = firefoxMatch[1];
        return; // Browser detected
    }

    // Safari (and Mobile Safari)
    // Check for Safari only if not already detected by a more specific browser (like Chrome/Firefox/Edge/Opera)
    if (/Safari\/([\d.]+)/i.test(userAgent)) {
        const safariMatch = userAgent.match(/Version\/([\d.]+).*Safari/i);
        if (safariMatch) {
            deviceInfo.browser = 'Safari';
            deviceInfo.browserVersion = safariMatch[1];
        }
        return; // Browser detected
    }

    // Internet Explorer (older versions and Trident-based)
    if (/MSIE ([\d.]+)|Trident\/.+?rv:([\d.]+)/i.test(userAgent)) {
        const ieMatch = userAgent.match(
            /MSIE ([\d.]+)|Trident\/.+?rv:([\d.]+)/i
        );
        deviceInfo.browser = 'Internet Explorer';
        deviceInfo.browserVersion = ieMatch
            ? ieMatch[1] || ieMatch[2]
            : 'unknown';
        return; // Browser detected
    }
};

/**
 * Detects detailed information about the device based on the browser's User Agent string.
 * This function provides more granular details including OS, OS version, browser,
 * browser version, and flags for mobile/tablet.
 *
 * @returns {IDeviceInfo} An object containing detailed device information.
 */
export const getDeviceType = (): IDeviceInfo => {
    // Access the User Agent string from the navigator object
    const userAgent = navigator.userAgent;
    const deviceInfo: IDeviceInfo = {
        type: 'unknown',
        isMobile: false,
        isTablet: false,
    };

    // First, detect the operating system and general device type
    _detectOSAndDevice(userAgent, deviceInfo);

    // Then, detect the browser
    _detectBrowser(userAgent, deviceInfo);

    return deviceInfo;
};
