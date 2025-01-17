import type { UseTauriWindowEventOptions, WindowDragDropEventHandler } from '@usetauri/core'
import { useTauriWindowDragDropEvent as listen } from '@usetauri/core'
import { tryOnScopeDispose } from '@vueuse/core'

/**
 * ### Example
 * ```vue
 * <script setup lang="ts">
 * import { useTauriWindowDragDropEvent } from '@usetauri/vue'
 *
 * useTauriWindowDragDropEvent((event) => {
 *  console.log(event)
 * })
 * </script>
 * ```
 */
export function useTauriWindowDragDropEvent(handler: WindowDragDropEventHandler, opts?: UseTauriWindowEventOptions) {
  const stop = listen(handler, opts)
  tryOnScopeDispose(stop)
  return stop
}
