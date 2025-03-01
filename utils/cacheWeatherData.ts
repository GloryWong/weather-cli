import { CACHE_FILE } from '../constants/index.ts'

export async function cacheWeatherData(data: WeatherResponse) {
  try {
    await Deno.writeTextFile(CACHE_FILE, JSON.stringify(data, null, 2))
  } catch (error: any) {
    console.error('❌ Failed to save cache:', error.message)
  }
}
