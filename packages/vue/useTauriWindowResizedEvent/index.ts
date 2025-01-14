import type { UseWindowEventOptions, WindowResizedEventHandler } from '@usetauri/core'
import { useTauriWindowResizedEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

export function useWindowResizedEvent(handler: WindowResizedEventHandler, opts?: UseWindowEventOptions) {
  const stop = listen(handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
