import { Not } from "typeorm";
import { ApiDataSource } from "../data-source";
import { Battery } from "../models/Battery";
import { BatteryPrice } from "../models/BatteryPrice";
import { calculateWhPerEuro } from "./MathHelper";

export async function priceForWhInPeriod() {
  const batteries = await ApiDataSource.getRepository(Battery)
    .find({ where: { model: Not('case') }, relations: ['batteryPrices'] })

  const cheapestBatteriesPerDay = getCheapestBatteryPerDay(batteries);
  return cheapestBatteriesPerDay;
}

function getCheapestBatteryPerDay(batteries: Battery[]): ProcessedBattery[] {
  const batteriesByDate: Record<string, ProcessedBattery> = {};

  batteries.forEach((battery) => {
    const { typCapacity: mAh, voltage, brand, model, id: batteryId } = battery;

    battery.batteryPrices.forEach((priceEntry) => {
      const date = priceEntry.createdAt.toISOString().split('T')[0]; // Format YYYY-MM-DD
      const price = priceEntry.price;
      const whPerEuro = calculateWhPerEuro(price, mAh, voltage);

      if (!batteriesByDate[date] || whPerEuro > batteriesByDate[date].whPerEuro) {
        batteriesByDate[date] = {
          date,
          batteryPriceId: priceEntry.id,
          batteryId,
          brand,
          model,
          price,
          mAh,
          voltage,
          whPerEuro,
        };
      }
    });
  });

  return Object.values(batteriesByDate);
}

type ProcessedBattery = {
  date: string;
  batteryPriceId: number;
  batteryId: number;
  brand: string;
  model: string;
  price: number;
  mAh: number;
  voltage: number;
  whPerEuro: number;
};