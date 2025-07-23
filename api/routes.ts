import { BatteryController } from "./controller/BatteryController"
import { StatisticController } from "./controller/StatisticController"

export const Routes: Route[] = [{
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
  cache: {
    expire: 60 * 60, // 1 hour
    type: 'always',
    keepWarm: true,
  },
}]

export type Route = {
  method: string,
  route: string,
  controller: any,
  action: string,
  cache?: { 
    expire?: number,
    type: 'always' | 'per-auth-cookie' | 'per-url',
    keepWarm?: boolean
  },
}