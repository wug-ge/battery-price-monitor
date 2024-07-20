<template>
  <header class="bg-primary flex mt-4">
    <div class="container bg-accent-1 rounded-xl p-4">
      <div class="flex">
        <div class="rounded-xl bg-primary w-72 h-64 self-center">
          <logo />
        </div>
        <div>
          <div class="text-primary pl-4">
            <h1 class="text-primary text-6xl max-w-3xl font-thin">
              Compare 18650 batteries<br />
              Find the best for your project
            </h1>
            <br />
            <h2 class="max-w-3xl">
              Track and compare 18650 batteries to find the best deals.
              <br />
              18650 Batteries are the most common lithium-ion battery type used
              in<br />
              consumer electronics. They are popular because of their high
              energy<br />
              density, low self-discharge, and low maintenance. While 21700
              batteries are becoming more popular, 18650 batteries<br />
              are still widely used in laptops, power tools, and electric
              vehicles.
            </h2>
            <br />
            <br />
            <br />
            <div class="text-3xl absolute bottom-4 flex">
              <div class="rounded-lg leading-6">
                100+
                <div class="text-lg font-light">Batteries tracked</div>
              </div>
              <div class="rounded-lg ml-4">
                <div class="rounded-lg leading-6">
                  1k+
                  <div class="text-lg font-light">Price Data Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
