<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  isLoading: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'search'])

function onInput(e) {
  emit('update:modelValue', e.target.value)
}

function onSubmit() {
  emit('search')
}
</script>

<template>
  <form class="search-bar" @submit.prevent="onSubmit" role="search">
    <label for="city-search" class="visually-hidden">Search for a city</label>
    <div class="search-bar__inner">
      <svg class="search-bar__icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <input
        id="city-search"
        type="search"
        class="search-bar__input"
        placeholder="Search for a city…"
        :value="modelValue"
        :disabled="isLoading"
        autocomplete="off"
        @input="onInput"
        @keydown.enter.prevent="onSubmit"
      />
      <button
        type="submit"
        class="search-bar__btn"
        :disabled="isLoading || !modelValue.trim()"
        aria-label="Search weather"
      >
        <span v-if="isLoading" class="search-bar__spinner" aria-hidden="true" />
        <svg v-else viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </form>
</template>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
}

.search-bar__inner {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.4rem 0.4rem 0.4rem 1.15rem;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(16px) saturate(1.3);
  -webkit-backdrop-filter: blur(16px) saturate(1.3);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-pill);
  box-shadow:
    0 8px 32px rgba(15, 23, 42, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.search-bar__inner:focus-within {
  background: rgba(255, 255, 255, 0.28);
  border-color: rgba(255, 255, 255, 0.45);
  box-shadow:
    0 8px 32px rgba(15, 23, 42, 0.16),
    0 0 0 3px rgba(245, 166, 35, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
  outline: none;
}

.search-bar__icon {
  width: 1.15rem;
  height: 1.15rem;
  color: var(--cloud-white);
  opacity: 0.65;
  flex-shrink: 0;
}

.search-bar__input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: 1.02rem;
  color: var(--cloud-white);
  outline: none;
  min-width: 0;
}

.search-bar__input::placeholder {
  color: var(--cloud-white);
  opacity: 0.5;
}

.search-bar__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 50%;
  background: var(--cloud-white);
  color: var(--ink);
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

.search-bar__btn svg {
  width: 1.15rem;
  height: 1.15rem;
}

.search-bar__btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.2);
}

.search-bar__btn:active:not(:disabled) {
  transform: scale(0.97);
}

.search-bar__btn:focus-visible {
  outline: 2px solid var(--accent-sun);
  outline-offset: 2px;
}

.search-bar__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.search-bar__spinner {
  width: 1.05rem;
  height: 1.05rem;
  border: 2px solid rgba(28, 36, 48, 0.15);
  border-top-color: var(--ink);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .search-bar__spinner {
    animation: none;
    border-top-color: var(--ink);
  }

  .search-bar__btn:hover:not(:disabled) {
    transform: none;
  }
}
</style>
