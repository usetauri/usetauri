import type { PhysicalPosition } from '@tauri-apps/api/dpi'
import type { Event } from '@tauri-apps/api/event'
import type { UseTauriWindowEventOptions } from '../useTauriWindowEvent'
import { useTauriWindowEvent } from '../useTauriWindowEvent'

export type { PhysicalPosition }
export type WindowMovedEventHandler = (event: Event<PhysicalPosition>) => void | Promise<void>

/**
 * Listen to window move.
 *
 * @doc {@link TauriWindow.onMoved}
 */
export function useTauriWindowMovedEvent(handler: WindowMovedEventHandler, opts?: UseTauriWindowEventOptions) {
  return useTauriWindowEvent('onMoved', handler, opts)
}
