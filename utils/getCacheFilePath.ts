import hashJs from 'hashJs'

export function getCacheFilePath(url: string): string {
  const hash = hashJs.sha256().update(url).digest("hex");
  return `./.cache_${hash}`;
}