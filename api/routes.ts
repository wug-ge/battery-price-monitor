import { BatteryController } from "./controller/BatteryController"
import { StatisticController } from "./controller/StatisticController"

export const Routes: RoutesType = [{
  method: 'get',
  route: '/batteries',
  controller: BatteryController,
  action: 'getAllBatteries',
}, {
  method: 'get',
  route: '/batteries/stats',
  controller: BatteryController,
  action: 'getBatteriesWithStats',
}, {
  method: 'get',
  route: '/batteries/:id',
  controller: BatteryController,
  action: 'getBatteryById',
}, {
  method: 'get',
  route: '/statistic/prices',
  controller: StatisticController,
  action: 'getPriceForWhInPeriod',
}]

export type RoutesType = {
  method: string,
  route: string,
  controller: any,
  action: string,
}[]