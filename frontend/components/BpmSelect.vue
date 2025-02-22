<template>
  <select
    @input="emitInput"
    :value="modelValue"
    class="py-3 px-2 text-accent-2 bg-primary text-xl rounded w-full"
  >
    <option v-for="(option, i) in options" :key="i" :value="option.value" :disabled="option.disabled">
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts" setup>
interface Option {
  name: string;
  value: string;
  disabled: boolean;
}
interface Props {
  options: Option[];
  modelValue: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
const emitInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target) {
    return;
  }
  emit("update:modelValue", target.value);
};
</script>
