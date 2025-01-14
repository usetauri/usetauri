import type { PhysicalSize } from '@tauri-apps/api/dpi'
import type { Event } from '@tauri-apps/api/event'
import type { UseWindowEventOptions } from '../useTauriWindowEvent'
import { useTauriWindowEvent } from '../useTauriWindowEvent'

export type { PhysicalSize }
export type WindowResizedEventHandler = (event: Event<PhysicalSize>) => void | Promise<void>

/**
 * Listen to window resize.
 *
 * @doc {@link TauriWindow.onResized}
 */
export function useTauriWindowResizedEvent(handler: WindowResizedEventHandler, opts?: UseWindowEventOptions) {
  return useTauriWindowEvent('onResized', handler, opts)
}
