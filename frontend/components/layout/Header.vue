<template>
  <header class="bg-primary flex mt-4">
    <div class="container bg-accent-1 rounded-xl p-4 m-2 md:m-0">
      <div class="md:flex">
        <div class="hidden md:inline-block rounded-xl bg-primary w-72 h-64 self-center text-center">
          <logo />
        </div>
        <div>
          <div class="text-primary md:pl-4">
            <h1 class="text-primary text-4xl md:text-6xl max-w-3xl font-thin">
              Compare and find the best batteries for your project
            </h1>
            <br />
            <h2 class="max-w-3xl">
              Track and compare over 200 batteries to find the best deals. Our
              data updates hourly for the most accurate prices.
              <br />
              Whether building
              a battery pack or exploring trends, access our free statistics to
              compare energy density, price per Wh, and more.
            </h2>
            <br />
            <br />
            <br />
            <div class="text-3xl absolute bottom-4 flex">
              <div class="rounded-lg leading-6">
                200+
                <div class="text-lg font-light">Batteries tracked</div>
              </div>
              <div class="rounded-lg ml-4">
                <div class="rounded-lg leading-6">
                  10k+
                  <div class="text-lg font-light">Price Data Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div></div>
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
