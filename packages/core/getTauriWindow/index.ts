import type { TauriWindow } from '../types'
import { getCurrentWindow as _getCurrentWindow } from '@tauri-apps/api/window'
import { isTauri } from '../is'

/**
 * Get an instance of the current {@link TauriWindow}.
 *
 * ### Note
 * This function return might `null` which is considered an `object` in JavaScript.
 */
export function getTauriWindow(): TauriWindow | null {
  return isTauri() ? _getCurrentWindow() : null
}
