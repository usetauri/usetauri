import { getTauriWindow } from '../getTauriWindow'

/**
 * Minimizes the window.
 *
 * @remarks
 * _Does nothing on when `Tauri` is not available._
 */
export async function windowMinimize() {
  await getTauriWindow()?.minimize()
}

/**
 * Maximizes the window.
 *
 * @remarks
 * _Does nothing on when `Tauri` is not available._
 */
export async function windowMaximize() {
  await getTauriWindow()?.maximize()
}

/**
 * Unminimizes the window.
 *
 * @remarks
 * _Does nothing on when `Tauri` is not available._
 */
export async function windowUnminimize() {
  await getTauriWindow()?.unminimize()
}

/**
 * Toggles the window maximized state.
 *
 * @remarks
 * _Does nothing on when `Tauri` is not available._
 */
export async function windowToggleMaximize() {
  await getTauriWindow()?.toggleMaximize()
}

/**
 * Sets the window visibility to true.
 *
 * @remarks
 * _Does nothing on when `Tauri` is not available._
 */
export async function windowShow() {
  await getTauriWindow()?.show()
}

/**
 * Sets the window visibility to false.
 *
 * @remarks
 * _Does nothing on when `Tauri` is not available._
 */
export async function windowHide() {
  await getTauriWindow()?.hide()
}

/**
 * Closes the window.
 *
 * @remarks
 * _Does nothing on when `Tauri` is not available._
 */
export async function windowClose() {
  await getTauriWindow()?.close()
}
