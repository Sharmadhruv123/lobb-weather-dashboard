<script setup>
import { ref, watch, onMounted } from 'vue'
import SkyBackdrop from './components/SkyBackdrop.vue'
import SearchBar from './components/SearchBar.vue'
import CurrentWeather from './components/CurrentWeather.vue'
import ForecastStrip from './components/ForecastStrip.vue'
import StateEmpty from './components/StateEmpty.vue'
import StateLoading from './components/StateLoading.vue'
import StateError from './components/StateError.vue'
import { useWeather } from './composables/useWeather.js'
import { applyConditionTheme } from './utils/conditionTheme.js'

const searchInput = ref('')
const isRefreshing = ref(false)

const {
  city,
  currentWeather,
  forecast,
  isLoading,
  error,
  fetchWeather,
  refresh,
} = useWeather()

watch(
  () => currentWeather.value?.condition,
  (condition) => {
    applyConditionTheme(document.documentElement, condition)
  },
)

onMounted(() => {
  applyConditionTheme(document.documentElement, null)
})

async function handleSearch() {
  if (!searchInput.value.trim()) return
  await fetchWeather(searchInput.value)
}

async function handleRefresh() {
  if (!city.value || isRefreshing.value) return
  isRefreshing.value = true
  try {
    await refresh()
  } finally {
    isRefreshing.value = false
  }
}

const showEmpty = () => !isLoading.value && !error.value && !currentWeather.value
const showLoading = () => isLoading.value && !currentWeather.value
const showError = () => !isLoading.value && !!error.value
const showWeather = () => !!currentWeather.value
</script>

<template>
  <div class="app">
    <SkyBackdrop />
    <header class="app__header">
      <div class="app__brand">
        <div class="app__brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="1.5" opacity="0.4" />
            <circle cx="22" cy="12" r="5" fill="currentColor" opacity="0.85" />
            <path d="M6 22 Q16 16 26 22" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div class="app__brand-text">
          <p class="app__brand-title">Weather Dashboard</p>
          <p class="app__brand-sub">Sky &amp; Instrument</p>
        </div>
      </div>
      <SearchBar
        v-model="searchInput"
        :is-loading="isLoading"
        @search="handleSearch"
      />
    </header>

    <main class="app__main">
      <StateEmpty v-if="showEmpty()" />
      <StateLoading v-else-if="showLoading()" />
      <StateError v-else-if="showError()" :message="error" />

      <div v-else-if="showWeather()" class="app__content">
        <CurrentWeather
          :weather="currentWeather"
          :is-refreshing="isRefreshing"
          @refresh="handleRefresh"
        />
        <ForecastStrip
          v-if="forecast?.days?.length"
          :days="forecast.days"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1.75rem 1.25rem 3rem;
  position: relative;
  z-index: 1;
}

.app__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  margin-bottom: 2rem;
}

.app__brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.app__brand-mark {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--cloud-white);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
}

.app__brand-mark svg {
  width: 100%;
  height: 100%;
}

.app__brand-text {
  text-align: left;
}

.app__brand-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--cloud-white);
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.app__brand-sub {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--cloud-white);
  opacity: 0.55;
  margin: 0.2rem 0 0;
}

.app__main {
  flex: 1;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
}

.app__content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  animation: content-enter 0.5s ease both;
}

@keyframes content-enter {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app__content {
    animation: none;
  }
}

@media (min-width: 640px) {
  .app {
    padding: 2.5rem 2rem 4rem;
  }

  .app__header {
    margin-bottom: 2.75rem;
  }
}
</style>
