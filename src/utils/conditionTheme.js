/**
 * Maps weather condition strings to gradient stops and accent colors.
 * Gradients are applied as CSS custom properties on the root element.
 */

const THEMES = {
  Sunny: {
    gradientTop: '#F5A623',
    gradientBottom: '#4A90D9',
    accent: '#F5A623',
    panelTint: 'rgba(245, 166, 35, 0.08)',
  },
  'Partly Cloudy': {
    gradientTop: '#8BA4C4',
    gradientBottom: '#4A90D9',
    accent: '#6FA8DC',
    panelTint: 'rgba(139, 164, 196, 0.12)',
  },
  Cloudy: {
    gradientTop: '#6B7B8D',
    gradientBottom: '#3D4F63',
    accent: '#8BA4C4',
    panelTint: 'rgba(107, 123, 141, 0.15)',
  },
  Rain: {
    gradientTop: '#5B7FA3',
    gradientBottom: '#2B3A67',
    accent: '#6FA8DC',
    panelTint: 'rgba(111, 168, 220, 0.12)',
  },
  'Light Rain': {
    gradientTop: '#6B8FAF',
    gradientBottom: '#3A4A6B',
    accent: '#6FA8DC',
    panelTint: 'rgba(111, 168, 220, 0.14)',
  },
  Thunderstorm: {
    gradientTop: '#4A5568',
    gradientBottom: '#1A2332',
    accent: '#8BA4C4',
    panelTint: 'rgba(100, 120, 150, 0.18)',
  },
  Windy: {
    gradientTop: '#5A9EA8',
    gradientBottom: '#3D5A6B',
    accent: '#7EC8C8',
    panelTint: 'rgba(90, 158, 168, 0.12)',
  },
}

const DEFAULT_THEME = THEMES['Partly Cloudy']

/**
 * @param {string|null|undefined} condition
 * @returns {{ gradientTop: string, gradientBottom: string, accent: string, panelTint: string }}
 */
export function getConditionTheme(condition) {
  if (!condition) return DEFAULT_THEME
  if (THEMES[condition]) return THEMES[condition]
  const lower = condition.toLowerCase()
  if (lower.includes('rain') || lower.includes('drizzle')) return THEMES['Light Rain']
  if (lower.includes('thunder')) return THEMES.Thunderstorm
  return DEFAULT_THEME
}

/**
 * Apply condition theme as CSS custom properties on a DOM element.
 * @param {HTMLElement|null} el
 * @param {string|null|undefined} condition
 */
export function applyConditionTheme(el, condition) {
  if (!el) return
  const theme = getConditionTheme(condition)
  el.style.setProperty('--gradient-top', theme.gradientTop)
  el.style.setProperty('--gradient-mid', theme.gradientBottom)
  el.style.setProperty('--gradient-bottom', theme.gradientBottom)
  el.style.setProperty('--accent', theme.accent)
  el.style.setProperty('--panel-tint', theme.panelTint)
}

/**
 * Normalize condition for icon lookup (case-insensitive partial match).
 * @param {string|null|undefined} condition
 * @returns {'sunny'|'cloudy'|'partly-cloudy'|'rain'|'windy'|'default'}
 */
export function normalizeCondition(condition) {
  if (!condition) return 'default'
  const lower = condition.toLowerCase()
  if (lower.includes('partly')) return 'partly-cloudy'
  if (lower.includes('sun')) return 'sunny'
  if (lower.includes('rain')) return 'rain'
  if (lower.includes('wind')) return 'windy'
  if (lower.includes('cloud')) return 'cloudy'
  return 'default'
}
