/**
 * @param height in mm
 * @param radius in mm
 * @param mAh in mAh
 * @param voltage in V
 * @returns Volumetric energy density in Wh/l
 */
export function calculateVolumetricEnergyDensityOfCylinder(
  height: number,
  radius: number,
  mAh: number,
  voltage: number,
) {
  const heightInDm = height / 100;
  const radiusInDm = radius / 100;
  const totalEnergy = ((mAh / 1000) * voltage)

  return totalEnergy / (Math.PI * Math.pow(radiusInDm, 2) * heightInDm);
}

/**
 * @param mass in g
 * @param mAh in mAh
 * @param voltage in V
 * @returns Gravimetric Energy Density in Wh/kg
 */
export function calculateGravimetricEnergyDensity(
  mass: number,
  mAh: number,
  voltage: number,
) {
  const massInKg = mass / 1000;
  const totalEnergy = ((mAh / 1000) * voltage)
  return totalEnergy / massInKg;
}

/**
 * 
 * @param price 
 * @param mAh 
 * @param voltage 
 * @returns Wh per Euro
 */
export function calculateWhPerEuro(price: number, mAh: number, voltage: number) {
  if (price === 0) {
    return 0
  }
  const totalEnergy = ((mAh / 1000) * voltage)
  return totalEnergy / price
}