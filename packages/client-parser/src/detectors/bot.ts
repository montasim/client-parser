import type { BotCategory, BotInfo } from '../types';

const KNOWN_BOTS: ReadonlyArray<[RegExp, string, BotCategory]> = [
    [/Googlebot/i, 'Googlebot', 'crawler'],
    [/bingbot/i, 'Bingbot', 'crawler'],
    [/DuckDuckBot/i, 'DuckDuckBot', 'crawler'],
    [/Baiduspider/i, 'Baiduspider', 'crawler'],
    [/YandexBot/i, 'YandexBot', 'crawler'],
    [/facebookexternalhit/i, 'Facebook Preview', 'preview'],
    [/Twitterbot/i, 'Twitter Preview', 'preview'],
    [/Slackbot/i, 'Slack Preview', 'preview'],
    [/Discordbot/i, 'Discord Preview', 'preview'],
    [/Lighthouse/i, 'Lighthouse', 'automation'],
    [/HeadlessChrome/i, 'Headless Chrome', 'automation'],
    [/UptimeRobot/i, 'UptimeRobot', 'monitoring'],
];

export function detectBot(userAgent: string): BotInfo {
    for (const [pattern, name, category] of KNOWN_BOTS) {
        if (pattern.test(userAgent)) return { isBot: true, name, category };
    }
    if (/\b(?:bot|crawler|spider|slurp)\b/i.test(userAgent)) {
        return { isBot: true, category: 'unknown' };
    }
    return { isBot: false };
}
