import type { UseTauriWindowEventOptions, WindowMovedEventHandler } from '@usetauri/core'
import { useTauriWindowMovedEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

/**
 * ### Example
 * ```vue
 * <script setup lang="ts">
 * import { useTauriWindowMovedEvent } from '@usetauri/vue'
 *
 * useTauriWindowMovedEvent((event) => {
 *  console.log(event)
 * })
 * </script>
 * ```
 */
export function useTauriWindowMovedEvent(handler: WindowMovedEventHandler, opts?: UseTauriWindowEventOptions) {
  const stop = listen(handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
