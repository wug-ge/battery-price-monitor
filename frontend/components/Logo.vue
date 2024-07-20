<template>
  <svg viewBox=" -17 13 200 170" xmlns="http://www.w3.org/2000/svg">
    <!-- Back battery cell -->
    <polygon
      class="path"
      points="70,30 110,25 165,65 125,70"
      fill="none"
      stroke="#5577FF"
      stroke-width="2"
    />
    <polygon
      class="path"
      points="70,30 70,130 125,170 125,70"
      fill="none"
      stroke="#5577FF"
      stroke-width="2"
    />
    <polygon
      class="path"
      points="110,25 110,125 165,165 165,65"
      fill="none"
      stroke="#5577FF"
      stroke-width="2"
    />
    <polygon
      class="path"
      points="70,130 110,125 165,165 125,170"
      fill="none"
      stroke="#5577FF"
      stroke-width="2"
    />

    <!-- Front battery cell -->
    <polygon
      class="path"
      points="1,30 40,25 95,65 55,70"
      fill="none"
      stroke="#5577FF"
      stroke-width="2"
    />
    <polygon
      class="path"
      points="1,30 1,130 55,170 55,70"
      fill="none"
      stroke="#5577FF"
      stroke-width="2"
    />
    <polygon
      class="path"
      points="40,25 40,125 95,165 95,65"
      fill="none"
      stroke="#5577FF"
      stroke-width="2"
    />
    <polygon
      class="path"
      points="1,130 40,125 95,165 55,170"
      fill="none"
      stroke="#5577FF"
      stroke-width="2"
    />
  </svg>
</template>

<style lang="scss" scoped>
.path {
  stroke-dasharray: 300;
  stroke-dashoffset: 200;
  animation: draw 2s forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>