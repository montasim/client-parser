import { describe, expect, it } from 'vitest';
import { getDeviceType, parseClient } from '../src';
import { CLIENT_FIXTURES } from './fixtures/clients';

describe('parseClient', () => {
    it.each(CLIENT_FIXTURES)('classifies $name', ({ userAgent, expected }) => {
        const result = parseClient(userAgent);

        expect(result.browser.name).toBe(expected.browser);
        expect(result.os.name).toBe(expected.os);
        expect(result.device.type).toBe(expected.device);
        expect(result.engine.name).toBe(expected.engine);
        expect(result.source).toEqual(['user-agent']);
        expect(result.confidence).not.toBe('low');
    });

    it('uses platform signals for iPadOS desktop mode', () => {
        const result = parseClient({
            userAgent:
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
            platform: 'MacIntel',
            maxTouchPoints: 5,
        });

        expect(result.os.name).toBe('iPadOS');
        expect(result.device).toMatchObject({
            type: 'tablet',
            name: 'iPad',
            vendor: 'Apple',
        });
        expect(result.isTablet).toBe(true);
    });

    it('extracts Android model and vendor without inventing missing values', () => {
        const result = parseClient(
            'Mozilla/5.0 (Linux; Android 14; SM-S921B Build/UP1A.231005.007) AppleWebKit/537.36 Chrome/126.0.0.0 Mobile Safari/537.36'
        );

        expect(result.device.model).toBe('SM-S921B');
        expect(result.device.vendor).toBe('Samsung');
        expect(result.os).not.toHaveProperty('architecture');
    });

    it('detects known bots separately from device classification', () => {
        const result = parseClient(
            'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        );

        expect(result.bot).toEqual({
            isBot: true,
            name: 'Googlebot',
            category: 'crawler',
        });
    });

    it('classifies generic crawlers conservatively', () => {
        expect(parseClient('Example crawler/1.0').bot).toEqual({
            isBot: true,
            category: 'unknown',
        });
    });

    it.each([
        ['Mozilla/5.0 (PlayStation 5 7.00)', 'console'],
        ['Mozilla/5.0 (Linux; Wear OS 4.0; Watch)', 'wearable'],
        ['Mozilla/5.0 (Linux; U; Kindle/3.0)', 'embedded'],
    ])('classifies additional form factors', (userAgent, type) => {
        expect(parseClient(userAgent).device.type).toBe(type);
    });

    it('recognizes Internet Explorer and Trident', () => {
        const result = parseClient(
            'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko'
        );
        expect(result.browser).toMatchObject({
            name: 'Internet Explorer',
            version: '11.0',
        });
        expect(result.engine).toEqual({ name: 'Trident', version: '7.0' });
    });

    it('returns an honest low-confidence result for missing evidence', () => {
        expect(parseClient()).toEqual({
            device: { type: 'unknown' },
            browser: { name: 'unknown' },
            os: { name: 'unknown' },
            engine: { name: 'unknown' },
            bot: { isBot: false },
            isMobile: false,
            isTablet: false,
            source: [],
            confidence: 'low',
        });
    });

    it('caps untrusted user-agent input', () => {
        const result = parseClient(`client/${'1'.repeat(20_000)}`);
        expect(result.userAgent).toHaveLength(8_192);
    });

    it('retains the deprecated alias during migration', () => {
        expect(getDeviceType('curl/8.8.0')).toEqual(parseClient('curl/8.8.0'));
    });
});
