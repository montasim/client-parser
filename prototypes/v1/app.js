const installCommands = {
  npm: 'npm install client-parser',
  pnpm: 'pnpm add client-parser',
  yarn: 'yarn add client-parser',
  bun: 'bun add client-parser',
}

const samples = {
  chrome:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  iphone:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.54 Mobile/15E148 Safari/604.1',
  ipad: 'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  bot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
}

function copyText(text, button) {
  const write = navigator.clipboard?.writeText
    ? navigator.clipboard.writeText(text)
    : new Promise((resolve, reject) => {
        const helper = document.createElement('textarea')
        helper.value = text
        helper.style.position = 'fixed'
        helper.style.opacity = '0'
        document.body.appendChild(helper)
        helper.select()
        const copied = document.execCommand('copy')
        helper.remove()
        copied ? resolve() : reject(new Error('Copy failed'))
      })

  write
    .then(() => {
      const label = button.querySelector('[data-copy-label]') || button
      const original = label.textContent
      label.textContent = 'Copied'
      button.classList.add('copied')
      window.setTimeout(() => {
        label.textContent = original
        button.classList.remove('copied')
      }, 1600)
    })
    .catch(() => {})
}

document.querySelectorAll('[data-install-widget]').forEach((widget) => {
  const command = widget.querySelector('[data-install-command]')
  widget.querySelectorAll('[data-manager]').forEach((tab) => {
    tab.addEventListener('click', () => {
      widget
        .querySelectorAll('[data-manager]')
        .forEach((item) => item.setAttribute('aria-selected', 'false'))
      tab.setAttribute('aria-selected', 'true')
      command.textContent = installCommands[tab.dataset.manager]
    })
  })
  widget
    .querySelector('[data-copy-install]')
    ?.addEventListener('click', (event) => copyText(command.textContent, event.currentTarget))
})

function classify(userAgent) {
  const ua = userAgent.trim()
  const bot = /bot|crawler|spider|slurp/i.test(ua)
  const mobile = /iPhone|Android.+Mobile|Mobile/i.test(ua)
  const tablet = /iPad|Tablet|Android(?!.*Mobile)/i.test(ua)
  const windows = /Windows NT/i.test(ua)
  const ios = /iPhone|iPad|CPU OS/i.test(ua)
  const android = /Android/i.test(ua)
  const firefox = ua.match(/Firefox\/(\d+(?:\.\d+)*)/i)
  const edge = ua.match(/Edg\/(\d+(?:\.\d+)*)/i)
  const chrome = ua.match(/(?:Chrome|CriOS)\/(\d+(?:\.\d+)*)/i)
  const safari = ua.match(/Version\/(\d+(?:\.\d+)*).*Safari/i)
  const osVersion = ios
    ? ua.match(/(?:OS|iPhone OS) (\d+(?:_\d+)*)/i)?.[1]?.replaceAll('_', '.')
    : undefined
  const browser = bot
    ? {
        name: /googlebot/i.test(ua) ? 'Googlebot' : 'Unknown bot',
        version: ua.match(/(?:bot|crawler)\/(\d+(?:\.\d+)*)/i)?.[1],
      }
    : edge
      ? { name: 'Edge', version: edge[1], major: edge[1].split('.')[0] }
      : firefox
        ? { name: 'Firefox', version: firefox[1], major: firefox[1].split('.')[0] }
        : chrome
          ? { name: 'Chrome', version: chrome[1], major: chrome[1].split('.')[0] }
          : safari
            ? { name: 'Safari', version: safari[1], major: safari[1].split('.')[0] }
            : { name: 'Unknown' }

  const result = {
    userAgent: ua || undefined,
    device: {
      type: bot ? 'unknown' : mobile ? 'mobile' : tablet ? 'tablet' : ua ? 'desktop' : 'unknown',
    },
    browser,
    os: ios
      ? { name: 'iOS', ...(osVersion && { version: osVersion }) }
      : android
        ? { name: 'Android' }
        : windows
          ? { name: 'Windows', architecture: /Win64|x64/i.test(ua) ? 'x64' : undefined }
          : { name: ua ? 'Unknown' : 'Unknown' },
    engine: /AppleWebKit/i.test(ua)
      ? { name: (chrome || edge) && !ios ? 'Blink' : 'WebKit' }
      : /Gecko/i.test(ua)
        ? { name: 'Gecko' }
        : { name: 'Unknown' },
    bot: {
      isBot: bot,
      ...(bot && {
        name: /googlebot/i.test(ua) ? 'Googlebot' : 'Unknown bot',
        category: 'crawler',
      }),
    },
    isMobile: mobile,
    isTablet: tablet,
    source: ua ? ['user-agent'] : [],
    confidence: ua && (browser.name !== 'Unknown' || bot) ? 'high' : ua ? 'low' : 'low',
  }
  return JSON.parse(JSON.stringify(result))
}

const input = document.querySelector('#ua-input')
const output = document.querySelector('[data-json-output]')
const runtime = document.querySelector('[data-runtime]')

function renderResult() {
  if (!input || !output) return
  const start = performance.now()
  const result = classify(input.value)
  output.innerHTML = syntaxHighlight(JSON.stringify(result, null, 2))
  if (runtime) runtime.textContent = `${Math.max(performance.now() - start, 0.03).toFixed(2)} ms`
}

function syntaxHighlight(json) {
  const escaped = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped.replace(
    /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"\s*:|"(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?)/g,
    (match) => {
      let cls = 'json-number'
      if (/^"/.test(match)) cls = /:$/.test(match) ? 'json-key' : 'json-string'
      else if (/true|false/.test(match)) cls = 'json-boolean'
      else if (/null/.test(match)) cls = 'json-null'
      return `<span class="${cls}">${match}</span>`
    },
  )
}

document.querySelector('[data-parse]')?.addEventListener('click', renderResult)
document.querySelector('[data-use-current]')?.addEventListener('click', () => {
  input.value = navigator.userAgent
  renderResult()
})
document.querySelectorAll('[data-sample]').forEach((button) =>
  button.addEventListener('click', () => {
    input.value = samples[button.dataset.sample]
    renderResult()
  }),
)

document.querySelectorAll('[data-copy-code]').forEach((button) =>
  button.addEventListener('click', () => {
    const code = button.closest('.code-window, .doc-code')?.querySelector('code')?.textContent || ''
    copyText(code, button)
  }),
)

const menuButton = document.querySelector('.menu-button')
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true'
  menuButton.setAttribute('aria-expanded', String(!open))
  document.querySelector('.nav-links')?.classList.toggle('open', !open)
})

if (output) renderResult()

const sections = [...document.querySelectorAll('.doc-section, .docs-hero')]
if (sections.length) {
  const links = [...document.querySelectorAll('.docs-sidebar a, .docs-toc a')]
  const observer = new IntersectionObserver(
    (entries) => {
      const active = entries.find((entry) => entry.isIntersecting)
      if (!active) return
      links.forEach((link) => link.classList.toggle('active', link.hash === `#${active.target.id}`))
    },
    { rootMargin: '-18% 0px -72% 0px' },
  )
  sections.forEach((section) => observer.observe(section))
}
