import type { Awaitable, TauriWindow, UnlistenFn } from '../types'
import { getTauriWindow } from '../getTauriWindow'

export type TauriWindowEventName = {
  [K in keyof TauriWindow]: TauriWindow[K] extends ((handler: any) => Promise<UnlistenFn>) ? K : never;
}[keyof TauriWindow]

export type TauriWindowEventHandler<T extends TauriWindowEventName> = T extends keyof TauriWindow
  ? Parameters<TauriWindow[T]>[0]
  : never

export interface UseWindowEventOptions {
  /**
   * An error handler that fires when adding the event listener fails.
   * This typically occur when you do not have the associated permission to listen to the event.
   */
  onError?: (err: Error) => void
}

/**
 * Adds an event listener to the current Tauri window.
 *
 * @remarks
 * _Requires the `core:event:allow-listen` permission._
 *
 * @remarks
 * _Does nothing on when `Tauri` is not available._
 */
export function useTauriWindowEvent<const T extends TauriWindowEventName>(key: T, handler: TauriWindowEventHandler<T>, opts?: UseWindowEventOptions) {
  const window = getTauriWindow()

  if (!window) {
    return () => {}
  }

  let unlisten: UnlistenFn | undefined

  let stopped = false
  const stop = () => {
    stopped = true
    unlisten?.()
    unlisten = undefined
  }

  const listen = async () => {
    try {
      unlisten = await window[key](handler as any)
    }
    catch (err: any) {
      opts?.onError?.(err)
    }
    finally {
      if (stopped) {
        stop()
      }
    }
  }

  return <Awaitable<UnlistenFn>>Object.assign(stop, listen().then(() => stop))
}
