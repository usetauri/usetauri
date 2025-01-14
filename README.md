# UseTauri

Utilities to use Tauri!

_Inspired by vueuse_

Conventions:

## Usage

Most of the utilities can be optionally awaited:

```ts
const stop = useTauriWindowDragDropEvent((event) => {

})
```

```ts
const stop = await useTauriWindowDragDropEvent((event) => {

})
```

That is because Tauri's APIs are asynchronous as they need to communicate with the Rust backend.

Since `await` requires Suspense mode, you can use it as a regular function instead.

The only time where this matter is when you need to know the window state, or read the store before rendering the UI.

In those cases, you should `await` to ensure the UI do not render before the state is ready.

### Technical details

Awaitable utilities are marked with `Awaitable<>` in the type signature that intern return a Promise.

Note that however, some of the utilities return a then-able instead of a Promise.

Therefore you cant properly relay on `instanceof Promise` checks in your code.
