<template>
  <div class="sky-backdrop" aria-hidden="true">
    <div class="sky-backdrop__orb sky-backdrop__orb--1" />
    <div class="sky-backdrop__orb sky-backdrop__orb--2" />
    <div class="sky-backdrop__orb sky-backdrop__orb--3" />
    <div class="sky-backdrop__horizon" />
    <div class="sky-backdrop__grain" />
  </div>
</template>

<style scoped>
.sky-backdrop {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.sky-backdrop__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.45;
  animation: drift 18s ease-in-out infinite alternate;
}

.sky-backdrop__orb--1 {
  width: min(55vw, 420px);
  height: min(55vw, 420px);
  top: -8%;
  right: -5%;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
}

.sky-backdrop__orb--2 {
  width: min(45vw, 340px);
  height: min(45vw, 340px);
  bottom: 10%;
  left: -10%;
  background: radial-gradient(circle, var(--gradient-top) 0%, transparent 70%);
  animation-delay: -6s;
  animation-duration: 22s;
}

.sky-backdrop__orb--3 {
  width: min(30vw, 220px);
  height: min(30vw, 220px);
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(245, 247, 250, 0.25) 0%, transparent 70%);
  animation-delay: -12s;
  animation-duration: 26s;
  opacity: 0.3;
}

.sky-backdrop__horizon {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.12) 0%, transparent 100%);
}

.sky-backdrop__grain {
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px 128px;
}

@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(20px, -16px) scale(1.06); }
}

@media (prefers-reduced-motion: reduce) {
  .sky-backdrop__orb {
    animation: none;
  }
}
</style>
