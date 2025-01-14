import type { BaseDirectory, ExistsOptions } from '@tauri-apps/plugin-fs'
import { invoke } from '@tauri-apps/api/core'
import { resolve } from '@tauri-apps/api/path'

export async function resolveBaseDirectory(baseDir: BaseDirectory) {
  return invoke<string>('plugin:path|resolve_directory', { directory: baseDir })
}

export async function resolveFilePath(path: string | URL, options?: ExistsOptions) {
  if (path instanceof URL && path.protocol !== 'file:') {
    throw new TypeError('Must be a file URL.')
  }

  const filePath = path instanceof URL ? path.pathname : path

  if (options?.baseDir) {
    const root = await resolveBaseDirectory(options.baseDir)
    return resolve(root, filePath)
  }

  return resolve(filePath)
}
