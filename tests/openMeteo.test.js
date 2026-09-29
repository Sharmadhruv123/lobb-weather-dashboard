import { describe, it, expect } from 'vitest'
import { mapOpenMeteoToApp } from '../src/utils/openMeteo.js'

const geo = {
  name: 'Pune',
  country_code: 'IN',
  admin1: 'Maharashtra',
  country: 'India',
  latitude: 18.52,
  longitude: 73.86,
}

const forecastData = {
  current: {
    temperature_2m: 23.3,
    relative_humidity_2m: 94,
    wind_speed_10m: 19.0,
    weather_code: 3,
    precipitation: 0,
    time: '2026-07-30T21:45',
  },
  daily: {
    time: ['2026-07-30', '2026-07-31', '2026-08-01', '2026-08-02', '2026-08-03'],
    weather_code: [61, 80, 53, 55, 51],
    temperature_2m_max: [26.1, 25.2, 26.8, 26.7, 26.8],
    temperature_2m_min: [23.2, 22.6, 23.2, 23.1, 22.6],
    precipitation_probability_max: [100, 100, 100, 100, 94],
  },
}

describe('mapOpenMeteoToApp', () => {
  it('maps Pune-like data to match Google-style headline values', () => {
    const { currentWeather, forecast } = mapOpenMeteoToApp(geo, forecastData)

    expect(currentWeather.city).toBe('Pune')
    expect(currentWeather.region).toBe('Maharashtra')
    expect(currentWeather.temperatureC).toBe(26)
    expect(currentWeather.currentTempC).toBe(23)
    expect(currentWeather.humidityPercent).toBe(94)
    expect(currentWeather.windKmph).toBe(19)
    expect(currentWeather.precipProbability).toBe(100)
    expect(currentWeather.condition).toBe('Light Rain')
  })

  it('maps five forecast days with readable conditions', () => {
    const { forecast } = mapOpenMeteoToApp(geo, forecastData)

    expect(forecast.days).toHaveLength(5)
    expect(forecast.days[0].maxTempC).toBe(26)
    expect(forecast.days[2].condition).toBe('Light Rain')
  })
})
