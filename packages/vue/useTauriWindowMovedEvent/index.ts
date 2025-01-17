import type { UseTauriWindowEventOptions, WindowMovedEventHandler } from '@usetauri/core'
import { useTauriWindowMovedEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

export function useTauriWindowMovedEvent(handler: WindowMovedEventHandler, opts?: UseTauriWindowEventOptions) {
  const stop = listen(handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
