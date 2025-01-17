import type { Event } from '@tauri-apps/api/event'
import type { UseTauriWindowEventOptions } from '../useTauriWindowEvent'
import { useTauriWindowEvent } from '../useTauriWindowEvent'

export type WindowFocusChangedEventHandler = (event: Event<boolean>) => void | Promise<void>

/**
 * Listen to window focus change.
 *
 * @doc {@link TauriWindow.onFocusChanged}
 */
export function useTauriWindowFocusChangedEvent(handler: WindowFocusChangedEventHandler, opts?: UseTauriWindowEventOptions) {
  return useTauriWindowEvent('onFocusChanged', handler, opts)
}
