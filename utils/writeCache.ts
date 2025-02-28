import { getCacheFilePath } from "./getCacheFilePath.ts";

export async function writeCache(url: string, data: any) {
  const cacheFile = await getCacheFilePath(url);
  const cacheEntry = { data, timestamp: Date.now() };
  
  try {
    await Deno.writeTextFile(cacheFile, JSON.stringify(cacheEntry));
  } catch (error) {
    console.error("Failed to write cache:", error);
  }
}