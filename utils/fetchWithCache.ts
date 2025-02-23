import { CACHE_EXPIRY_MS } from "../constants/index.ts";
import { readCache } from "./readCache.ts";
import { writeCache } from "./writeCache.ts";

export async function fetchWithCache(url: string) {
  const now = Date.now();
  const cache = await readCache(url);
  
  // Returning cached data
  if (cache && now - cache.timestamp < CACHE_EXPIRY_MS) {
    return cache.data;
  }

  try {
    // Fetching new data
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
  
    const data = await response.json();
  
    // Store latest response in its own cache file
    await writeCache(url, data);
  
    return data;
  } catch (error: any) {
    console.error(`⚠️ Network error(${error.message})! Loading cached weather data...`);
    if (cache && cache.data) {
      return cache.data
    } else {
      console.error("❌ No cached data available.");
    }
  }
}