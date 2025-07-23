#!/usr/bin/env node

/**
 * @fileoverview This script generates and displays a styled "client-parser" ASCII art logo
 * along with a signature including a clickable GitHub link in the console. It uses `chalk`
 * for terminal styling and `figlet` for ASCII art generation.
 *
 * @author Mohammad Montasim -Al- Mamun Shuvo
 * @contact montasimmamun@gmail.com
 * @contactGithub https://github.com/montasim
 * @version 1.0.0
 * @license CC BY-NC-ND 4.0
 * @created 2025-07-23
 */

import chalk from 'chalk';
import figlet from 'figlet';

/**
 * Generates ASCII art for "client-parser" using the 'Big' font.
 * The output is configured for full horizontal and vertical layout.
 * @type {string}
 */
const clientParserArt = figlet.textSync('client-parser', {
    font: 'Big',
    horizontalLayout: 'full',
    verticalLayout: 'full',
});

/**
 * The URL for Montasim's GitHub profile.
 * @type {string}
 */
const githubUrl = 'https://github.com/montasim';

/**
 * The display text for the hyperlink.
 * @type {string}
 */
const linkText = 'Montasim';

/**
 * Creates a clickable hyperlink string using ANSI escape codes.
 * This link will navigate to `githubUrl` and display `linkText`.
 * Note: Clickable links may not be supported by all terminal emulators.
 * @type {string}
 */
const clickableLink = `\x1b]8;;${githubUrl}\x07${linkText}\x1b]8;;\x07`;

/**
 * Logs the generated ASCII art and a styled signature with a clickable link to the console.
 * The ASCII art is red, and the signature "by - Montasim" is yellow and bold,
 * with "Montasim" being a clickable link.
 */
console.info(
    chalk.red(
        clientParserArt +
            chalk.yellow.bold(' by - ') +
            chalk.bold(clickableLink)
    )
);
