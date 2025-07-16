<template>
  <div>
    <v-chart class="h-[30vh] w-full" :option="option" autoresize />
  </div>
</template>

<script lang="ts" setup>
import VChart from "vue-echarts";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { ScatterChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { useBatteryStore } from "@/stores/battery";
import type { Battery } from "@/lib/models/Battery";

interface Props {
  filter: (batteries: Battery[]) => Battery[];
  title: string;
}

const props = defineProps<Props>();

const batteryStore = useBatteryStore();
const storeBatteries = storeToRefs(batteryStore).batteries;

const batteries = computed(() => {
  let batteries = JSON.parse(JSON.stringify(storeBatteries.value));
  if (props.filter) {
    batteries = props.filter(batteries);
  }
  return batteries;
});

use([
  CanvasRenderer,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const data = computed(() => {
  return batteries.value.map((battery: Battery) => {
    return {
      name: `${battery.brand} ${battery.model}`,
      value: [
        Math.round(battery.volumetricEnergyDensity),
        Math.round(battery.gravimetricEnergyDensity),
      ],
    };
  });
});

// zoom into chart to have better view of data
watch(storeBatteries, () => {
  option.value.xAxis.min =
    Math.round(
      Math.min(
        ...batteries.value.map((b: Battery) => b.volumetricEnergyDensity)
      ) / 100
    ) * 100;
});


// zoom into chart to have better view of data
watch(storeBatteries, () => {
  option.value.yAxis.min =
    Math.round(
      Math.min(
        ...batteries.value.map((b: Battery) => b.gravimetricEnergyDensity)
      ) / 100
    ) * 100;
});

const option = ref({
  tooltip: {
    trigger: "item",
    formatter: function (params: any) {
      return params.data.name;
    },
  },
  color: ["#5577FF"],
  title: {
    text: props.title,
    left: "center",
  },
  xAxis: {
    type: "value",
    name: "Wh/l",
    nameLocation: "middle",
    nameTextStyle: { padding: [10, 0, 0, 0] },
    min: 0
  },
  yAxis: {
    type: "value",
    name: "Wh/kg",
    nameLocation: "middle",
    nameRotate: 90,
    nameTextStyle: { padding: [0, 0, 20, 0] },
    min: 0
  },
  series: [
    {
      symbolSize: 10,
      data: data,
      type: "scatter",
    },
  ],
});
</script>
