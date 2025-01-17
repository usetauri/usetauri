import type { UseTauriWindowEventOptions, WindowDragDropEventHandler } from '@usetauri/core'
import { useTauriWindowDragDropEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

export function useTauriWindowDragDropEvent(handler: WindowDragDropEventHandler, opts?: UseTauriWindowEventOptions) {
  const stop = listen(handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
