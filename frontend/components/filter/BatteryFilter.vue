<template>
  <div class="flex items-center">
    <div class="text-accent-1 font-semibold">Size:</div>
    <bpm-select class="max-w-24" v-model="size" :options="sizeOptions" />
  </div>
</template>

<script lang="ts" setup>
const size = ref<string>('all') 

const sizeOptions = [
  { name: 'all', value: 'all', disabled: false },
  { name: '18650', value: 'all', disabled: false },
  { name: '21700', value: 'all', disabled: false },
]
</script>