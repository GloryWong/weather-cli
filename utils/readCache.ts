import { getCacheFilePath } from "./getCacheFilePath.ts";
import { existsSync } from "@std/fs";

export async function readCache(url: string): Promise<{ data: any; timestamp: number } | null> {
  const cacheFile = await getCacheFilePath(url);
  if (!existsSync(cacheFile)) return null;

  try {
    const content = await Deno.readTextFile(cacheFile);
    return JSON.parse(content);
  } catch (error) {
    console.warn("Failed to read cache:", error);
    return null;
  }
}