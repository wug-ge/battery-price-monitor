import { Battery } from "../models/Battery";
import { SerializationHelper } from "../utils/SerializationHelper";

export async function getAllBatteries(): Promise<Battery[]> {
  const res = await fetch('/api/batteries/stats');
  const data = await res.json();
  return SerializationHelper.toInstanceArray(Battery, data);
}

export function sortByWhPerEuro(batteries: Battery[]): Battery[] {
  return batteries.sort((a, b) => {
    return b.whPerEuro - a.whPerEuro;
  });
}

export function filter18650Batteries(batteries: Battery[]): Battery[] {
  return batteries.filter(battery => battery.size === '18650');
}

export function filterTop20VolumetricEnergyDensity(batteries: Battery[]): Battery[] {
  return batteries
    .sort((a, b) => b.volumetricEnergyDensity - a.volumetricEnergyDensity)
    .slice(0, 20);
}

export function filterTop20WhPerEuro(batteries: Battery[]): Battery[] {
  console.log("blöb?")
  return batteries
    .sort((a, b) => b.whPerEuro - a.whPerEuro)
    .slice(0, 20);
}