export const PATTERNS = {
    os: {
        windowsPhone: /Windows Phone(?: OS)?[ /]([\d.]+)/i,
        android: /Android(?:[ /]([\d.]+))?/i,
        iosDevice: /\b(iPhone|iPad|iPod)(?: touch)?\b/i,
        iosVersion: /(?:CPU(?: iPhone)? OS|iPhone OS) ([\d_]+)/i,
        windows: /Windows NT ([\d.]+)/i,
        macOS: /Macintosh;.*Mac OS X[ /]([\d_.]+)/i,
        chromeOS: /CrOS [^;)]+ ([\d.]+)/i,
        kaiOS: /KaiOS[ /]([\d.]+)/i,
        linux: /(?:X11; )?Linux/i,
    },
    browser: {
        edge: /(?:EdgA|EdgiOS|Edg|Edge)\/([\d.]+)/i,
        operaMini: /Opera Mini(?:\/| )([\d.]+)/i,
        opera: /(?:OPR|Opera Mobi)\/([\d.]+)/i,
        operaLegacy: /Opera[ /]([\d.]+)/i,
        operaVersion: /Version\/([\d.]+)/i,
        samsung: /SamsungBrowser\/([\d.]+)/i,
        firefoxIOS: /FxiOS\/([\d.]+)/i,
        firefox: /Firefox\/([\d.]+)/i,
        chrome: /(?:HeadlessChrome|CriOS|Chrome|Chromium)\/([\d.]+)/i,
        safari: /Version\/([\d.]+).*Safari\//i,
        ie: /MSIE ([\d.]+)|Trident\/.+?rv:([\d.]+)/i,
        facebook: /\bFB(?:AV|_IAB)[/:]([^;\] ]+)/i,
        instagram: /Instagram[ /]([\d.]+)/i,
        electron: /Electron\/([\d.]+)/i,
        curl: /curl\/([\d.]+)/i,
        wget: /Wget\/([\d.]+)/i,
        postman: /PostmanRuntime\/([\d.]+)/i,
        webkit: /AppleWebKit\/([\d.]+)/i,
        gecko: /Gecko\/([\d.]+)/i,
        trident: /Trident\/([\d.]+)/i,
        presto: /Presto\/([\d.]+)/i,
    },
    device: {
        mobile: /\b(?:Mobi|Mobile|IEMobile)\b/i,
        tablet: /\b(?:Tablet|iPad|Nexus (?:7|9|10)|SM-T\w+|KF[A-Z0-9]+)\b/i,
        smartTV:
            /\b(?:SmartTV|SMART-TV|HbbTV|NetCast|Tizen.+TV|Web0S|webOS.TV|AppleTV|GoogleTV|Roku)\b/i,
        console: /\b(?:PlayStation|Xbox|Nintendo)\b/i,
        wearable: /\b(?:Watch|Wear OS)\b/i,
        embedded: /\b(?:Kindle|Silk|CrKey)\b/i,
        androidModel:
            /Android(?: [^;()]+)?;\s*(?:[a-z]{2}(?:-[A-Z]{2})?;\s*)?([^;)]+?)(?:\s+Build\/[\w.-]+)?[;)]/i,
    },
} as const;

export const MAX_USER_AGENT_LENGTH = 8_192;
