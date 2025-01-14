import type { Event } from '@tauri-apps/api/event'
import type { DragDropEvent } from '@tauri-apps/api/window'
import type { UseWindowEventOptions } from '../useTauriWindowEvent'
import { useTauriWindowEvent } from '../useTauriWindowEvent'

export type { DragDropEvent }
export type WindowDragDropEventHandler = (event: Event<DragDropEvent>) => void | Promise<void>

/**
 * Listen to a file drop event.
 * The listener is triggered when the user hovers the selected files on the webview,
 * drops the files or cancels the operation.
 */
export function useTauriWindowDragDropEvent(handler: WindowDragDropEventHandler, opts?: UseWindowEventOptions) {
  return useTauriWindowEvent('onDragDropEvent', handler, opts)
}
