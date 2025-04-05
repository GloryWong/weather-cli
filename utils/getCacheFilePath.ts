import { crypto } from '@std/crypto/crypto'
import envPaths from 'env-paths'
import { join } from '@std/path'
import { ensureDir } from '@std/fs'

function buffer2hex(buffer: ArrayBuffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')
}

export async function getCacheFilePath(url: string) {
  const cacheDir = envPaths('weather-cli').cache
  await ensureDir(cacheDir)
  const hash = buffer2hex(
    await crypto.subtle.digest('SHA-256', new TextEncoder().encode(url)),
  )
  return join(cacheDir, `./.cache_${hash}`)
}
