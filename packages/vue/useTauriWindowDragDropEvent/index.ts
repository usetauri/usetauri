import type { UseWindowEventOptions, WindowDragDropEventHandler } from '@usetauri/core'
import { useTauriWindowDragDropEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

export function useWindowDragDropEvent(handler: WindowDragDropEventHandler, opts?: UseWindowEventOptions) {
  const stop = listen(handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
