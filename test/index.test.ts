import { IDeviceInfo } from '../src/types/types';
import getDeviceType from '../src';
import userAgentTestCases from '../data/detected_device_info.json';
const testCases = userAgentTestCases as IDeviceInfo[];

/**
 * Test suite for the `getDeviceType` utility function.
 * This suite covers various User Agent strings to ensure accurate device, OS, and browser detection.
 */
describe('getDeviceType', () => {
    /**
     * Test case: Should correctly detect an Android phone and its details.
     */
    testCases.forEach((testCase: IDeviceInfo) => {
        it(`should correctly detect device info for: ${testCase.userAgentString.substring(0, 50)}...`, () => {
            const result = getDeviceType(testCase.userAgentString);

            // Using toEqual for deep comparison of objects
            expect(result.device).toEqual(testCase.device);
            expect(result.os).toEqual(testCase.os);
            expect(result.browser).toEqual(testCase.browser);
            expect(result.engine).toEqual(testCase.engine);
            expect(result.userAgentString).toEqual(testCase.userAgentString);
            expect(result.platform).toEqual(testCase.platform);
            expect(result.isBot).toEqual(testCase.isBot);
        });
    });

    /**
     * Test case: Should return 'unknown' type and undefined OS/browser for an unrecognized User Agent string.
     */
    it('should return unknown for an unrecognized user agent', () => {
        const unknownUserAgent = 'Some-Unknown-User-Agent-String';
        const result = getDeviceType(unknownUserAgent);

        expect(result.device.type).toBe('unknown');
        expect(result.device.name).toBe('unknown');
        expect(result.os.name).toBe('unknown');
        expect(result.browser.name).toBe('unknown');
        expect(result.engine.name).toBe('unknown');
        expect(result.userAgentString).toBe(unknownUserAgent);
    });

    /**
     * Test case: Should handle an empty User Agent string gracefully, returning 'unknown' type.
     */
    test('should handle an empty user agent string', () => {
        const unknownUserAgent = '';
        const result = getDeviceType(unknownUserAgent);

        expect(result.device.type).toBe('unknown');
        expect(result.device.name).toBe('unknown');
        expect(result.os.name).toBe('unknown');
        expect(result.browser.name).toBe('unknown');
        expect(result.engine.name).toBe('unknown');
        expect(result.userAgentString).toBe(unknownUserAgent);
    });
});
