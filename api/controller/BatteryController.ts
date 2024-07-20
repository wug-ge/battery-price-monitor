import { Request } from 'express'
import { getDataSource } from '../data-source'
import { Battery } from '../models/Battery'
import { BatteryPrice } from '../models/BatteryPrice'
import { addLastPriceToBatteries, addStatsToBatteries } from '../services/BatteryService'

export class BatteryController {
  private batteryRepository = getDataSource().getRepository(Battery)
  private batteryPriceRepository = getDataSource().getRepository(BatteryPrice)

  async getAllBatteries() {
    return await this.batteryRepository.find()
  }

  async getBatteriesWitStats(req: Request) {
    let batteries = await this.batteryRepository.find()

    batteries = await addLastPriceToBatteries(batteries, this.batteryPriceRepository)
    const batteriesWithStats = addStatsToBatteries(batteries)

    let sort: 'gravimetricEnergyDensity' | 'volumetricEnergyDensity' | 'whPerEuro' | 'whPerEuroReduced' = req.query.sort as any || 'volumetricEnergyDensity'
    // let limit: number = typeof req.query.limit === 'string' ? parseInt(req.query.limit) || 20;
    
    return batteriesWithStats
      .sort((a, b) => {
        return b[sort] - a[sort]
      })
      // .slice(0, limit)
  }
}