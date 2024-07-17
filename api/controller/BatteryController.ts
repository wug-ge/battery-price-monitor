import { Request } from 'express'
import { getDataSource } from '../data-source'
import { Battery } from '../models/Battery'
import { calculateGravimetricEnergyDensity, calculateVolumetricEnergyDensityOfCylinder } from '../services/MathHelper'

export class BatteryController {
  private batteryRepository = getDataSource().getRepository(Battery)

  async getAllBatteries() {
    return await this.batteryRepository.find()
  }

  async getAllBatteriesByEnergyDensity(req: Request) {
    const batteries = await this.batteryRepository.find()

    const batteriesWithEnergyDensity = batteries.map(battery => {
      return {
        ...battery,
        volumetricEnergyDensity: calculateVolumetricEnergyDensityOfCylinder(battery.height, battery.diameter / 2, battery.typCapacity, 3.6),
        gravimetricEnergyDensity: calculateGravimetricEnergyDensity(battery.weight, battery.typCapacity, 3.6),
      }
    })

    let sort: 'gravimetricEnergyDensity' | 'volumetricEnergyDensity' = req.query.sort === 'gravimetric' ? 'gravimetricEnergyDensity' : 'volumetricEnergyDensity'
    return batteriesWithEnergyDensity.sort((a, b) => {
      return b[sort] - a[sort]
    })
  }
}