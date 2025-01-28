import { Repository } from "typeorm";
import { getDataSource } from "../data-source";
import { Battery } from "../models/Battery";
import { BatteryPrice } from "../models/BatteryPrice";
import { calculateGravimetricEnergyDensity, calculateVolumetricEnergyDensityOfCylinder, calculateWhPerEuro, calculatePrismaticVolume } from '../services/MathHelper'

export function addStatsToBatteries(batteries: Battery[]) {
  return batteries.map(battery => {
    return {
      ...battery,
      volumetricEnergyDensity: calculateVolumetricEnergyDensityOfCylinder(battery.height, battery.diameter / 2, battery.typCapacity, battery.voltage),
      gravimetricEnergyDensity: calculateGravimetricEnergyDensity(battery.weight, battery.typCapacity, battery.voltage),
      whPerEuro: calculateWhPerEuro(battery.batteryPrices[0].price, battery.typCapacity, battery.voltage),
      whPerEuroReduced: calculateWhPerEuro(battery.batteryPrices[0].priceReduced, battery.typCapacity, battery.voltage),
      prismaticVolume: calculatePrismaticVolume(battery.length, battery.width, battery.height),
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

export function isKeyOfBattery(key: any): key is keyof Battery {
  return key in Battery.prototype;
}