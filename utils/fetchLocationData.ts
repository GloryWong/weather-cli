import { GEO_BASE_URL } from "../constants/index.ts";
import { fetchWithCache } from "./fetchWithCache.ts";

/**
 * @description Auto-detect user's location (latitude & longitude) depending on IP
 */
export async function fetchLocationData() {
  try {
    const data = await fetchWithCache(GEO_BASE_URL);
    return { lat: data.lat, lon: data.lon }
  } catch {
    return null
  }
}