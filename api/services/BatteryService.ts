import { Repository } from "typeorm";
import { getDataSource } from "../data-source";
import { Battery } from "../models/Battery";
import { BatteryPrice } from "../models/BatteryPrice";
import { calculateGravimetricEnergyDensity, calculateVolumetricEnergyDensityOfCylinder, calculateWhPerEuro } from '../services/MathHelper'

export function addStatsToBatteries(batteries: Battery[]) {
  return batteries.map(battery => {
    return {
      ...battery,
      volumetricEnergyDensity: calculateVolumetricEnergyDensityOfCylinder(battery.height, battery.diameter / 2, battery.typCapacity, 3.6),
      gravimetricEnergyDensity: calculateGravimetricEnergyDensity(battery.weight, battery.typCapacity, 3.6),
      whPerEuro: calculateWhPerEuro(battery.batteryPrices[0].price, battery.typCapacity, 3.6),
      whPerEuroReduced: calculateWhPerEuro(battery.batteryPrices[0].priceReduced, battery.typCapacity, 3.6),
    }
  })
}

export async function addLastPriceToBatteries(batteries: Battery[], batteryPriceRepository: Repository<BatteryPrice>) {
  // not a very efficient way to do this, but it works for now
  // write query to get this immediately one day
  // also saving stats in redis would be a smart idea for the future, no reason to calculate each request 
  return await Promise.all(batteries.map(async battery => {
    // add last battery price
    const lastPrice = await batteryPriceRepository.findOne({
      where: { batteryId: battery.id },
      order: { createdAt: 'DESC' },
    })
    battery.batteryPrices = [lastPrice || new BatteryPrice()]
    return battery
  }))
}