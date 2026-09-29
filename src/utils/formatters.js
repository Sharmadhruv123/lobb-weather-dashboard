/**
 * Format temperature with degree symbol.
 * @param {number|null|undefined} celsius
 * @returns {string}
 */
export function formatTemperature(celsius) {
  if (celsius == null || Number.isNaN(celsius)) return '—'
  return `${Math.round(celsius)}°C`
}

/**
 * Human-readable last-updated time, e.g. "Updated 2:45 PM".
 * @param {string|null|undefined} isoString
 * @returns {string}
 */
export function formatLastUpdated(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return ''

  const time = date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
  return `Updated ${time}`
}

/**
 * Short day label for forecast cards, e.g. "Mon".
 * @param {string} isoDate — YYYY-MM-DD
 * @returns {string}
 */
export function formatForecastDate(isoDate) {
  if (!isoDate) return ''
  const date = new Date(`${isoDate}T12:00:00`)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString(undefined, { weekday: 'short' })
}

/**
 * Full date for forecast card subtitle, e.g. "Feb 3".
 * @param {string} isoDate
 * @returns {string}
 */
export function formatForecastSubtitle(isoDate) {
  if (!isoDate) return ''
  const date = new Date(`${isoDate}T12:00:00`)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

/**
 * Check if a forecast date is today.
 * @param {string} isoDate
 * @returns {boolean}
 */
export function isToday(isoDate) {
  if (!isoDate) return false
  const today = new Date()
  const date = new Date(`${isoDate}T12:00:00`)
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}
