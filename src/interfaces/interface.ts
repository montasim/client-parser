/**
 * @fileoverview Defines the interface for device information.
 * This file specifies the structure of the `IDeviceInfo` object,
 * which is used to store detailed information about the detected device,
 * including its operating system, device type, and browser details.
 *
 * @module interfaces/interfaces.ts
 * @version 1.0.0
 * @license CC BY-NC-ND 4.0
 *
 * @contact Mohammad Montasim -Al- Mamun Shuvo
 * @created 2025-07-23
 * @contactEmail montasimmamun@gmail.com
 * @contactGithub https://github.com/montasim
 */

import { DEVICE_TYPES, OS_NAMES } from '../constants/names';

export interface IDeviceInfo {
    /**
     * The general type of the device.
     * Can be 'android', 'ios', 'windows_phone', 'pc', or 'unknown'.
     */
    type: (typeof DEVICE_TYPES)[keyof typeof DEVICE_TYPES];
    /**
     * The name of the operating system (e.g., 'Android', 'iOS', 'Windows', 'macOS', 'Linux', 'Windows Phone').
     */
    os?: (typeof OS_NAMES)[keyof typeof OS_NAMES];
    /**
     * The version of the operating system (e.g., '10.0', '14.5.1').
     */
    osVersion?: string;
    /**
     * Indicates whether the device is a tablet.
     */
    isTablet?: boolean;
    /**
     * Indicates whether the device is a mobile phone (including tablets for broader mobile classification).
     */
    isMobile?: boolean;
    /**
     * The name of the browser (e.g., 'Chrome', 'Firefox', 'Safari', 'Edge', 'Opera', 'Internet Explorer').
     */
    browser?: string;
    /**
     * The version of the browser (e.g., '91.0.4472.124').
     */
    browserVersion?: string;
}
