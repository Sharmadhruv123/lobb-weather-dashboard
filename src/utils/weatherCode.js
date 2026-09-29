/**
 * Map WMO weather interpretation codes to human-readable labels.
 * @see https://open-meteo.com/en/docs#weathervariables
 */
export function wmoToConditionLabel(code, windKmph = 0) {
  const lightRain = [51, 53, 55, 56, 57, 61]
  const rain = [63, 65, 66, 67, 80, 81, 82]
  const storm = [95, 96, 99]

  if (storm.includes(code)) return 'Thunderstorm'
  if (lightRain.includes(code)) return 'Light Rain'
  if (rain.includes(code)) return 'Rain'
  if (windKmph >= 30 && code <= 3) return 'Windy'
  if (code === 0) return 'Sunny'
  if (code === 1 || code === 2) return 'Partly Cloudy'
  if (code === 3 || code === 45 || code === 48) return 'Cloudy'
  if (code >= 71 && code <= 77) return 'Cloudy'

  return 'Partly Cloudy'
}

/** @deprecated Use wmoToConditionLabel — kept for tests/back-compat */
export function wmoToCondition(code, windKmph = 0) {
  const label = wmoToConditionLabel(code, windKmph)
  if (label === 'Light Rain' || label === 'Thunderstorm') return 'Rain'
  return label
}

const RAIN_CODES = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]

/**
 * Pick the best current condition label — mirrors how Google Weather
 * shows "Light rain" on rainy days even when the instant snapshot is overcast.
 */
export function resolveCurrentCondition({
  currentCode,
  dailyCode,
  precipProb = 0,
  precipitation = 0,
  windKmph = 0,
}) {
  if (precipitation > 0) {
    return wmoToConditionLabel(currentCode, windKmph)
  }

  if (precipProb >= 40 && RAIN_CODES.includes(dailyCode)) {
    return wmoToConditionLabel(dailyCode, windKmph)
  }

  return wmoToConditionLabel(currentCode, windKmph)
}
