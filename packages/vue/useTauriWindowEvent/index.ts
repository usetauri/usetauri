import type { TauriWindowEventHandler, TauriWindowEventName, UseWindowEventOptions } from '@usetauri/core'
import { useTauriWindowEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

export function useWindowEvent<const T extends TauriWindowEventName>(key: T, handler: TauriWindowEventHandler<T>, opts?: UseWindowEventOptions) {
  const stop = listen(key, handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
