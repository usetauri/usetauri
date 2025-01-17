import type { UseTauriWindowEventOptions, WindowScaleChangedEventHandler } from '@usetauri/core'
import { useTauriWindowScaleChangedEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

/**
 * ### Example
 * ```vue
 * <script setup lang="ts">
 * import { useTauriWindowScaleChangedEvent } from '@usetauri/vue'
 *
 * useTauriWindowScaleChangedEvent((event) => {
 *  console.log(event)
 * })
 * </script>
 * ```
 */
export function useTauriWindowScaleChangedEvent(handler: WindowScaleChangedEventHandler, opts?: UseTauriWindowEventOptions) {
  const stop = listen(handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
