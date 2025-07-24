/**
 * @fileoverview Processes a list of User Agent strings, detects detailed device information using the `getDeviceType` utility,
 * and saves the results to a JSON file.
 *
 * @module scripts/detectDevices
 * @version 1.0.0
 * @license CC BY-NC-ND 4.0
 *
 * @author Mohammad Montasim -Al- Mamun Shuvo
 * @created 2025-07-23
 * @contact montasimmamun@gmail.com
 * @github https://github.com/montasim
 */

import fs from 'node:fs';
import path from 'node:path';
import getDeviceType from '../dist/index.js';
import userAgents from '../data/sample_user_agents.json' with { type: 'json' };

console.info('Detecting device info for provided User Agents...');

/**
 * Stores detected device information for each User Agent.
 * @type {Array<Object>}
 */
const allDeviceResults = [];

/**
 * Loop through each User Agent, detect its device info,
 * and store the result in `allDeviceResults`.
 */
userAgents.forEach((userAgent) => {
    const deviceInfo = getDeviceType(userAgent);
    allDeviceResults.push(deviceInfo);
});

console.info('Detection complete.');

/**
 * Output directory where the results will be saved.
 * @type {string}
 */
const outputDir = path.resolve(process.cwd(), 'data');

/**
 * Full path to the output JSON file.
 * @type {string}
 */
const outputPath = path.join(outputDir, 'detected_device_info.json');

/**
 * Create the output directory if it doesn't exist.
 */
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

try {
    /**
     * Write the results to the output file.
     * @throws {Error} If writing fails.
     */
    fs.writeFileSync(
        outputPath,
        JSON.stringify(allDeviceResults, null, 2),
        'utf8'
    );
    console.info(`\nSuccessfully saved detection results to: ${outputPath}`);
} catch (error) {
    /**
     * Logs error if the file write operation fails.
     * @param {Error} error
     */
    console.error(`\nError saving detection results: ${error}`);
}
