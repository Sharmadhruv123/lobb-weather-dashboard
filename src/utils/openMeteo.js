import { resolveCurrentCondition, wmoToConditionLabel } from './weatherCode.js'

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

/**
 * Resolve a city name to coordinates via Open-Meteo geocoding.
 */
export async function geocodeCity(cityName) {
  const params = new URLSearchParams({
    name: cityName,
    count: '1',
    language: 'en',
    format: 'json',
  })

  const res = await fetch(`${GEO_URL}?${params}`)
  if (!res.ok) {
    throw new Error('Unable to reach the weather service. Try again in a moment.')
  }

  const data = await res.json()
  if (!data.results?.length) {
    throw new Error("Couldn't find that city. Check the spelling and try again.")
  }

  return data.results[0]
}

/**
 * Fetch current weather + 5-day daily forecast for coordinates.
 */
export async function fetchForecast(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '5',
    wind_speed_unit: 'kmh',
  })

  const res = await fetch(`${FORECAST_URL}?${params}`)
  if (!res.ok) {
    throw new Error('Unable to fetch weather data.')
  }

  return res.json()
}

/**
 * Transform Open-Meteo responses into the app's data shape.
 * Headline temperature uses today's high (matches Google Weather cards).
 */
export function mapOpenMeteoToApp(geo, data) {
  const { current, daily } = data

  const todayHighC = Math.round(daily.temperature_2m_max[0])
  const todayLowC = Math.round(daily.temperature_2m_min[0])
  const currentTempC = Math.round(current.temperature_2m)
  const precipProb = Math.round(daily.precipitation_probability_max?.[0] ?? 0)

  const condition = resolveCurrentCondition({
    currentCode: current.weather_code,
    dailyCode: daily.weather_code[0],
    precipProb,
    precipitation: current.precipitation ?? 0,
    windKmph: current.wind_speed_10m,
  })

  const currentWeather = {
    city: geo.name,
    region: geo.admin1 || geo.country || geo.country_code,
    country: geo.country_code,
    temperatureC: currentTempC,
    currentTempC,
    todayHighC,
    todayLowC,
    condition,
    humidityPercent: Math.round(current.relative_humidity_2m),
    windKmph: Math.round(current.wind_speed_10m),
    precipProbability: precipProb,
    updatedAtIso: new Date().toISOString(),
  }

  const days = daily.time.slice(0, 5).map((dateIso, i) => ({
    dateIso,
    minTempC: Math.round(daily.temperature_2m_min[i]),
    maxTempC: Math.round(daily.temperature_2m_max[i]),
    condition: wmoToConditionLabel(daily.weather_code[i]),
  }))

  const forecast = {
    city: geo.name,
    country: geo.country_code,
    days,
  }

  return { currentWeather, forecast }
}

/**
 * Full pipeline: geocode city → fetch live forecast → map to app model.
 */
export async function fetchWeatherForCity(cityName) {
  const geo = await geocodeCity(cityName)
  const data = await fetchForecast(geo.latitude, geo.longitude)
  return mapOpenMeteoToApp(geo, data)
}
