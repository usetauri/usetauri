import type { TauriWindowEventHandler, TauriWindowEventName, UseTauriWindowEventOptions } from '@usetauri/core'
import { useTauriWindowEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

export function useTauriWindowEvent<const T extends TauriWindowEventName>(key: T, handler: TauriWindowEventHandler<T>, opts?: UseTauriWindowEventOptions) {
  const stop = listen(key, handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
