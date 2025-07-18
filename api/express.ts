import * as http from "http";
import * as os from "os";
import express, { Request, Response, NextFunction, Application } from "express";
import { Route, Routes } from "./routes";
import { createClient } from "redis";


export async function init() {
  const app: Application = express();

  const redis = await setupCaching();
  setupRouter(app, redis);
  setupDefaultRoutes(app);

  app.listen(process.env.EXPRESS_PORT || 3000, () => {
    console.log(
      `App is listening on port ${process.env.EXPRESS_PORT || 3000}!`
    );
  });
}

function setupDefaultRoutes(app: Application) {
  app.get("/", (req, res) => {
    res.json({ success: true });
  });
  const server = http.createServer(app);

  app.get("/hostname", (req, res) => {
    res.json({ hostname: os.hostname() });
  });
}

function setupRouter(app: Application, redis: ReturnType<typeof createClient>) {
  Routes.forEach((route) => {
    (app as any)[route.method](
      route.route,
      cache(route, redis),
      (req: Request, res: Response, next: NextFunction) => {
        const result = new (route.controller as any)()[route.action](
          req,
          res,
          next
        );

        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }

        console.log(
          "[%s] METHOD: %s IP: %s RESPONSE: %d PATH: %s USER AGENT: %s",
          new Date().toUTCString(),
          req.method,
          req.headers["x-forwarded-for"] || req.socket.remoteAddress,
          res.statusCode,
          req.url,
          req.headers["user-agent"]
        );
      }
    );
  });
}

function cache(route: Route, redis: ReturnType<typeof createClient>) {
  if (route.cache) {
    return cacheMiddleware(route.cache.expire || 60, redis);
  } else {
    return async (req: Request, res: Response, next: NextFunction) => next();
  }
}

function cacheMiddleware(ttl = 60, redis: ReturnType<typeof createClient>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `cache:${req.originalUrl}`;
    const data = await redis.get(key);
    if (data) return res.json(JSON.parse(data));
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      redis.set(key, JSON.stringify(body), { EX: ttl });
      return originalJson(body);
    };
    next();
  }
}

async function setupCaching(): Promise<ReturnType<typeof createClient>> {
  const redis = createClient({
    socket: {
      host: process.env.REDIS_HOST || 'redis',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),      
    }
  })
  redis.on('error', (err: Error) => console.error('Redis Client Error', err));
  await redis.connect();
  return redis;
}

