import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import App from '../src/App.vue'
import { fetchWeatherForCity } from '../src/utils/openMeteo.js'

vi.mock('../src/utils/openMeteo.js', () => ({
  fetchWeatherForCity: vi.fn(),
}))

const mockResult = {
  currentWeather: {
    city: 'London',
    region: 'England',
    country: 'GB',
    temperatureC: 20,
    currentTempC: 18,
    todayHighC: 20,
    todayLowC: 14,
    condition: 'Cloudy',
    humidityPercent: 72,
    windKmph: 14,
    precipProbability: 30,
    updatedAtIso: '2026-07-30T21:00:00.000Z',
  },
  forecast: {
    city: 'London',
    country: 'GB',
    days: [
      { dateIso: '2026-07-30', minTempC: 14, maxTempC: 20, condition: 'Cloudy' },
      { dateIso: '2026-07-31', minTempC: 15, maxTempC: 22, condition: 'Sunny' },
      { dateIso: '2026-08-01', minTempC: 13, maxTempC: 19, condition: 'Rain' },
      { dateIso: '2026-08-02', minTempC: 14, maxTempC: 21, condition: 'Partly Cloudy' },
      { dateIso: '2026-08-03', minTempC: 16, maxTempC: 23, condition: 'Sunny' },
    ],
  },
}

beforeEach(() => {
  vi.mocked(fetchWeatherForCity).mockReset()
})

describe('App — state rendering', () => {
  async function searchCity(wrapper, city) {
    const input = wrapper.find('.search-bar__input')
    await input.setValue(city)
    await input.trigger('input')
    await wrapper.find('.search-bar').trigger('submit')
  }

  it('shows empty state before any search', () => {
    const wrapper = mount(App)
    expect(wrapper.find('.state-empty').exists()).toBe(true)
    expect(wrapper.find('.state-loading').exists()).toBe(false)
    expect(wrapper.find('.state-error').exists()).toBe(false)
    expect(wrapper.find('.current-weather').exists()).toBe(false)
  })

  it('shows loading state while fetching', async () => {
    fetchWeatherForCity.mockReturnValue(new Promise(() => {}))

    const wrapper = mount(App)
    await searchCity(wrapper, 'London')

    expect(wrapper.find('.state-loading').exists()).toBe(true)
    expect(wrapper.find('.current-weather').exists()).toBe(false)
  })

  it('shows weather data after successful search', async () => {
    fetchWeatherForCity.mockResolvedValue(mockResult)

    const wrapper = mount(App)
    await searchCity(wrapper, 'London')
    await flushPromises()

    expect(wrapper.find('.current-weather').exists()).toBe(true)
    expect(wrapper.find('.current-weather__city').text()).toBe('London')
    expect(wrapper.find('.current-weather__temp').text()).toBe('20°C')
    expect(wrapper.find('.forecast-strip').exists()).toBe(true)
    expect(wrapper.find('.state-error').exists()).toBe(false)
  })

  it('shows error state when city is "error"', async () => {
    const wrapper = mount(App)
    await searchCity(wrapper, 'error')
    await flushPromises()

    expect(wrapper.find('.state-error').exists()).toBe(true)
    expect(wrapper.find('.state-error__message').text()).toContain("Couldn't find that city")
    expect(wrapper.find('.current-weather').exists()).toBe(false)
    expect(fetchWeatherForCity).not.toHaveBeenCalled()
  })
})
