import { Request, Response } from 'express';
import { priceForWhInPeriod } from '../services/StatisticService';
export class StatisticController {   
  async getPriceForWhInPeriod(request: Request, response: Response) 
  {
      return await priceForWhInPeriod();
  }
}