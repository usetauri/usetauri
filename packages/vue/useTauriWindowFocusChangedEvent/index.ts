import type { UseTauriWindowEventOptions, WindowFocusChangedEventHandler } from '@usetauri/core'
import { useTauriWindowFocusChangedEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

export function useWindowFocusChangedEvent(handler: WindowFocusChangedEventHandler, opts?: UseTauriWindowEventOptions) {
  const stop = listen(handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
