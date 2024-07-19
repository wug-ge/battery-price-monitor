import type { BatteryPrice } from "./BatteryPrice";

export class Battery {
  id = 0;
  eanGtin = '';
  weight = '';
  brand = '';
  model= '';
  size = '';
  chemistry = '';
  voltage = '';
  minCapacity = 0;
  typCapacity = 0;
  version = '';
  dischargeCurrent = 0;
  circuitProtection = '';
  height = 0;
  diameter = 0;
  batteryPrices: BatteryPrice[] = [];

  gravimetricEnergyDensity = 0;
  volumetricEnergyDensity = 0;
  whPerEuro = 0;
  whPerEuroReduced = 0;
}
