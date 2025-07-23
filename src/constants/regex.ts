/**
 * @fileoverview Defines a collection of regular expressions used for parsing User Agent strings.
 * These regex patterns help in detecting operating systems, device types, and browser information.
 *
 * @module src/constants/regex
 * @version 1.0.0
 * @license CC BY-NC-ND 4.0
 *
 * @contact Mohammad Montasim -Al- Mamun Shuvo
 * @created 2025-07-23
 * @contactEmail montasimmamun@gmail.com
 * @contactGithub https://github.com/montasim
 */

/**
 * A collection of regular expressions used for detecting various device and browser details
 * from a User Agent string.
 * @readonly
 * @enum {RegExp}
 */
const USER_AGENT_REGEX = Object.freeze({
    /** Regular expression to detect Windows Phone. */
    WINDOWS_PHONE: /Windows Phone/i,
    /** Regular expression to extract a Windows Phone version. */
    WINDOWS_PHONE_VERSION: /Windows Phone ([\d.]+)/i,
    /** Regular expression to detect iPad and extract its OS version. */
    IPAD: /iPad.*OS ([\d_]+)/i,
    /** Regular expression to extract iOS version (used broadly for iOS devices). */
    IOS_VERSION: /OS ([\d_]+)/i,
    /** Regular expression to detect iPhone and extract its OS version. */
    IPHONE: /iPhone.*OS ([\d_]+)/i,
    /** Regular expression to detect Android and extract its version. */
    ANDROID: /Android ([\d.]+)/i,
    /** Regular expression to check for common mobile indicators in User Agent. */
    MOBILE_OR_MOBI: /Mobile|Mobi/i,
    /** Regular expression to check for common tablet indicators in User Agent. */
    TABLET_OR_SMT_OR_KF: /Tablet|SM-T\d+|KF[A-Z0-9]{2,}/i,
    /** Regular expression to detect Windows NT (desktop Windows) and extract its version. */
    WINDOWS_NT: /Windows NT ([\d.]+)/i,
    /** Regular expression to detect macOS and extract its version. */
    MAC_OS_X: /Macintosh.*Mac OS X ([\d_]+)/i,
    /** Regular expression to detect Linux (excluding Android). */
    LINUX: /Linux/i,
    /** Regular expression to detect Microsoft Edge browser and extract its version. */
    EDGE: /Edg(?:e|)\/([\d.]+)/i,
    /** Regular expression to detect Opera browser and extract its version. */
    OPERA: /OPR\/([\d.]+)/i,
    /** Regular expression to detect Firefox browser and extract its version. */
    FIREFOX: /Firefox\/([\d.]+)/i,
    /** Regular expression to detect Chrome or CriOS (Chrome on iOS) and extract its version. */
    CHROME_CRIOS: /(?:Chrome|CriOS)\/([\d.]+)/i,
    /** Regular expression to detect Safari browser. */
    SAFARI: /Safari\/([\d.]+)/i,
    /** Regular expression to extract a Safari browser version specifically. */
    SAFARI_VERSION: /Version\/([\d.]+).*Safari/i,
    /** Regular expression to detect Internet Explorer (both MSIE and Trident-based). */
    INTERNET_EXPLORER: /MSIE ([\d.]+)|Trident\/.+?rv:([\d.]+)/i,
    /** Regular expression to ensure the browser is not Edge or Opera (for Chrome/CriOS detection). */
    NOT_EDGE_OPERA: /Edg|OPR/i,
    /** Regular expression to ensure the OS is not iPad or iPhone (for macOS detection). */
    NOT_IPAD_IPHONE: /iPad|iPhone/i,
    /** Regular expression to ensure the OS is not Android (for generic Linux detection). */
    NOT_ANDROID: /Android/i,
    /** Regular expression to ensure the browser is not Chrome, CriOS, Edge, Opera, or Firefox (for Safari detection). */
    NOT_CHROME_CRIOS_EDGE_OPERA_FIREFOX: /Chrome|CriOS|Edg|OPR|Firefox/i,
} as const);

export default USER_AGENT_REGEX;
