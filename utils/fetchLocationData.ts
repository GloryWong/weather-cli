import { GEO_BASE_URL } from '../constants/index.ts'
import { fetchWithCache } from './fetchWithCache.ts'

/**
 * @description Auto-detect user's location (latitude & longitude) depending on IP
 */
export async function fetchLocationData(force?: boolean) {
  try {
    const data = await fetchWithCache(GEO_BASE_URL, force)
    return data
  } catch {
    return null
  }
}
