/**
 * @fileoverview Jest tests for the `getDeviceType` utility function.
 * This file contains a series of unit tests to verify that `getDeviceType` accurately
 * detects the operating system, device type (mobile, tablet, PC), browser name, and browser version
 * based on various mocked User Agent strings.
 *
 * @module __tests__/index.test.ts
 * @version 1.0.0
 * @license CC BY-NC-ND 4.0
 *
 * @contact Mohammad Montasim -Al- Mamun Shuvo
 * @created 2025-07-23
 * @contactEmail montasimmamun@gmail.com
 * @contactGithub https://github.com/montasim
 */

/**
 * @jest-environment jsdom
 */
import getDeviceType from '../src';

/**
 * Test suite for the `getDeviceType` utility function.
 * This suite covers various User Agent strings to ensure accurate device, OS, and browser detection.
 */
describe('getDeviceType', () => {
    /**
     * Test case: Should correctly detect an Android phone and its details.
     */
    test('should detect Android phone', () => {
        const userAgent =
            'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36';
        const device = getDeviceType(userAgent);
        expect(device.type).toBe('android');
        expect(device.os).toBe('Android');
        expect(device.osVersion).toBe('10');
        expect(device.browser).toBe('Chrome');
        expect(device.browserVersion).toBe('100.0.4896.127');
        expect(device.isMobile).toBe(true);
        expect(device.isTablet).toBe(false);
    });

    /**
     * Test case: Should correctly detect an Android tablet and its details.
     */
    test('should detect Android tablet', () => {
        const userAgent =
            'Mozilla/5.0 (Linux; Android 11; SM-T510) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.88 Safari/537.36';
        const device = getDeviceType(userAgent);
        expect(device.type).toBe('android');
        expect(device.os).toBe('Android');
        expect(device.osVersion).toBe('11');
        expect(device.browser).toBe('Chrome');
        expect(device.isMobile).toBe(true); // Android tablets are still considered mobile
        expect(device.isTablet).toBe(true);
    });

    /**
     * Test case: Should correctly detect an Android tablet when the User Agent contains the "Tablet" keyword.
     */
    test('should detect Android tablet with "Tablet" keyword', () => {
        const userAgent =
            'Mozilla/5.0 (Linux; Android 12; K013 Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Tablet';
        const device = getDeviceType(userAgent);
        expect(device.type).toBe('android');
        expect(device.os).toBe('Android');
        expect(device.osVersion).toBe('12');
        expect(device.isMobile).toBe(true);
        expect(device.isTablet).toBe(true);
    });

    /**
     * Test case: Should correctly detect an iPhone and its details.
     */
    test('should detect iPhone', () => {
        const userAgent =
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0.3 Mobile/15E148 Safari/604.1';
        const device = getDeviceType(userAgent);
        expect(device.type).toBe('ios');
        expect(device.os).toBe('iOS');
        expect(device.osVersion).toBe('17.0.3');
        expect(device.browser).toBe('Safari');
        expect(device.browserVersion).toBe('17.0.3');
        expect(device.isMobile).toBe(true);
        expect(device.isTablet).toBe(false);
    });

    /**
     * Test case: Should correctly detect an iPad and its details, including Chrome browser on iPad.
     */
    test('should detect iPad', () => {
        const userAgent =
            'Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/100.0.4896.127 Mobile/15E148 Safari/604.1';
        const device = getDeviceType(userAgent);
        expect(device.type).toBe('ios');
        expect(device.os).toBe('iOS');
        expect(device.osVersion).toBe('16.6');
        expect(device.browser).toBe('Chrome');
        expect(device.browserVersion).toBe('100.0.4896.127');
        expect(device.isMobile).toBe(true);
        expect(device.isTablet).toBe(true);
    });

    /**
     * Test case: Should correctly detect iPadOS and its version.
     */
    test('should detect iPad OS', () => {
        const userAgent =
            'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
        const device = getDeviceType(userAgent);
        expect(device.type).toBe('ios');
        expect(device.os).toBe('iOS');
        expect(device.osVersion).toBe('17.5');
        expect(device.isTablet).toBe(true);
    });

    /**
     * Test case: Should correctly detect a Windows Phone and its details.
     */
    test('should detect Windows Phone', () => {
        const userAgent =
            'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.88 Mobile Safari/537.36 Edge/14.14372';
        const device = getDeviceType(userAgent);
        expect(device.type).toBe('windows_phone');
        expect(device.os).toBe('Windows Phone');
        expect(device.osVersion).toBe('10.0');
        expect(device.browser).toBe('Edge');
        expect(device.browserVersion).toBe('14.14372');
        expect(device.isMobile).toBe(true);
        expect(device.isTablet).toBe(false);
    });

    /**
     * Test case: Should correctly detect a Windows PC and its details.
     */
    test('should detect Windows PC', () => {
        const userAgent =
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36';
        const device = getDeviceType(userAgent);
        expect(device.type).toBe('pc');
        expect(device.os).toBe('Windows');
        expect(device.osVersion).toBe('10.0');
        expect(device.browser).toBe('Chrome');
        expect(device.browserVersion).toBe('100.0.4896.127');
        expect(device.isMobile).toBe(false);
        expect(device.isTablet).toBe(false);
    });

    /**
     * Test case: Should correctly detect a macOS PC and its details.
     */
    test('should detect macOS PC', () => {
        const userAgent =
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36';
        const device = getDeviceType(userAgent);
        expect(device.type).toBe('pc');
        expect(device.os).toBe('macOS');
        expect(device.osVersion).toBe('10.15.7');
        expect(device.browser).toBe('Chrome');
        expect(device.browserVersion).toBe('100.0.4896.127');
        expect(device.isMobile).toBe(false);
        expect(device.isTablet).toBe(false);
    });

    /**
     * Test case: Should correctly detect a Linux PC and its details.
     */
    test('should detect Linux PC', () => {
        const userAgent =
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/99.0 Chrome/100.0.4896.127 Safari/537.36';
        const device = getDeviceType(userAgent);
        expect(device.type).toBe('pc');
        expect(device.os).toBe('Linux');
        expect(device.osVersion).toBeUndefined(); // Linux version is not extracted
        expect(device.browser).toBe('Firefox');
        expect(device.browserVersion).toBe('99.0');
        expect(device.isMobile).toBe(false);
        expect(device.isTablet).toBe(false);
    });

    /**
     * Test case: Should correctly detect Chrome browser.
     */
    test('should detect Chrome browser', () => {
        const userAgent =
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36';
        const device = getDeviceType(userAgent);
        expect(device.browser).toBe('Chrome');
        expect(device.browserVersion).toBe('95.0.4638.54');
    });

    /**
     * Test case: Should correctly detect Firefox browser.
     */
    test('should detect Firefox browser', () => {
        const userAgent =
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0';
        const device = getDeviceType(userAgent);
        expect(device.browser).toBe('Firefox');
        expect(device.browserVersion).toBe('94.0');
    });

    /**
     * Test case: Should correctly detect Safari browser.
     */
    test('should detect Safari browser', () => {
        const userAgent =
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15';
        const device = getDeviceType(userAgent);
        expect(device.browser).toBe('Safari');
        expect(device.browserVersion).toBe('15.1');
    });

    /**
     * Test case: Should correctly detect Edge browser.
     */
    test('should detect Edge browser', () => {
        const userAgent =
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36 Edg/95.0.1020.30';
        const device = getDeviceType(userAgent);
        expect(device.browser).toBe('Edge');
        expect(device.browserVersion).toBe('95.0.1020.30');
    });

    /**
     * Test case: Should correctly detect Opera browser.
     */
    test('should detect Opera browser', () => {
        const userAgent =
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36 OPR/81.0.4196.60';
        const device = getDeviceType(userAgent);
        expect(device.browser).toBe('Opera');
        expect(device.browserVersion).toBe('81.0.4196.60');
    });

    /**
     * Test case: Should correctly detect Internet Explorer 11.
     */
    test('should detect Internet Explorer 11', () => {
        const userAgent =
            'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        const device = getDeviceType(userAgent);
        expect(device.browser).toBe('Internet Explorer');
        expect(device.browserVersion).toBe('11.0');
    });

    /**
     * Test case: Should correctly detect Internet Explorer 8.
     */
    test('should detect Internet Explorer 8', () => {
        const userAgent =
            'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';
        const device = getDeviceType(userAgent);
        expect(device.browser).toBe('Internet Explorer');
        expect(device.browserVersion).toBe('8.0');
    });

    /**
     * Test case: Should return 'unknown' type and undefined OS/browser for an unrecognized User Agent string.
     */
    test('should return unknown for unrecognized user agent', () => {
        const userAgent = 'Some weird and unknown user agent string';
        const device = getDeviceType(userAgent);
        expect(device.type).toBe('unknown');
        expect(device.isMobile).toBe(false);
        expect(device.isTablet).toBe(false);
        expect(device.os).toBeUndefined();
        expect(device.browser).toBeUndefined();
    });

    /**
     * Test case: Should handle an empty User Agent string gracefully, returning 'unknown' type.
     */
    test('should handle an empty user agent string', () => {
        const userAgent = '';
        const device = getDeviceType(userAgent);
        expect(device.type).toBe('unknown');
        expect(device.isMobile).toBe(false);
        expect(device.isTablet).toBe(false);
        expect(device.os).toBeUndefined();
        expect(device.browser).toBeUndefined();
    });
});
