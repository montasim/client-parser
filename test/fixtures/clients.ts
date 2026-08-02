export interface ClientFixture {
    name: string;
    userAgent: string;
    expected: {
        browser: string;
        os: string;
        device: string;
        engine: string;
    };
}

export const CLIENT_FIXTURES: ClientFixture[] = [
    {
        name: 'Chrome on Windows',
        userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        expected: {
            browser: 'Chrome',
            os: 'Windows',
            device: 'desktop',
            engine: 'Blink',
        },
    },
    {
        name: 'Chrome on iPhone',
        userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.54 Mobile/15E148 Safari/604.1',
        expected: {
            browser: 'Chrome',
            os: 'iOS',
            device: 'mobile',
            engine: 'WebKit',
        },
    },
    {
        name: 'Firefox on iPhone',
        userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/125.0 Mobile/15E148 Safari/605.1.15',
        expected: {
            browser: 'Firefox',
            os: 'iOS',
            device: 'mobile',
            engine: 'WebKit',
        },
    },
    {
        name: 'Samsung Internet on Android',
        userAgent:
            'Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-S921B Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36',
        expected: {
            browser: 'Samsung Internet',
            os: 'Android',
            device: 'mobile',
            engine: 'Blink',
        },
    },
    {
        name: 'Safari on iPad',
        userAgent:
            'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
        expected: {
            browser: 'Safari',
            os: 'iOS',
            device: 'tablet',
            engine: 'WebKit',
        },
    },
    {
        name: 'Firefox on Linux',
        userAgent:
            'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0',
        expected: {
            browser: 'Firefox',
            os: 'Linux',
            device: 'desktop',
            engine: 'Gecko',
        },
    },
    {
        name: 'Chrome on ChromeOS',
        userAgent:
            'Mozilla/5.0 (X11; CrOS x86_64 15917.71.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        expected: {
            browser: 'Chrome',
            os: 'ChromeOS',
            device: 'desktop',
            engine: 'Blink',
        },
    },
    {
        name: 'Android tablet',
        userAgent:
            'Mozilla/5.0 (Linux; Android 13; SM-T870 Build/TP1A.220624.014) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        expected: {
            browser: 'Chrome',
            os: 'Android',
            device: 'tablet',
            engine: 'Blink',
        },
    },
    {
        name: 'legacy Opera',
        userAgent:
            'Opera/9.80 (Windows NT 6.1; WOW64) Presto/2.12.388 Version/12.18',
        expected: {
            browser: 'Opera',
            os: 'Windows',
            device: 'desktop',
            engine: 'Presto',
        },
    },
    {
        name: 'smart TV',
        userAgent:
            'Mozilla/5.0 (SMART-TV; Linux; Tizen 7.0) AppleWebKit/537.36 TV Safari/537.36',
        expected: {
            browser: 'unknown',
            os: 'Linux',
            device: 'smart-tv',
            engine: 'WebKit',
        },
    },
];
