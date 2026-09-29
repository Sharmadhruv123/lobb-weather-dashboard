<script setup>
import WeatherIcon from './WeatherIcon.vue'
import { formatForecastDate, formatForecastSubtitle, isToday } from '../utils/formatters.js'

defineProps({
  days: { type: Array, required: true },
})

function tempBarWidth(min, max) {
  const range = Math.max(max - min, 1)
  return Math.min(100, Math.max(20, (range / 20) * 100))
}
</script>

<template>
  <section class="forecast-strip" aria-label="5-day forecast">
    <div class="forecast-strip__header">
      <h2 class="forecast-strip__title">5-Day Forecast</h2>
      <div class="forecast-strip__line" aria-hidden="true" />
    </div>
    <div class="forecast-strip__scroll">
      <article
        v-for="day in days"
        :key="day.dateIso"
        class="forecast-card"
        :class="{ 'forecast-card--today': isToday(day.dateIso) }"
      >
        <div class="forecast-card__top">
          <p class="forecast-card__day">{{ formatForecastDate(day.dateIso) }}</p>
          <p class="forecast-card__date">{{ formatForecastSubtitle(day.dateIso) }}</p>
        </div>
        <div class="forecast-card__icon">
          <WeatherIcon :condition="day.condition" size="sm" />
        </div>
        <p class="forecast-card__condition">{{ day.condition }}</p>
        <div class="forecast-card__temps">
          <span class="forecast-card__max">{{ day.maxTempC }}°</span>
          <div
            class="forecast-card__bar"
            :style="{ width: `${tempBarWidth(day.minTempC, day.maxTempC)}%` }"
            aria-hidden="true"
          />
          <span class="forecast-card__min">{{ day.minTempC }}°</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.forecast-strip {
  margin-top: 1.75rem;
}

.forecast-strip__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0 0.25rem;
}

.forecast-strip__title {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--cloud-white);
  opacity: 0.75;
  margin: 0;
  white-space: nowrap;
}

.forecast-strip__line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.25), transparent);
}

.forecast-strip__scroll {
  display: flex;
  gap: 0.85rem;
  overflow-x: auto;
  padding: 0.25rem 0.25rem 0.75rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.forecast-strip__scroll::-webkit-scrollbar {
  height: 4px;
}

.forecast-strip__scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
}

.forecast-card {
  flex: 0 0 auto;
  width: 8.25rem;
  scroll-snap-align: start;
  background: var(--glass-bg);
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 1.1rem 0.85rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
}

.forecast-card:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14);
}

.forecast-card--today {
  background: rgba(255, 255, 255, 0.22);
  border-color: rgba(245, 166, 35, 0.45);
  box-shadow:
    0 4px 20px rgba(15, 23, 42, 0.1),
    0 0 0 1px rgba(245, 166, 35, 0.15);
}

.forecast-card__top {
  width: 100%;
}

.forecast-card__day {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--cloud-white);
  margin: 0;
}

.forecast-card__date {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--cloud-white);
  opacity: 0.55;
  margin: 0.1rem 0 0;
}

.forecast-card__icon {
  padding: 0.35rem 0;
}

.forecast-card__condition {
  font-family: var(--font-body);
  font-size: 0.68rem;
  color: var(--cloud-white);
  opacity: 0.7;
  margin: 0;
  line-height: 1.3;
  min-height: 2.6em;
  display: flex;
  align-items: center;
}

.forecast-card__temps {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  width: 100%;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--cloud-white);
  margin-top: 0.15rem;
}

.forecast-card__max {
  font-weight: 600;
  min-width: 1.75rem;
  text-align: right;
}

.forecast-card__min {
  opacity: 0.55;
  min-width: 1.75rem;
  text-align: left;
}

.forecast-card__bar {
  flex: 1;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.35), rgba(245, 166, 35, 0.7));
  min-width: 1.5rem;
}

@media (prefers-reduced-motion: reduce) {
  .forecast-card:hover {
    transform: none;
  }
}
</style>
