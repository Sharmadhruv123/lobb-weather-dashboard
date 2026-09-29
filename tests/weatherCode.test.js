import { describe, it, expect } from 'vitest'
import { wmoToConditionLabel, resolveCurrentCondition } from '../src/utils/weatherCode.js'

describe('wmoToConditionLabel', () => {
  it('maps clear sky to Sunny', () => {
    expect(wmoToConditionLabel(0)).toBe('Sunny')
  })

  it('maps drizzle codes to Light Rain', () => {
    expect(wmoToConditionLabel(51)).toBe('Light Rain')
    expect(wmoToConditionLabel(53)).toBe('Light Rain')
  })

  it('maps rain codes to Rain or Light Rain', () => {
    expect(wmoToConditionLabel(61)).toBe('Light Rain')
    expect(wmoToConditionLabel(63)).toBe('Rain')
    expect(wmoToConditionLabel(95)).toBe('Thunderstorm')
  })

  it('returns Windy for high wind on clear days', () => {
    expect(wmoToConditionLabel(0, 35)).toBe('Windy')
  })
})

describe('resolveCurrentCondition', () => {
  it('uses daily rain forecast when current snapshot is overcast', () => {
    const condition = resolveCurrentCondition({
      currentCode: 3,
      dailyCode: 61,
      precipProb: 100,
      precipitation: 0,
      windKmph: 19,
    })

    expect(condition).toBe('Light Rain')
  })

  it('uses light rain label for drizzle codes on rainy days', () => {
    const condition = resolveCurrentCondition({
      currentCode: 3,
      dailyCode: 53,
      precipProb: 80,
      precipitation: 0,
    })

    expect(condition).toBe('Light Rain')
  })
})
