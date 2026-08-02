import { describe, expect, it } from 'vitest';
import { parseNavigator } from '../src';

describe('parseNavigator', () => {
    it('merges low- and high-entropy Client Hints', async () => {
        const result = await parseNavigator({
            userAgent:
                'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 Chrome/126.0.0.0 Mobile Safari/537.36',
            platform: 'Linux armv8l',
            userAgentData: {
                brands: [{ brand: 'Google Chrome', version: '126' }],
                mobile: true,
                platform: 'Android',
                getHighEntropyValues: async () => ({
                    platformVersion: '14.0.0',
                    architecture: 'arm',
                    bitness: '64',
                    model: 'Pixel 8',
                    fullVersionList: [
                        { brand: 'Google Chrome', version: '126.0.6478.122' },
                    ],
                }),
            },
        });

        expect(result.browser.version).toBe('126.0.6478.122');
        expect(result.os).toEqual({
            name: 'Android',
            version: '14.0.0',
            architecture: 'arm 64',
        });
        expect(result.device).toMatchObject({
            type: 'mobile',
            model: 'Pixel 8',
            vendor: 'Google',
        });
    });

    it('falls back when high-entropy hints are denied', async () => {
        const result = await parseNavigator({
            userAgent: 'curl/8.8.0',
            userAgentData: {
                getHighEntropyValues: async () => {
                    throw new Error('denied');
                },
            },
        });
        expect(result.browser.name).toBe('curl');
    });

    it('works without the Client Hints API', async () => {
        const result = await parseNavigator({
            userAgent:
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 Version/17.5 Safari/605.1.15',
            platform: 'MacIntel',
            maxTouchPoints: 0,
        });
        expect(result.os.name).toBe('macOS');
        expect(result.source).toEqual(['user-agent', 'platform']);
    });
});
