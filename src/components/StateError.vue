<script setup>
defineProps({
  message: { type: String, default: "Couldn't find that city. Check the spelling and try again." },
})
</script>

<template>
  <div class="state-error" role="alert">
    <div class="state-error__card">
      <div class="state-error__icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5" opacity="0.6" />
          <line x1="24" y1="14" x2="24" y2="26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="24" cy="32" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <p class="state-error__message">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.state-error {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.state-error__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2.25rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(245, 166, 35, 0.35);
  border-radius: var(--radius-lg);
  text-align: center;
  max-width: 26rem;
  box-shadow: var(--glass-shadow);
}

.state-error__icon {
  width: 2.75rem;
  height: 2.75rem;
  color: var(--accent-sun);
}

.state-error__message {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--cloud-white);
  margin: 0;
  line-height: 1.55;
}
</style>
