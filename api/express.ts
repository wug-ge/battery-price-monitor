import * as http from "http";
import * as os from "os";
import express, { Request, Response, NextFunction, Application } from "express";
import { Routes } from "./routes";

export function init() {
  const app: Application = express();

  setupRouter(app);
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

function setupRouter(app: Application) {
  Routes.forEach((route) => {
    (app as any)[route.method](
      route.route,
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
