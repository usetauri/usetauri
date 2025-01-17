import type { UseTauriWindowEventOptions, WindowResizedEventHandler } from '@usetauri/core'
import { useTauriWindowResizedEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

/**
 * ### Example
 * ```vue
 * <script setup lang="ts">
 * import { useTauriWindowResizedEvent } from '@usetauri/vue'
 *
 * useTauriWindowResizedEvent((event) => {
 *  console.log(event)
 * })
 * </script>
 * ```
 */
export function useTauriWindowResizedEvent(handler: WindowResizedEventHandler, opts?: UseTauriWindowEventOptions) {
  const stop = listen(handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
