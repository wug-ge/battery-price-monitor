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
import { useBatteryStore } from "~/stores/battery";
import { sortByWhPerEuro } from "~/lib/services/BatteryService";
import type { Battery } from "~/lib/models/Battery";

const batteryStore = useBatteryStore();
const storeBatteries = storeToRefs(batteryStore).batteries;

interface Props {
  filter: (batteries: Battery[]) => Battery[];
  title: string;
}

const props = defineProps<Props>();

const batteries = computed(() => {
  let batteries = JSON.parse(JSON.stringify(storeBatteries.value));
  if (props.filter) {
    batteries = props.filter(storeBatteries.value);
  }
  return sortByWhPerEuro(batteries)
});


use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const data = computed(() => {
  return batteries.value.map(b => b.whPerEuro)
});

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  color: ["#5577FF"],
  title: {
    text: props.title,
    left: "center",
  },
  xAxis: {
    type: "category",
    name: "Cell",
    nameLocation: "middle",
    data: batteries.value.map(b => `${b.brand} ${b.model}`),
    nameRotate: 180,
    nameTextStyle: { padding: [10, 0, 0, 0] },
  },
  yAxis: {
    type: "value",
    name: "Wh/€",
    nameLocation: "middle",
    nameRotate: 90,
    nameTextStyle: { padding: [0, 0, 20, 0] },
  },
  series: [
    {
      symbolSize: 20,
      data: data,
      type: "bar",
    },
  ],
});
</script>
