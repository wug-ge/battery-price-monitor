import * as dotenv from 'dotenv'
import * as path from 'path'
import { ApiDataSource } from "./data-source";
import * as cron from 'node-cron'
import { initCrawling } from './nkonCrawler';
import 'reflect-metadata'
import { init as initExpress } from './express';
import { warmCache } from './lib/utils/CacheWarmer';

async function main() {
  dotenv.config({ path: path.resolve(process.cwd() + '/..', '.env') })
  await initDB()
  initCron()
  initExpress()
}

function initCron() {
  cron.schedule('5 * * * *', async () => {
    console.log('Init crawling')
    initCrawling()
  })
  initCrawling()

  warmCache()
  cron.schedule('12 * * * *', async () => {
    console.log('Warming up cache')
    warmCache()
  })
}

async function initDB() {
    // Initiate DB
    await ApiDataSource.initialize()
}

main().catch(console.error);