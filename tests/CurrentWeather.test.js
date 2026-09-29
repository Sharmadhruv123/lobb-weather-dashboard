import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CurrentWeather from '../src/components/CurrentWeather.vue'

const mockWeather = {
  city: 'Pune',
  region: 'Maharashtra',
  country: 'IN',
  temperatureC: 26,
  currentTempC: 23,
  todayHighC: 26,
  todayLowC: 23,
  condition: 'Light Rain',
  humidityPercent: 94,
  windKmph: 19,
  precipProbability: 100,
  updatedAtIso: '2026-02-03T10:30:00+05:30',
}

describe('CurrentWeather', () => {
  it('renders weather data when provided', () => {
    const wrapper = mount(CurrentWeather, {
      props: { weather: mockWeather },
    })

    expect(wrapper.find('.current-weather__city').text()).toBe('Pune')
    expect(wrapper.find('.current-weather__region').text()).toBe('Maharashtra')
    expect(wrapper.find('.current-weather__temp').text()).toBe('26°C')
    expect(wrapper.find('.current-weather__condition').text()).toBe('Light Rain')
    expect(wrapper.text()).toContain('94%')
    expect(wrapper.text()).toContain('19 km/h')
    expect(wrapper.text()).toContain('100%')
    expect(wrapper.text()).toMatch(/Updated/)
  })

  it('shows refreshing state on the refresh button', async () => {
    const wrapper = mount(CurrentWeather, {
      props: { weather: mockWeather, isRefreshing: true },
    })

    expect(wrapper.find('.current-weather__refresh').classes()).toContain(
      'current-weather__refresh--spinning',
    )
    expect(wrapper.find('.current-weather').classes()).toContain(
      'current-weather--refreshing',
    )
  })

  it('emits refresh event when refresh button is clicked', async () => {
    const wrapper = mount(CurrentWeather, {
      props: { weather: mockWeather, isRefreshing: false },
    })

    await wrapper.find('.current-weather__refresh').trigger('click')
    expect(wrapper.emitted('refresh')).toHaveLength(1)
  })
})
