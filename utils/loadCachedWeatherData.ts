import { CACHE_FILE } from '../constants/index.ts'

export async function loadCachedWeatherData(): Promise<WeatherResponse | null> {
  try {
    const data = await Deno.readTextFile(CACHE_FILE)
    return JSON.parse(data)
  } catch {
    return null
  }
}
