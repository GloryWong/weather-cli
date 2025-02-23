import { WEATHER_BASE_URL } from "../constants/index.ts";
import { fetchWithCache } from "./fetchWithCache.ts";

export function fetchWeatherData(lat: number, lon: number): Promise<WeatherResponse> {
  const url = `${WEATHER_BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m&daily=sunrise,sunset&timezone=auto`;
  return fetchWithCache(url)
}