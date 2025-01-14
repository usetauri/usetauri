import type { Store } from '@tauri-apps/plugin-store'
import type { MaybeRefOrGetter, RemovableRef, UseStorageAsyncOptions } from '@vueuse/core'
import { useStorageAsync } from '@vueuse/core'

export interface UseTauriStoreOptions<T> extends Omit<UseStorageAsyncOptions<T>, 'serializer' | 'listenToStorageChanges'> {
}

/**
 * ## Usage:
 * ```ts
 * import { load } from '@tauri-apps/plugin-store'
 *
 * const store = await load('settings.json', {
 *  autoSave: true,
 *  createNew:true
 * })
 *
 * const state = useTauriStore(store, 'settings', {})
 * ```
 *
 * @remarks
 * `mergeDefaults` defaults to `true`
 */
export function useTauriStore<T>(store: Store, key: string, initialValue: MaybeRefOrGetter<T>, options?: UseTauriStoreOptions<T>): RemovableRef<T>
export function useTauriStore<T = unknown>(store: Store, key: string, initialValue: MaybeRefOrGetter<null>, options?: UseTauriStoreOptions<T>): RemovableRef<T>
export function useTauriStore<T = unknown>(store: Store, key: string, initialValue: MaybeRefOrGetter<T>, options?: UseTauriStoreOptions<T>): RemovableRef<T> {
  return useStorageAsync<T>(
    key,
    initialValue,
    {
      async getItem(key) {
        return await store.get(key) as string
      },
      async removeItem(key) {
        await store.delete(key)
      },
      async setItem(key, value) {
        await store.set(key, value)
      },
    },
    {
      serializer: {
        read(raw) {
          return raw as T
        },
        write(value) {
          return value as string
        },
      },
      mergeDefaults: true,
      listenToStorageChanges: false,
      ...options,
    },
  )
}
