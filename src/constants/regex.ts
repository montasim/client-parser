/**
 * A collection of regular expressions used for detecting various device and browser details
 * from a User Agent string.
 * @readonly
 * @enum {RegExp}
 */
const USER_AGENT_REGEX = Object.freeze({
    // --- OS and Device Detection ---

    /** Regular expression to detect Windows Phone and extract its OS version. */
    WINDOWS_PHONE: /Windows Phone (?:OS )?([\d.]+)/i, // Handles "Windows Phone" and "Windows Phone OS 7.0"

    /** Regular expression to detect iPad and extract its OS version. */
    // Modern iPads on iPadOS often report as "MacIntel" and "Mac OS X" in UA string,
    // so it's crucial to detect "iPad" first.
    IPAD: /iPad.*(?:OS|CPU) ([\d_.]+)/i, // Covers "iPad; CPU OS 13_5_1" or "iPad; OS 14_0"

    /** Regular expression to detect iPhone and extract its OS version. */
    IPHONE: /iPhone.*(?:OS|CPU) ([\d_.]+)/i, // Covers "iPhone; CPU OS 13_5_1" or "iPhone; OS 14_0"

    /** Regular expression to detect iPod and extract its OS version (often similar to iPhone). */
    IPOD: /iPod.*(?:OS|CPU) ([\d_.]+)/i, // Added for completeness if you want to differentiate iPods

    /** Regular expression to extract iOS version (common pattern for all iOS devices). */
    IOS_VERSION: /(?:iPhone|iPad|iPod).*OS ([\d_]+)/i, // More robust for any iOS device

    /** Regular expression to detect Android and extract its version. */
    ANDROID: /Android ([\d.]+)/i,

    /** Regular expression to detect if the device is specifically a mobile device. */
    // Used to differentiate between Android phone and tablet if 'Android' alone isn't enough.
    // 'Mobi' is a strong indicator for phones.
    MOBILE_INDICATOR: /Mobi/i,

    /** Regular expression to detect common tablet indicators beyond just 'Android'.
     * This helps distinguish tablets when 'Mobi' is absent. */
    TABLET_INDICATOR: /Tablet|iPad|SM-T\d+|KF[A-Z0-9]{2,}|Nexus 7|Nexus 10/i, // Added more common tablet UAs

    /** Regular expression to detect Windows NT (desktop Windows) and extract its version. */
    // Version mapping: 5.1 -> XP, 6.0 -> Vista, 6.1 -> 7, 6.2 -> 8, 6.3 -> 8.1, 10.0 -> 10/11
    WINDOWS_NT: /Windows NT ([\d.]+)/i,

    /** Regular expression to detect macOS and extract its version. */
    // macOS versions are typically X_Y or X_Y_Z.
    MAC_OS_X: /Macintosh; Intel Mac OS X ([\d_.]+)/i,

    /** Regular expression to detect Linux (excluding Android due to order of operations). */
    LINUX: /Linux/i,

    // --- Browser Detection ---

    /** Regular expression to detect Microsoft Edge (Chromium-based) and extract its version. */
    // "Edg/" for Chromium Edge, "Edge/" for legacy EdgeHTML. Prioritize "Edg".
    EDGE: /Edg[eA]?\/([\d.]+)/i, // "Edg", "Edge", "EdgA" (Android)

    /** Regular expression to detect Opera browser and extract its version. */
    // OPR for Opera Touch/Mini, Opera for desktop. OPR is usually more modern.
    OPERA: /(?:Opera|OPR)\/([\d.]+)/i,

    /** Regular expression to detect Firefox browser and extract its version. */
    FIREFOX: /Firefox\/([\d.]+)/i,

    /** Regular expression to detect Chrome (desktop) or CriOS (Chrome on iOS) and extract its version. */
    // Prioritize this AFTER Edge and Opera detection.
    CHROME_CRIOS: /(?:Chrome|CriOS|Chromium)\/([\d.]+)/i, // Added Chromium for broader detection

    /** Regular expression to detect Safari browser. Needs to be checked AFTER Chrome/Opera/Edge/Firefox. */
    SAFARI: /Safari\/([\d.]+)/i, // This captures the WebKit version, typically.

    /** Regular expression to extract a Safari browser 'Version/' number. This is the true browser version. */
    SAFARI_VERSION: /Version\/([\d.]+).*Safari/i, // This is key for actual Safari version

    /** Regular expression to detect Internet Explorer (MSIE for IE10 and below, Trident for IE11). */
    INTERNET_EXPLORER: /MSIE ([\d.]+)|Trident\/.+?rv:([\d.]+)/i, // Capture either MSIE version or rv: version

    // --- Rendering Engine Detection ---

    /** Regular expression to detect WebKit engine and extract its version (used by Safari, older Chrome/Opera). */
    WEBKIT_ENGINE: /AppleWebKit\/([\d.]+)/i,

    /** Regular expression to detect Gecko engine and extract its version (used by Firefox). */

    GECKO_ENGINE: /Gecko\/(\d{8}|\d+\.\d+)/i, // Gecko version can be YYYYMMDD or X.Y
    /** Regular expression to detect Trident engine and extract its version (used by Internet Explorer 11). */

    TRIDENT_ENGINE: /Trident\/([\d.]+)/i,

    /** Regular expression to detect Presto engine and extract its version (older Opera). */
    PRESTO_ENGINE: /Presto\/([\d.]+)/i, // Added for older Opera support
});

export default USER_AGENT_REGEX;
