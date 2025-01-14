export type { UnlistenFn } from '@tauri-apps/api/event'
export type { Window as TauriWindow } from '@tauri-apps/api/window'

export type Awaitable<T> = T & Promise<T>
export type Maybe<T> = T | null | undefined
