import type { Awaitable, Maybe, TauriWindow } from '@usetauri/core'
import type { Ref } from 'vue'
import { getTauriWindow } from '@usetauri/core'
import { ref } from 'vue'

export interface UseTauriWindowState extends Pick<
  TauriWindow,
  | 'maximize'
  | 'unmaximize'
  | 'toggleMaximize'
  | 'minimize'
  | 'unminimize'
  | 'show'
  | 'hide'
  | 'close'
> {
  /**
   * Alias of {@link TauriWindow.close}
   */
  closeWindow: () => Promise<void>

  isFullscreen: Ref<boolean>
  isMinimized: Ref<boolean>
  isMaximized: Ref<boolean>
  isFocused: Ref<boolean>
  isDecorated: Ref<boolean>
  isResizable: Ref<boolean>
  isMaximizable: Ref<boolean>
  isMinimizable: Ref<boolean>
  isClosable: Ref<boolean>
  isVisible: Ref<boolean>
  isEnabled: Ref<boolean>
}

export function useTauriWindowState(window?: Maybe<TauriWindow>) {
  window ||= getTauriWindow()

  const isFullscreen = ref(false)
  const isMinimized = ref(false)
  const isMaximized = ref(false)
  const isFocused = ref(false)
  const isDecorated = ref(false)
  const isResizable = ref(false)
  const isMaximizable = ref(false)
  const isMinimizable = ref(false)
  const isClosable = ref(false)
  const isVisible = ref(false)
  const isEnabled = ref(false)

  // TODO: use events to listen for changes
  const snapshot = async () => {
    if (!window) {
      return
    }

    const [
      _isFullscreen,
      _isMinimized,
      _isMaximized,
      _isFocused,
      _isDecorated,
      _isResizable,
      _isMaximizable,
      _isMinimizable,
      _isClosable,
      _isVisible,
      _isEnabled,
    ] = await Promise.allSettled([
      window.isFullscreen(),
      window.isMinimized(),
      window.isMaximized(),
      window.isFocused(),
      window.isDecorated(),
      window.isResizable(),
      window.isMaximizable(),
      window.isMinimizable(),
      window.isClosable(),
      window.isVisible(),
      window.isEnabled(),
    ])

    isFullscreen.value = (_isFullscreen as PromiseFulfilledResult<boolean>).value === true
    isMinimized.value = (_isMinimized as PromiseFulfilledResult<boolean>).value === true
    isMaximized.value = (_isMaximized as PromiseFulfilledResult<boolean>).value === true
    isFocused.value = (_isFocused as PromiseFulfilledResult<boolean>).value === true
    isDecorated.value = (_isDecorated as PromiseFulfilledResult<boolean>).value === true
    isResizable.value = (_isResizable as PromiseFulfilledResult<boolean>).value === true
    isMaximizable.value = (_isMaximizable as PromiseFulfilledResult<boolean>).value === true
    isMinimizable.value = (_isMinimizable as PromiseFulfilledResult<boolean>).value === true
    isClosable.value = (_isClosable as PromiseFulfilledResult<boolean>).value === true
    isVisible.value = (_isVisible as PromiseFulfilledResult<boolean>).value === true
    isEnabled.value = (_isEnabled as PromiseFulfilledResult<boolean>).value === true
  }

  const call = async (key:
    | 'maximize'
    | 'unmaximize'
    | 'toggleMaximize'
    | 'minimize'
    | 'unminimize'
    | 'show'
    | 'hide'
    | 'close',
  ) => {
    if (window) {
      await window[key]()
      await snapshot()
    }
  }

  const state = <UseTauriWindowState>{
    isFullscreen,
    isMinimized,
    isMaximized,
    isFocused,
    isDecorated,
    isResizable,
    isMaximizable,
    isMinimizable,
    isClosable,
    isVisible,
    isEnabled,

    maximize: () => call('maximize'),
    unmaximize: () => call('unmaximize'),
    toggleMaximize: () => call('toggleMaximize'),
    minimize: () => call('minimize'),
    unminimize: () => call('unminimize'),
    show: () => call('show'),
    hide: () => call('hide'),
    close: () => call('close'),
    closeWindow: () => call('close'),
  }

  const promise = snapshot().then(() => state)
  return <Awaitable<UseTauriWindowState>>Object.assign(promise, state)
}
