import fs from 'node:fs';
import path from 'node:path';
import getDeviceType from '../dist/esm/index.js';
import userAgents from '../data/sample_user_agents.json' with { type: 'json' };

console.info('Detecting device info for provided User Agents...');

const allDeviceResults = [];

userAgents.forEach((userAgent) => {
    const deviceInfo = getDeviceType(userAgent);
    allDeviceResults.push(deviceInfo);
});

console.info('Detection complete.');

// Define the output directory and filename
const outputDir = path.resolve(process.cwd(), 'data');
const outputPath = path.join(outputDir, 'detected_device_info.json');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

try {
    // Write the collected data to a JSON file
    fs.writeFileSync(
        outputPath,
        JSON.stringify(allDeviceResults, null, 2),
        'utf8'
    );
    console.info(`\nSuccessfully saved detection results to: ${outputPath}`);
} catch (error) {
    console.error(`\nError saving detection results: ${error}`);
}
