import type { Battery } from "../models/Battery";

export class BatteryFilterService {
  constructor(private batteryFilter: BatteryFilter) {}

  filterBatteries(batteries: Battery[]) {
    return batteries
      .filter(this.filterBySize.bind(this))
      .filter(this.filterByBrand.bind(this))
  }
  
  private filterBySize(battery: Battery) {
    return this.batteryFilter.sizeFilter ? this.batteryFilter.sizeFilter === battery.size : true
    // return this.batteryFilter.sizeFilter.includes(battery.size)
  }

  private filterByBrand(battery: Battery) {
    return this.batteryFilter.brandFilter ? this.batteryFilter.brandFilter === battery.brand : true
    // return this.batteryFilter.sizeFilter.includes(battery.size)
  }

}


export class BatteryFilter {
  sizeFilter = ''
  brandFilter = ''
}