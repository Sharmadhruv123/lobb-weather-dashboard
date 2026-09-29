import { ref } from 'vue'
import { fetchWeatherForCity } from '../utils/openMeteo.js'

/**
 * Fetch and manage weather state using live Open-Meteo data.
 * Typing "error" as the city triggers the error state for demo/testing.
 */
export function useWeather() {
  const city = ref('')
  const currentWeather = ref(null)
  const forecast = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchWeather(searchCity) {
    const trimmed = searchCity.trim()
    if (!trimmed) return

    city.value = trimmed
    isLoading.value = true
    error.value = null

    try {
      if (trimmed.toLowerCase() === 'error') {
        throw new Error("Couldn't find that city. Check the spelling and try again.")
      }

      const { currentWeather: current, forecast: fc } = await fetchWeatherForCity(trimmed)
      currentWeather.value = current
      forecast.value = fc
    } catch (err) {
      error.value = err.message ?? 'Something went wrong. Please try again.'
      currentWeather.value = null
      forecast.value = null
    } finally {
      isLoading.value = false
    }
  }

  async function refresh() {
    if (!city.value) return
    await fetchWeather(city.value)
  }

  return {
    city,
    currentWeather,
    forecast,
    isLoading,
    error,
    fetchWeather,
    refresh,
  }
}
