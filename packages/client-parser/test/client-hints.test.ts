import { describe, expect, it } from 'vitest';
import { parseClient, parseClientHintHeaders } from '../src';

describe('Client Hints', () => {
    const headers = {
        'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36',
        'Sec-CH-UA':
            '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
        'Sec-CH-UA-Full-Version-List':
            '"Chromium";v="126.0.6478.127", "Microsoft Edge";v="126.0.2592.68"',
        'Sec-CH-UA-Mobile': '?0',
        'Sec-CH-UA-Platform': '"Windows"',
        'Sec-CH-UA-Platform-Version': '"15.0.0"',
        'Sec-CH-UA-Arch': '"x86"',
        'Sec-CH-UA-Bitness': '"64"',
    };

    it('parses case-insensitive HTTP header records', () => {
        expect(parseClientHintHeaders(headers)).toMatchObject({
            mobile: false,
            platform: 'Windows',
            platformVersion: '15.0.0',
            architecture: 'x86',
            bitness: '64',
        });
    });

    it('prefers structured hints over reduced UA data', () => {
        const result = parseClient({ headers });

        expect(result.browser).toEqual({
            name: 'Edge',
            version: '126.0.2592.68',
            major: '126',
        });
        expect(result.os).toEqual({
            name: 'Windows 11',
            version: '15.0.0',
            architecture: 'x86 64',
        });
        expect(result.source).toEqual([
            'user-agent',
            'headers',
            'client-hints',
        ]);
        expect(result.confidence).toBe('high');
    });

    it('accepts a Headers-compatible accessor', () => {
        const accessor = {
            get: (name: string) =>
                name.toLowerCase() === 'sec-ch-ua-mobile' ? '?1' : null,
        };
        expect(parseClientHintHeaders(accessor)).toEqual({ mobile: true });
    });

    it('returns no hints when hint headers are absent', () => {
        expect(parseClientHintHeaders({ accept: 'text/html' })).toBeUndefined();
        expect(parseClientHintHeaders()).toBeUndefined();
    });

    it('does not claim unused headers or empty hints as sources', () => {
        expect(
            parseClient({ headers: { accept: 'text/html' }, clientHints: {} })
                .source
        ).toEqual([]);
    });

    it.each([
        ['macOS', 'macOS'],
        ['Android', 'Android'],
        ['Chrome OS', 'ChromeOS'],
        ['Linux', 'Linux'],
        ['iOS', 'iOS'],
        ['FreeBSD', 'FreeBSD'],
    ])('normalizes the %s hint platform', (platform, expected) => {
        const result = parseClient({ clientHints: { platform } });
        expect(result.os.name).toBe(expected);
    });
});
