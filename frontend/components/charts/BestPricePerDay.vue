<template>
  <div>
    <v-chart class="h-[30vh] w-full" :option="option" autoresize />
  </div>
</template>

<script lang="ts" setup>
import VChart from "vue-echarts";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const batteriesData = ref<any>([])

const data = computed(() => {
  return batteriesData.value.map(b => b.whPerEuro)
});

watch(batteriesData, () => {
  option.value.xAxis.data = batteriesData.value.map(b => `${b.date} ${b.brand} ${b.model}`)
})

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {},
  color: ["#5577FF"],
  title: {
    text: 'Wh/€/day ',
    left: "center",
  },
  xAxis: {
    type: "category",
    name: "Day",
    nameLocation: "middle",
    data: batteriesData.value.map(b => `${b.brand} ${b.model}`),
    nameTextStyle: { padding: [10, 0, 0, 0] },
  },
  yAxis: {
    type: "value",
    name: "Wh/€",
    nameLocation: "middle",
    nameRotate: 90,
    nameTextStyle: { padding: [0, 0, 10, 0] },
  },
  series: [
    {
      symbolSize: 20,
      data: data,
      type: "bar",
    },
  ],
});

onMounted(async () => {
  const res = await fetch('/api/statistic/prices')
  batteriesData.value = await res.json()
})
</script>
