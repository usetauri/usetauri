import type { TauriWindowEventHandler, TauriWindowEventName, UseTauriWindowEventOptions } from '@usetauri/core'
import { useTauriWindowEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

/**
 * ### Example
 * ```vue
 * <script setup lang="ts">
 * import { useTauriWindowEvent } from '@usetauri/vue'
 *
 * useTauriWindowEvent('onDragDropEvent', (event) => {
 *  console.log(event)
 * })
 * </script>
 * ```
 */
export function useTauriWindowEvent<const T extends TauriWindowEventName>(key: T, handler: TauriWindowEventHandler<T>, opts?: UseTauriWindowEventOptions) {
  const stop = listen(key, handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
