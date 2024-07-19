import { Battery } from "../models/Battery";
import { SerializationHelper } from "../utils/SerializationHelper";

export async function getAllBatteries(): Promise<Battery[]> {
  const res = await fetch('/api/batteries/stats');
  const data = await res.json();
  return SerializationHelper.toInstanceArray(Battery, data);
}