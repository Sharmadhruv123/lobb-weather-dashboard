<template>
  <div class="state-empty" role="status">
    <div class="state-empty__card">
      <div class="state-empty__icon" aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="36" stroke="currentColor" stroke-width="1" opacity="0.2" />
          <circle cx="52" cy="28" r="10" fill="currentColor" opacity="0.75" />
          <path d="M18 52 Q40 38 62 52" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.45" />
          <ellipse cx="40" cy="54" rx="22" ry="10" fill="currentColor" opacity="0.3" />
        </svg>
      </div>
      <p class="state-empty__text">Search a city to see what the sky's doing.</p>
      <p class="state-empty__hint">Try "Pune" or "London" — type "error" to preview the error state.</p>
    </div>
  </div>
</template>

<style scoped>
.state-empty {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
}

.state-empty__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem 2rem;
  text-align: center;
  max-width: 24rem;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--glass-shadow);
}

.state-empty__icon {
  width: 4.5rem;
  height: 4.5rem;
  color: var(--cloud-white);
  opacity: 0.85;
}

.state-empty__text {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--cloud-white);
  margin: 0;
  line-height: 1.35;
}

.state-empty__hint {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--cloud-white);
  opacity: 0.5;
  margin: 0;
  line-height: 1.5;
}
</style>
