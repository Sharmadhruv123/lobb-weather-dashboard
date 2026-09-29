<template>
  <div class="state-loading" role="status" aria-label="Loading weather data">
    <div class="state-loading__card">
      <div class="state-loading__sun" aria-hidden="true">
        <div class="state-loading__core" />
        <div class="state-loading__rays" />
      </div>
      <p class="state-loading__text">Reading the instruments…</p>
      <div class="state-loading__skeleton" aria-hidden="true">
        <div class="skeleton-block" />
        <div class="skeleton-block skeleton-block--sm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.state-loading {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
}

.state-loading__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 24rem;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--glass-shadow);
}

.state-loading__sun {
  position: relative;
  width: 3.75rem;
  height: 3.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.state-loading__core {
  width: 1.5rem;
  height: 1.5rem;
  background: var(--accent-sun);
  border-radius: 50%;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 20px rgba(245, 166, 35, 0.4);
}

.state-loading__rays {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px dashed rgba(245, 166, 35, 0.45);
  animation: spin 3s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.state-loading__text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--cloud-white);
  opacity: 0.85;
  margin: 0;
}

.state-loading__skeleton {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.skeleton-block {
  height: 0.65rem;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  animation: pulse 1.4s ease-in-out infinite;
}

.skeleton-block--sm {
  width: 55%;
  align-self: center;
}

@keyframes pulse {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.7; }
}

@media (prefers-reduced-motion: reduce) {
  .state-loading__rays,
  .skeleton-block {
    animation: none;
  }
}
</style>
