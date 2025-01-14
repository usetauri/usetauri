import type { UseWindowEventOptions, WindowMovedEventHandler } from '@usetauri/core'
import { useTauriWindowMovedEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

export function useWindowMovedEvent(handler: WindowMovedEventHandler, opts?: UseWindowEventOptions) {
  const stop = listen(handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
