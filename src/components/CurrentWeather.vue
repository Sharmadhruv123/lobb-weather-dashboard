<script setup>
import WeatherIcon from './WeatherIcon.vue'
import { formatTemperature, formatLastUpdated } from '../utils/formatters.js'

defineProps({
  weather: { type: Object, required: true },
  isRefreshing: { type: Boolean, default: false },
})

defineEmits(['refresh'])
</script>

<template>
  <section class="current-weather" :class="{ 'current-weather--refreshing': isRefreshing }" aria-live="polite">
    <div class="current-weather__accent" aria-hidden="true" />

    <div class="current-weather__header">
      <div class="current-weather__location">
        <h1 class="current-weather__city">{{ weather.city }}</h1>
        <p class="current-weather__region">{{ weather.region }}</p>
      </div>
      <button
        type="button"
        class="current-weather__refresh"
        :class="{ 'current-weather__refresh--spinning': isRefreshing }"
        aria-label="Refresh weather data"
        :disabled="isRefreshing"
        @click="$emit('refresh')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M21 12a9 9 0 1 1-2.64-6.36"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <polyline
            points="21 3 21 9 15 9"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="current-weather__hero">
      <div class="current-weather__temp-block">
        <div class="current-weather__temp-ring" aria-hidden="true">
          <p class="current-weather__temp" aria-label="Today's high temperature">
            {{ formatTemperature(weather.temperatureC) }}
          </p>
        </div>
        <div v-if="weather.todayHighC != null && weather.todayLowC != null" class="current-weather__range">
          <span class="range-chip">H {{ weather.todayHighC }}°</span>
          <span class="range-chip range-chip--muted">L {{ weather.todayLowC }}°</span>
        </div>
        <p v-if="weather.currentTempC != null && weather.currentTempC !== weather.temperatureC" class="current-weather__now">
          Now {{ formatTemperature(weather.currentTempC) }}
        </p>
        <p class="current-weather__condition">{{ weather.condition }}</p>
      </div>

      <div class="current-weather__icon-wrap">
        <WeatherIcon :condition="weather.condition" size="lg" />
      </div>
    </div>

    <div class="current-weather__readouts">
      <div class="readout-card">
        <span class="readout-card__label">Humidity</span>
        <span class="readout-card__value">{{ weather.humidityPercent }}<small>%</small></span>
      </div>
      <div class="readout-card">
        <span class="readout-card__label">Wind</span>
        <span class="readout-card__value">{{ weather.windKmph }}<small> km/h</small></span>
      </div>
      <div v-if="weather.precipProbability != null" class="readout-card">
        <span class="readout-card__label">Precip</span>
        <span class="readout-card__value">{{ weather.precipProbability }}<small>%</small></span>
      </div>
    </div>

    <p class="current-weather__updated">{{ formatLastUpdated(weather.updatedAtIso) }}</p>
  </section>
</template>

<style scoped>
.current-weather {
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.92) 0%,
    rgba(255, 255, 255, 0.78) 100%
  );
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: var(--radius-lg);
  padding: 1.75rem 2rem 1.5rem;
  box-shadow:
    var(--glass-shadow),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.current-weather--refreshing {
  opacity: 0.82;
}

.current-weather__accent {
  position: absolute;
  top: 0;
  left: 1.5rem;
  right: 1.5rem;
  height: 3px;
  border-radius: 0 0 4px 4px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.85;
}

.current-weather__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-top: 0.25rem;
}

.current-weather__city {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 4.5vw, 2.5rem);
  font-weight: 400;
  color: var(--ink);
  line-height: 1.05;
  margin: 0;
  letter-spacing: -0.02em;
}

.current-weather__region {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--ink);
  opacity: 0.5;
  margin: 0.35rem 0 0;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.current-weather__refresh {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid rgba(28, 36, 48, 0.1);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  color: var(--ink);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(28, 36, 48, 0.06);
}

.current-weather__refresh svg {
  width: 1.1rem;
  height: 1.1rem;
}

.current-weather__refresh:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(28, 36, 48, 0.2);
  transform: rotate(-30deg);
}

.current-weather__refresh:focus-visible {
  outline: 2px solid var(--accent-sun);
  outline-offset: 2px;
}

.current-weather__refresh--spinning svg {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.current-weather__hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.current-weather__temp-ring {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

.current-weather__temp-ring::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(
    from 200deg,
    var(--accent) 0deg,
    rgba(255, 255, 255, 0.1) 120deg,
    var(--accent-sun) 220deg,
    rgba(255, 255, 255, 0.1) 320deg
  );
  opacity: 0.35;
  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
}

.current-weather__temp {
  font-family: var(--font-display);
  font-size: clamp(4.25rem, 13vw, 5.75rem);
  font-weight: 400;
  color: var(--ink);
  line-height: 1;
  margin: 0;
  letter-spacing: -0.03em;
}

.current-weather__range {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.65rem;
}

.range-chip {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  padding: 0.25rem 0.55rem;
  border-radius: var(--radius-pill);
  background: rgba(28, 36, 48, 0.06);
  color: var(--ink);
  letter-spacing: 0.02em;
}

.range-chip--muted {
  opacity: 0.55;
}

.current-weather__now {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--ink);
  opacity: 0.45;
  margin: 0.5rem 0 0;
}

.current-weather__condition {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--ink);
  opacity: 0.7;
  margin: 0.45rem 0 0;
}

.current-weather__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--panel-tint), rgba(255, 255, 255, 0.4));
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    0 8px 24px rgba(28, 36, 48, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  flex-shrink: 0;
}

.current-weather__readouts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
  margin-bottom: 0.85rem;
}

.readout-card {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.75rem 0.65rem;
  border-radius: var(--radius-md);
  background: rgba(28, 36, 48, 0.04);
  border: 1px solid rgba(28, 36, 48, 0.06);
  text-align: center;
}

.readout-card__label {
  font-family: var(--font-body);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink);
  opacity: 0.45;
}

.readout-card__value {
  font-family: var(--font-mono);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--ink);
}

.readout-card__value small {
  font-size: 0.7rem;
  font-weight: 400;
  opacity: 0.55;
}

.current-weather__updated {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--ink);
  opacity: 0.38;
  margin: 0;
  text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .current-weather__refresh--spinning svg {
    animation: none;
  }

  .current-weather__refresh:hover:not(:disabled) {
    transform: none;
  }
}

@media (max-width: 520px) {
  .current-weather {
    padding: 1.35rem 1.25rem 1.25rem;
  }

  .current-weather__hero {
    align-items: flex-end;
  }

  .current-weather__icon-wrap {
    width: 5.5rem;
    height: 5.5rem;
  }

  .current-weather__readouts {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .readout-card {
    padding: 0.6rem 0.4rem;
  }

  .readout-card__value {
    font-size: 0.9rem;
  }
}
</style>
