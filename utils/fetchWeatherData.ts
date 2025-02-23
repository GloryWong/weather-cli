import { WEATHER_BASE_URL } from "../constants/index.ts";
import { fetchLocationData } from "./fetchLocationData.ts";
import { fetchWithCache } from "./fetchWithCache.ts";

export async function fetchWeatherData(): Promise<WeatherResponse>;
export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherResponse>;
export async function fetchWeatherData(x?: number, y?: number): Promise<WeatherResponse> {
  let lat = x, lon = y
  if (!lat || !lon) {
    const location = await fetchLocationData();
    if (!location) {
      console.log("❌ Could not detect your location.");
      Deno.exit(1);
    }

    lat = location.lat
    lon = location.lon
  }
  
  const url = `${WEATHER_BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m&daily=sunrise,sunset&timezone=auto`;
  return fetchWithCache(url)
}