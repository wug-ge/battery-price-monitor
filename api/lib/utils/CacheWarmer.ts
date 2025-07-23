import { Routes } from "../../routes";

export async function warmCache() {
  Routes.filter(route => route.cache && route.cache.keepWarm).forEach(async (route) => {
    try {
      console.log(`Warming up cache for route: ${route.route}`);
      await fetch(`${process.env.API_PROD_URL}${route.route}`)
      console.log(`Cache warmed for route: ${route.route}`);
    } catch (error) {
      console.error(`Error warming cache for route: ${route.route}`, error);
    }
  })
}