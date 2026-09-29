import { describe, it, expect } from 'vitest'
import {
  formatTemperature,
  formatLastUpdated,
  formatForecastDate,
  isToday,
} from '../src/utils/formatters.js'

describe('formatTemperature', () => {
  it('formats a valid temperature with degree symbol', () => {
    expect(formatTemperature(29)).toBe('29°C')
    expect(formatTemperature(29.6)).toBe('30°C')
  })

  it('returns em dash for null or invalid values', () => {
    expect(formatTemperature(null)).toBe('—')
    expect(formatTemperature(undefined)).toBe('—')
    expect(formatTemperature(NaN)).toBe('—')
  })
})

describe('formatLastUpdated', () => {
  it('returns a human-readable updated string', () => {
    const result = formatLastUpdated('2026-02-03T14:45:00+05:30')
    expect(result).toMatch(/^Updated \d/)
    expect(result).toContain(':')
  })

  it('returns empty string for invalid input', () => {
    expect(formatLastUpdated(null)).toBe('')
    expect(formatLastUpdated('')).toBe('')
    expect(formatLastUpdated('not-a-date')).toBe('')
  })
})

describe('formatForecastDate', () => {
  it('returns a short weekday label', () => {
    const label = formatForecastDate('2026-02-03')
    expect(label).toMatch(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/)
  })
})

describe('isToday', () => {
  it('returns true for today\'s date', () => {
    const today = new Date()
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    expect(isToday(iso)).toBe(true)
  })

  it('returns false for a different date', () => {
    expect(isToday('2020-01-01')).toBe(false)
  })
})
