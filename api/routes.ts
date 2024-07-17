import { BatteryController } from "./controller/BatteryController"

export const Routes: RoutesType = [{
  method: 'get',
  route: '/batteries',
  controller: BatteryController,
  action: 'getAllBatteries',
}, {
  method: 'get',
  route: '/batteries/energy-density',
  controller: BatteryController,
  action: 'getAllBatteriesByEnergyDensity',
}]



export type RoutesType = {
  method: string,
  route: string,
  controller: any,
  action: string,
}[]