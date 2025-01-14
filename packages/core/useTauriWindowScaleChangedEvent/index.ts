import type { Event } from '@tauri-apps/api/event'
import type { ScaleFactorChanged } from '@tauri-apps/api/window'
import type { UseWindowEventOptions } from '../useTauriWindowEvent'
import { useTauriWindowEvent } from '../useTauriWindowEvent'

export type { ScaleFactorChanged }
export type WindowScaleChangedEventHandler = (event: Event<ScaleFactorChanged>) => void | Promise<void>

/**
 * Listen to window scale change. Emitted when the window's scale factor has changed.
 * The following user actions can cause DPI changes:
 * - Changing the display's resolution.
 * - Changing the display's scale factor (e.g. in Control Panel on Windows).
 * - Moving the window to a display with a different scale factor.
 */
export function useTauriWindowScaleChangedEvent(handler: WindowScaleChangedEventHandler, opts?: UseWindowEventOptions) {
  return useTauriWindowEvent('onScaleChanged', handler, opts)
}
