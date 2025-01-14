import { isTauri as _isTauri } from '@tauri-apps/api/core'

/**
 * Check if the current environment is Tauri.
 */
export function isTauri() {
  return typeof window !== 'undefined' && typeof document !== 'undefined' && _isTauri()
}
