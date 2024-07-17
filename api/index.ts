import * as dotenv from 'dotenv'
import * as path from 'path'
import { getDataSource } from "./data-source";
import * as cron from 'node-cron'
import { initCrawling } from './nkonCrawler';
import 'reflect-metadata'
import { init as initExpress } from './express';

async function main() {
  dotenv.config({ path: path.resolve(process.cwd() + '/..', '.env') })
  await initDB()
  initCron()
  initExpress()
}

function initCron() {
  cron.schedule('5 * * * *', async () => {
    console.log('Running cron job')
    initCrawling()
  })
  initCrawling()
}

async function initDB() {
    // Initiate DB
    const ApiDataSource = getDataSource()
    await ApiDataSource.initialize()
}

main().catch(console.error);