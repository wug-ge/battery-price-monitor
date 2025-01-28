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
  checkInput(height, radius, mAh, voltage);

  const heightInDecimeters = height / 100;
  const radiusInDecimeters = radius / 100;
  const totalEnergy = ((mAh / 1000) * voltage)
  return  totalEnergy / (Math.PI * Math.pow(radiusInDecimeters, 2) * heightInDecimeters);
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
): number {
  checkInput(mass, mAh, voltage);

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
export function calculateWhPerEuro(price: number, 
  mAh: number, 
  voltage: number
): number {
  checkInput(price, mAh, voltage);

  if (price === 0) {
    return 0
  }
  const totalEnergy = ((mAh / 1000) * voltage)
  return totalEnergy / price
}

/**
 * 
 * @param length in mm
 * @param width in mm
 * @param height in mm
 * @returns Prismatic Volume in Litres
 */
export function calculatePrismaticVolume(length: number, 
  width: number, 
  height: number
): number{
  //I assume all units are in mm
  //V = l*w*h
  checkInput(length, width, height);

  const lengthInDecimeters = length / 100;
  const widthInDecimeters = width / 100;
  const heightInDecimeters = height / 100;

  const volumeInLitres = lengthInDecimeters * widthInDecimeters * heightInDecimeters;
  return volumeInLitres;
}

/**
 * 
 * @param input array of input (length, width, height, mAh, voltage,...)
 */
function checkInput(...input: number[]): void{
  input.forEach(num => {
    if(isNaN(num)){
      throw new Error("Invalid input: Not a number");
    }
    if(num <= 0){
      throw new Error("Invalid input: must be greater than zero");
    }
  });
}