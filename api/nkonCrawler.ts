import * as cheerio from "cheerio";
import { Battery } from "./models/Battery";
import { getDataSource } from "./data-source";
import { BatteryPrice } from "./models/BatteryPrice";
import { getSourcer } from "./services/SourcerService";

const NKON_SOURCER = "nkon"

export async function initCrawling() {
  console.info("Starting crawling");
  const allPages = [
    `https://eu.nkon.nl/rechargeable/li-ion/18650-size.html`,
    `https://eu.nkon.nl/rechargeable/li-ion/21700-20700-size.html`,
    `https://eu.nkon.nl/rechargeable/li-ion/14500-16340.html`,
    `https://eu.nkon.nl/rechargeable/li-ion/18350-18500-formaat.html`,
    `https://eu.nkon.nl/rechargeable/li-ion/26650.html`,
    `https://eu.nkon.nl/rechargeable/li-ion/overige-formaten.html`,
  ]

  for (const page of allPages) {
    await getAllBatteries(page);
  }
}

async function getAllBatteries(page: string) {
  const data = await fetch(page);
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

    // If crawler has error or something is wrong in database, edit it here
    await batteryRepository.update(existingBattery.id, {
      model: battery.model ? battery.model : existingBattery.model,
      chemistry: battery.chemistry ? battery.chemistry : existingBattery.chemistry,
      voltage: battery.voltage ? battery.voltage : existingBattery.voltage,
    });

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
  battery.model = $('#product-attribute-specs-table tr:contains("Model") td').text().trim() || $(".product-name").text().trim().split(' ').length > 1 ? $(".product-name").text().trim().split(' ')[1] : '';
  if (!battery.model) {
    console.log($(".product-name").text().trim().split(' ')[1])
  }
  battery.size = $('#product-attribute-specs-table tr:contains("Size") td').text().trim();
  battery.chemistry = $('#product-attribute-specs-table tr:contains("chemistry") td').text().trim();
  battery.voltage = parseFloat($('#product-attribute-specs-table tr:contains("Voltage") td').text().trim().replace(/V/g, ''));
  battery.minCapacity = $('#product-attribute-specs-table tr:contains("Min. capacity") td').length ? parseFloat($('#product-attribute-specs-table tr:contains("Min. capacity") td').text().trim().replace(/,/g, '').replace(/\s/g, '')) : 0;
  battery.typCapacity = $('#product-attribute-specs-table tr:contains("Typ. capacity") td').length ? parseFloat($('#product-attribute-specs-table tr:contains("Typ. capacity") td').text().trim().replace(/,/g, '').replace(/\s/g, '')) : 0;
  battery.version = $('#product-attribute-specs-table tr:contains("version") td').text().trim();
  battery.dischargeCurrent = parseFloat($('#product-attribute-specs-table tr:contains("Discharge current") td').text().trim());
  battery.circuitProtection = $('#product-attribute-specs-table tr:contains("Circuit protection") td').text().trim();
  battery.height = parseFloat($('#product-attribute-specs-table tr:contains("Height") td').text().trim());
  battery.diameter = parseFloat($('#product-attribute-specs-table tr:contains("Diameter") td').text().trim());

  Object.keys(battery).forEach((key: string) => {
    if (Number.isNaN((battery as any)[key])) {
      (battery as any)[key] = 0;
    }
  })

  const batteryPrice = new BatteryPrice();
  batteryPrice.price = parseFloat($('.price-box .price').text().trim().replace(/[^0-9.-]+/g, ''));
  if ($('.tier-prices li:last-child .price').length) {
    batteryPrice.priceReduced = parseFloat($('.tier-prices li:last-child .price').last().text().trim().replace(/[^0-9.-]+/g, ''));
  }
  batteryPrice.sourcerId = (await getSourcer(NKON_SOURCER)).id
  battery.batteryPrices = [batteryPrice];

  return battery;
}
