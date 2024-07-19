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
import { useBatteryStore } from "~/stores/battery";

const batteryStore = useBatteryStore();
const { batteries } = storeToRefs(batteryStore);

use([
  CanvasRenderer,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const data = computed(() => {
  return batteries.value.map((battery) => {
    return {
      name: `${battery.brand} ${battery.model}`,
      value: [
        Math.round(battery.volumetricEnergyDensity),
        Math.round(battery.gravimetricEnergyDensity),
      ],
    };
  });
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
    text: "Energy Density",
    left: "center",
  },
  xAxis: {
    type: "value",
    name: "Wh/l",
    nameLocation: "middle",
    nameTextStyle: { padding: [10, 0, 0, 0] },
  },
  yAxis: {
    type: "value",
    name: "Wh/kg",
    nameLocation: "middle",
    nameRotate: 90,
    nameTextStyle: { padding: [0, 0, 20, 0] },
  },
  series: [
    {
      symbolSize: 20,
      data: data,
      type: "scatter",
    },
  ],
});
</script>
