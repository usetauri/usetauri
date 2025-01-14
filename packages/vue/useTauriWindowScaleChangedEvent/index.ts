import type { UseWindowEventOptions, WindowScaleChangedEventHandler } from '@usetauri/core'
import { useTauriWindowScaleChangedEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

export function useWindowScaleChangedEvent(handler: WindowScaleChangedEventHandler, opts?: UseWindowEventOptions) {
  const stop = listen(handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
