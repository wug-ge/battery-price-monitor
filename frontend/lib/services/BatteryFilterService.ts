import type { Battery } from "../models/Battery";

export class BatteryFilterService {
  constructor(private batteryFilter: BatteryFilter) {}

  filterBatteries(batteries: Battery[]) {
    return batteries
      .filter(this.filterBySize.bind(this))
      .filter(this.filterByBrand.bind(this))
  }
  
  private filterBySize(battery: Battery) {
    if (!this.batteryFilter.sizeFilter.length) return true
    return this.batteryFilter.sizeFilter.find(filter => filter.value === battery.size)
  }

  private filterByBrand(battery: Battery) {
    if (!this.batteryFilter.brandFilter.length) return true
    return this.batteryFilter.brandFilter.find(filter => filter.value === battery.brand)
  }

}


export class BatteryFilter {
  sizeFilter : Option[] = []
  brandFilter: Option[] = []
}

type Option = {
  name: string
  value: string
  disabled: boolean
}