import type { BaseDirectory } from '@tauri-apps/plugin-fs'
import { download as _download } from '@tauri-apps/plugin-upload'

export interface DownloadProgressPayload {
  progress: number
  progressTotal: number
  total: number
  transferSpeed: number
}

export type DownloadProgressHandler = (progress: DownloadProgressPayload) => void

export interface DownloadOptions {
  /**
   * Base directory for `filePath`.
   */
  baseDir?: BaseDirectory

  /**
   * @default true
   */
  createDirectory?: boolean | {
    /**
     * Permissions to use when creating the directory (defaults to `0o777`, before the process's umask).
     * Ignored on Windows.
     */
    mode?: number

    /**
     * Create any intermediate directories (as with the shell command `mkdir -p`).
     *
     * @default true
     */
    recursive?: boolean
  }

  body?: string
  headers?: Record<string, string>
  onDownloadProgress?: DownloadProgressHandler
}

export async function download(url: string, filePath: string, options?: DownloadOptions): Promise<void> {
  await _download(url, filePath, options?.onDownloadProgress, options?.headers as any, options?.body)
}
