<template>
  <div 
    class="
      border border-black border-solid
      rounded
      text-xl uppercase font-extrabold text-accent-1 leading-5
      relative
      cursor-pointer
      flex items-center justify-center
      w-52 p-2
      wrapper
      "
    @click="selected ? selected = false : selected = true"  
  >
    <div class="pr-5 z-10 transition-all relative left-3" :class="{ '!text-primary text-center': !selected }">
      <slot name="optionOne"></slot>
    </div>
    <div class="pl-5 z-10 transition-all relative right-3" :class="{ '!text-primary': selected }">
      <slot name="optionTwo"></slot>
    </div>

    <div
      class="sliding-thing bg-accent-2 absolute top-0 w-1/2 h-full rounded transition-all"
      :class="{ 'selected-left': !selected, 'selected-right': selected }"
    >
    </div>
  </div>
</template>

<script lang="ts" setup>
const selected = ref(false)


watch(selected, () => {
  emit("update:modelValue", selected.value);
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
const emitInput = (v: boolean) => {
  emit("update:modelValue", v);
};

</script>

<style lang="scss" scoped>
.selected-left {
  left: 0;
}

.selected-right {
  left: 100%;
  transform: translateX(-100%);
}
</style>