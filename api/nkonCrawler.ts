import * as cheerio from "cheerio";
import { Battery } from "./models/Battery";
import { getDataSource } from "./data-source";
import { BatteryPrice } from "./models/BatteryPrice";

export async function initCrawling() {
  console.info("Starting crawling");
  await getAllBatteries();
}

async function getAllBatteries() {
  // replace later with all relevant pages
  const all18650 = `https://eu.nkon.nl/rechargeable/li-ion/18650-size.html`;
  const data = await fetch(all18650);
  const html = await data.text();
  const $ = cheerio.load(html);
  const batteries = $(".product-name > a");

  // slow loop, avoid too much stress on nkon
  const allBatteries = [];
  for (let i = 0; i<batteries.length; i++) {
    const link = $(batteries[i]).attr("href")
    if (!link) {
      continue
    }
    allBatteries.push(await getBatteryFromLink(link));
  }
  /* this is the fast loop
  const allBatteries = await Promise.all(batteries.map(async (index, element) => {
    const link = $(element).attr("href")
    if (!link) {
      return
    }
    return await getBatteryFromLink(link);
  }));*/
  await saveNewBatteriesToDb(allBatteries.filter(battery => battery !== undefined));
  console.info("Finished crawling");
}

async function saveNewBatteriesToDb(batteries: Battery[]) {
  const batteryRepository = getDataSource().getRepository(Battery);
  const batteryPriceRepository = getDataSource().getRepository(BatteryPrice);
  for (const battery of batteries) {
    let existingBattery = await batteryRepository.findOne({ where: {eanGtin: battery.eanGtin }});
    if (!existingBattery) {
      existingBattery = await batteryRepository.save(battery);
    }
    battery.batteryPrices[0].battery = existingBattery;
    await batteryPriceRepository.save(battery.batteryPrices[0]);
  }
}


async function getBatteryFromLink(link: string): Promise<Battery> {
  const data = await fetch(link);
  const html = await data.text();
  const $ = cheerio.load(html);
 
  // Extract details from the HTML and map to the Battery entity fields
  const battery = new Battery()
  battery.eanGtin = $('#product-attribute-specs-table tr:contains("EAN") td').text().trim();
  battery.weight = parseFloat($('#product-attribute-specs-table tr:contains("Weight") td').text().trim());
  battery.brand = $('#product-attribute-specs-table tr:contains("Brand") td').text().trim();
  battery.model = $('#product-attribute-specs-table tr:contains("Model") td').text().trim();
  battery.size = $('#product-attribute-specs-table tr:contains("Size") td').text().trim();
  battery.chemistry = $('#product-attribute-specs-table tr:contains("Chemistry") td').text().trim();
  battery.voltage = $('#product-attribute-specs-table tr:contains("Voltage") td').text().trim();
  battery.minCapacity = parseFloat($('#product-attribute-specs-table tr:contains("Min. capacity") td').text().trim().replace(/,/g, '').replace(/\s/g, ''));
  battery.typCapacity = parseFloat($('#product-attribute-specs-table tr:contains("Typ. capacity") td').text().trim().replace(/,/g, '').replace(/\s/g, ''));
  battery.version = $('#product-attribute-specs-table tr:contains("version") td').text().trim();
  battery.dischargeCurrent = parseFloat($('#product-attribute-specs-table tr:contains("Discharge current") td').text().trim());
  battery.circuitProtection = $('#product-attribute-specs-table tr:contains("Circuit protection") td').text().trim();
  battery.height = parseFloat($('#product-attribute-specs-table tr:contains("Height") td').text().trim());
  battery.diameter = parseFloat($('#product-attribute-specs-table tr:contains("Diameter") td').text().trim());

  const batteryPrice = new BatteryPrice();
  batteryPrice.price = parseFloat($('.price-box .price').text().trim().replace(/[^0-9.-]+/g, ''));
  if ($('.tier-prices li:last-child .price').length) {
    batteryPrice.priceReduced = parseFloat($('.tier-prices li:last-child .price').last().text().trim().replace(/[^0-9.-]+/g, ''));
  }
  battery.batteryPrices = [batteryPrice];

  return battery;
}
