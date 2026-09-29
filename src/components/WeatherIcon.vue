<script setup>
import { computed } from 'vue'
import { normalizeCondition } from '../utils/conditionTheme.js'

const props = defineProps({
  condition: { type: String, default: '' },
  size: { type: String, default: 'lg' }, // 'sm' | 'lg'
})

const variant = computed(() => normalizeCondition(props.condition))
</script>

<template>
  <div
    class="weather-icon"
    :class="[`weather-icon--${variant}`, `weather-icon--${size}`]"
    :aria-label="condition || 'Weather condition'"
    role="img"
  >
    <!-- Sunny -->
    <div v-if="variant === 'sunny'" class="icon-sunny">
      <div class="icon-sunny__rays" aria-hidden="true" />
      <div class="icon-sunny__core" aria-hidden="true" />
    </div>

    <!-- Partly Cloudy -->
    <div v-else-if="variant === 'partly-cloudy'" class="icon-partly">
      <div class="icon-partly__sun" aria-hidden="true" />
      <div class="icon-partly__cloud" aria-hidden="true" />
    </div>

    <!-- Cloudy -->
    <div v-else-if="variant === 'cloudy'" class="icon-cloudy">
      <div class="icon-cloudy__cloud icon-cloudy__cloud--back" aria-hidden="true" />
      <div class="icon-cloudy__cloud icon-cloudy__cloud--front" aria-hidden="true" />
    </div>

    <!-- Rain -->
    <div v-else-if="variant === 'rain'" class="icon-rain">
      <div class="icon-rain__cloud" aria-hidden="true" />
      <div class="icon-rain__drops" aria-hidden="true">
        <span /><span /><span />
      </div>
    </div>

    <!-- Windy -->
    <div v-else-if="variant === 'windy'" class="icon-windy">
      <div class="icon-windy__line icon-windy__line--1" aria-hidden="true" />
      <div class="icon-windy__line icon-windy__line--2" aria-hidden="true" />
      <div class="icon-windy__line icon-windy__line--3" aria-hidden="true" />
    </div>

    <!-- Default -->
    <div v-else class="icon-default" aria-hidden="true">
      <div class="icon-default__circle" />
    </div>
  </div>
</template>

<style scoped>
.weather-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-icon--lg {
  width: 5.5rem;
  height: 5.5rem;
}

.weather-icon--sm {
  width: 2.5rem;
  height: 2.5rem;
}

/* Sunny */
.icon-sunny {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-sunny__core {
  width: 38%;
  height: 38%;
  background: var(--accent-sun);
  border-radius: 50%;
  position: relative;
  z-index: 1;
}

.icon-sunny__rays {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg 30deg,
    var(--accent-sun) 30deg 45deg,
    transparent 45deg 75deg,
    var(--accent-sun) 75deg 90deg,
    transparent 90deg 120deg,
    var(--accent-sun) 120deg 135deg,
    transparent 135deg 165deg,
    var(--accent-sun) 165deg 180deg,
    transparent 180deg 210deg,
    var(--accent-sun) 210deg 225deg,
    transparent 225deg 255deg,
    var(--accent-sun) 255deg 270deg,
    transparent 270deg 300deg,
    var(--accent-sun) 300deg 315deg,
    transparent 315deg 345deg,
    var(--accent-sun) 345deg 360deg
  );
  opacity: 0.85;
  animation: rotate-rays 24s linear infinite;
}

@keyframes rotate-rays {
  to { transform: rotate(360deg); }
}

/* Partly Cloudy */
.icon-partly {
  position: relative;
  width: 100%;
  height: 100%;
}

.icon-partly__sun {
  position: absolute;
  top: 8%;
  right: 8%;
  width: 45%;
  height: 45%;
  background: var(--accent-sun);
  border-radius: 50%;
  animation: rotate-rays 30s linear infinite;
}

.icon-partly__cloud {
  position: absolute;
  bottom: 10%;
  left: 5%;
  width: 75%;
  height: 45%;
  background: var(--cloud-white);
  border-radius: 999px;
  box-shadow: -12px 0 0 -2px rgba(245, 247, 250, 0.7);
  animation: drift 8s ease-in-out infinite alternate;
}

@keyframes drift {
  from { transform: translateX(-3px); }
  to { transform: translateX(3px); }
}

/* Cloudy */
.icon-cloudy {
  position: relative;
  width: 100%;
  height: 100%;
}

.icon-cloudy__cloud {
  position: absolute;
  border-radius: 999px;
  background: var(--cloud-white);
}

.icon-cloudy__cloud--back {
  top: 20%;
  left: 5%;
  width: 70%;
  height: 40%;
  opacity: 0.7;
}

.icon-cloudy__cloud--front {
  bottom: 15%;
  right: 5%;
  width: 80%;
  height: 45%;
  box-shadow: -14px 0 0 -3px rgba(245, 247, 250, 0.6);
  animation: drift 10s ease-in-out infinite alternate;
}

/* Rain */
.icon-rain {
  position: relative;
  width: 100%;
  height: 100%;
}

.icon-rain__cloud {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 42%;
  background: var(--cloud-white);
  border-radius: 999px;
  box-shadow: -12px 0 0 -2px rgba(245, 247, 250, 0.65);
}

.icon-rain__drops {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.35rem;
}

.icon-rain__drops span {
  display: block;
  width: 2px;
  height: 0.65rem;
  background: var(--rain-blue);
  border-radius: 2px;
  animation: fall 1.2s ease-in infinite;
}

.icon-rain__drops span:nth-child(2) { animation-delay: 0.3s; }
.icon-rain__drops span:nth-child(3) { animation-delay: 0.6s; }

@keyframes fall {
  0% { opacity: 0; transform: translateY(-4px); }
  30% { opacity: 1; }
  100% { opacity: 0; transform: translateY(8px); }
}

/* Windy */
.icon-windy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
  padding: 0 10%;
}

.icon-windy__line {
  height: 3px;
  background: var(--cloud-white);
  border-radius: 999px;
  animation: wind-sweep 2s ease-in-out infinite;
}

.icon-windy__line--1 { width: 90%; }
.icon-windy__line--2 { width: 70%; animation-delay: 0.3s; }
.icon-windy__line--3 { width: 55%; animation-delay: 0.6s; }

@keyframes wind-sweep {
  0%, 100% { transform: translateX(0); opacity: 0.7; }
  50% { transform: translateX(6px); opacity: 1; }
}

/* Default */
.icon-default {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-default__circle {
  width: 50%;
  height: 50%;
  border: 3px solid var(--cloud-white);
  border-radius: 50%;
  opacity: 0.6;
}

@media (prefers-reduced-motion: reduce) {
  .icon-sunny__rays,
  .icon-partly__sun,
  .icon-partly__cloud,
  .icon-cloudy__cloud--front,
  .icon-rain__drops span,
  .icon-windy__line {
    animation: none;
  }
}
</style>
