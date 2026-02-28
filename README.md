# client-parser

<!-- repository summary badges start -->
<div>
    <img alt="NPM Version" src="https://badgen.net/npm/v/client-parser?label=version&labelColor=EB008B&color=00B8B5">
    <img alt="NPM Downloads" src="https://badgen.net/npm/dm/client-parser?label=downloads&labelColor=EB008B&color=00B8B5">
    <img alt="NPM Package" src="https://badgen.net/npm/license/client-parser?label=license&labelColor=EB008B&color=00B8B5">
</div>
<!-- repository summary badges end -->

The [client-parser](https://www.npmjs.com/package/client-parser) is a utility to detect detailed device information from the browser's User Agent string.

**🌐 Demo:** [https://client-parser-demo.netlify.app/](https://client-parser-demo.netlify.app/)

## Table of Contents

- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
- [Returned Device Information Structure](#Returned-device-information-structure)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [FAQs](#faqs)

---

## Key Features

1. **Detailed Device Detection:** Identifies general device categories (Android, iOS, Windows Phone, PC, unknown).
2. **Operating System Information:** Extracts OS name (e.g., Android, iOS, Windows, macOS, Linux) and version.
3. **Browser Information:** Detects browser name (e.g., Chrome, Safari, Firefox, Edge) and version.
4. **Rendering Engine Detection:** Identifies the browser's rendering engine (e.g., `Blink`, `Gecko`, `WebKit`, `Trident`) and its version.
5. **Mobile/Tablet Flags:** Provides boolean flags (`isMobile`, `isTablet`) for quick checks.
6. **TypeScript Support:** Includes strong type definitions (`DeviceInfo` interface) for enhanced code safety and developer experience.
7. **Lightweight & Efficient:** Minimal footprint with high performance.
8. **Easy Integration:** Seamlessly integrates with any Node.js or TypeScript-based project.

---

## Installation

To install the package, run the following command:

```bash
npm install client-parser
```

or

```bash
yarn add client-parser
```

or

```bash
pnpm add client-parser
```

or

```bash
bun add client-parser
```

---

## Usage

### JavaScript CommonJS Example

```javascript
const getDeviceType = require('client-parser');

const userAgentString =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0.1 Mobile/15E148 Safari/604.1';
const platformString = 'iPhone';
const deviceInfo = getDeviceType(userAgentString, platformString);

// Log some of the detected information
console.log('Device Type:', deviceInfo.type); // Outputs: e.g., "pc", "android", "ios", "unknown"
console.log('Operating System:', deviceInfo.os); // Outputs: e.g., "Windows", "Android", "iOS"
console.log('Browser:', deviceInfo.browser); // Outputs: e.g., "Chrome", "Safari", "Firefox"
console.log('Is Mobile:', deviceInfo.isMobile); // Outputs: true or false
console.log('Is Tablet:', deviceInfo.isTablet); // Outputs: true or false
```

### JavaScript ESM Example

```javascript
import getDeviceType from 'client-parser';

const userAgentString =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0.1 Mobile/15E148 Safari/604.1';
const platformString = 'iPhone';
const deviceInfo = getDeviceType(userAgentString, platformString);

// Log some of the detected information
console.log('Device Type:', deviceInfo.type); // Outputs: e.g., "pc", "android", "ios", "unknown"
console.log('Operating System:', deviceInfo.os); // Outputs: e.g., "Windows", "Android", "iOS"
console.log('Browser:', deviceInfo.browser); // Outputs: e.g., "Chrome", "Safari", "Firefox"
console.log('Is Mobile:', deviceInfo.isMobile); // Outputs: true or false
console.log('Is Tablet:', deviceInfo.isTablet); // Outputs: true or false
```

### TypeScript ESM Example

```typescript
import getDeviceType, { IDeviceInfo } from 'client-parser';

const desktopUserAgent: string =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const desktopPlatform: string = 'Win32';
const currentDevice: IDeviceInfo = getDeviceType(
    desktopUserAgent,
    desktopPlatform
);

// Log some of the detected information
console.log('Device Type:', deviceInfo.type); // Outputs: e.g., "pc", "android", "ios", "unknown"
console.log('Operating System:', deviceInfo.os); // Outputs: e.g., "Windows", "Android", "iOS"
console.log('Browser:', deviceInfo.browser); // Outputs: e.g., "Chrome", "Safari", "Firefox"
console.log('Is Mobile:', deviceInfo.isMobile); // Outputs: true or false
console.log('Is Tablet:', deviceInfo.isTablet); // Outputs: true or false
```

---

## Returned Device Information Structure

The getDeviceType() function returns an object conforming to the DeviceInfo interface, providing comprehensive details about the client's environment.

```typescript
export interface IDeviceInfo {
    /** The raw User Agent string used for detection. */
    userAgentString: string;
    /** Information about the device itself. */
    device: {
        /** The general category of the device: "android", "ios", "windows_phone", "pc", or "unknown". */
        type: 'android' | 'ios' | 'windows_phone' | 'pc' | 'unknown';
        /** A more specific name for the device (e.g., "iPhone", "iPad", "Android Phone", "Windows PC"). */
        name: string;
        /** Placeholder for device model (currently 'unknown'). */
        model: string;
        /** Placeholder for device manufacturer (currently 'unknown'). */
        manufacturer: string;
    };
    /** Information about the browser's rendering engine. */
    engine: {
        /** The name of the rendering engine (e.g., "Blink", "Gecko", "WebKit", "Trident"). */
        name: string;
        /** The version of the rendering engine. */
        version: string;
    };
    /** Information about the operating system. */
    os: {
        /** The name of the operating system (e.g., "Android", "iOS", "Windows Phone", "Windows", "macOS", "Linux"). */
        name: string;
        /** The version of the operating system. Undefined if not detectable. */
        version?: string;
        /** Placeholder for OS architecture (currently undefined). */
        architecture?: string;
    };
    /** Information about the browser. */
    browser: {
        /** The name of the browser (e.g., "Edge", "Opera", "Firefox", "Chrome", "Safari", "Internet Explorer"). */
        name: string;
        /** The version of the browser. */
        version: string;
    };
    /** The value of navigator.platform, if provided. */
    platform: string;
    /** A boolean indicating if the user agent is detected as a bot (currently always false, requires separate logic). */
    isBot: boolean;
}
```

### Possible Values and Examples:

- **device.type:** "android", "ios", "windows_phone", "pc", "unknown"
- **device.name:** "Android Phone", "Android Tablet", "iPhone", "iPad", "iPod Touch", "Windows Phone", "Windows PC", "macOS PC", "Linux PC", "unknown"
- **engine.name:** "Blink", "Gecko", "WebKit", "Trident", "Presto", "unknown"
- **engine.version:** E.g., "537.36", "20100101", "605.1.15", "7.0"
- **os.name:** "Android", "iOS", "Windows Phone", "Windows", "macOS", "Linux", "unknown"
- **os.version:** E.g., "13", "17.0.3", "10.0", "10.15.7"
- **browser.name:** "Edge", "Opera", "Firefox", "Chrome", "Safari", "Internet Explorer", "unknown"
- **browser.version:** E.g., "120.0.2210.144", "105.0.0.0", "119.0", "120.0.0.0", "17.0.1", "11.0"

## License

[![by-nc-nd/4.0](https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

This project is licensed under the **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)**.

### You are free to:

- **Share** — Copy and redistribute the material in any medium or format.

### Under the following terms:

- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- **NonCommercial** — You may not use the material for commercial purposes.
- **NoDerivatives** — If you remix, transform, or build upon the material, you may not distribute the modified material.

For more details, please visit the [Creative Commons License Page](https://creativecommons.org/licenses/by-nc-nd/4.0/).

---

## Acknowledgments

Special thanks to the following resources:

1. **MDN Web Docs** - Comprehensive MIME type references.
2. **UserAgentString.com** - A valuable resource for understanding various User Agent string formats.
3. **TypeScript Docs** - Best practices for defining and using type-safe constants.

---

## FAQs

### 1. **How accurate is device detection using the User Agent string?**

User Agent string parsing is generally effective but not 100% foolproof. User Agents can be spoofed, incomplete, or vary across different browser versions and custom builds. For critical applications, consider combining this with feature detection (e.g., checking for specific browser APIs) for more robust results.

### 2. **Can this library detect specific device models (e.g., "iPhone 15 Pro")?**

No, this library focuses on broader device categories (phone, tablet, PC) and operating systems. Detecting specific device models from the User Agent string alone is often unreliable and not within the scope of this lightweight utility.

### 3. **How do I uninstall the package?**

You can remove the package by running:

```bash
npm uninstall client-parser
```

or

```bash
yarn remove client-parser
```

or

```bash
pnpm remove client-parser
```

or

```bash
bun remove client-parser
```

---

## Author

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/95298623?v=4" width="100px" alt="Moon">
      <a href="https://github.com/montasim">
        <br>
          Ｍ♢ＮＴΛＳＩＭ
        <br>
      </a>
    </td>
  </tr>
</table>
