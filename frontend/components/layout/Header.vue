<template>
  <header class="bg-primary flex justify-centerasdf/assets/logo.svg" alt="BPM Logo" class="w-32" />
      <h1 class="text-accent-2 text-5xl md:text-6xl text-center pb-32 pt-32">
        Battery Price Monitor
      </h1>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: relative;
  z-index: 30;
  h1 {
    position: relative;
    z-index: 75;
  }
  canvas {
    position: absolute;
    z-index: 50;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
