<template>
  <div
    class="py-3 text-accent-2 bg-primary font-extrabold text-xl rounded w-full"
  >
    <VueMultiselect
      v-model="selectedOptions"
      :options="options"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Select options"
      label="name"
      track-by="value"
    />
  </div>
</template>

<script lang="ts" setup>
import VueMultiselect from "vue-multiselect";

export interface Option {
  name: string;
  value: string;
  disabled: boolean;
}
interface Props {
  options: Option[];
  modelValue: Option[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: Option[]];
}>();

const selectedOptions = ref(props.modelValue);

watch(selectedOptions, (newVal) => {
  emit("update:modelValue", newVal);
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
.multiselect__tag {
  @apply bg-accent-2;
}
</style>