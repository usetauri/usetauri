import type { BaseDirectory, FileInfo } from '@tauri-apps/plugin-fs'
import { lstat, readDir, stat } from '@tauri-apps/plugin-fs'

export interface WalkOptions<T> {
  /**
   * Whether to walk the directory recursively.
   *
   * @default false
   */
  recursive?: boolean

  /**
   * @default false
   */
  followSymlinks?: boolean

  baseDir?: BaseDirectory

  /**
   * Return false to skip the file.
   * It will not be return by the generator.
   *
   * #### Note: to skip recursing into a directory, use the {@link recurse} option.
   */
  include?: (entry: FileSystemEntry) => boolean

  /**
   * Return false to skip recursing into the directory.
   */
  recurse?: (entry: FileSystemEntry) => boolean

  /**
   * Transforms the file entry before yielding it.
   */
  transform?: (entry: FileSystemEntry) => T | Promise<T>
}

export interface FileSystemEntry extends FileInfo {
  /**
   * The name of the entry (file name with extension or directory name).
   */
  name: string

  /**
   * The full path to the file.
   */
  path: string

  /**
   * The parent directory of the file.
   */
  parentPath: string
}

/**
 * Walks *breadth-first* the directory tree starting from the given path.
 *
 * Breadth-first search (BFS) will traverse first all the children of the current node before moving to the next level.
 */
export async function * walk<T = FileSystemEntry>(path: string, options?: WalkOptions<T>): AsyncGenerator<T, void, unknown> {
  const queue: string[] = [path]

  while (queue.length > 0) {
    const currentPath = queue.shift()!
    const dir = await readDir(currentPath, { baseDir: options?.baseDir })

    for (const dirEntry of dir) {
      // Guess the appropriate delimited
      const fullPath = `${currentPath}${currentPath.includes('\\') ? '\\' : '/'}${dirEntry.name}`
      const stats = await (options?.followSymlinks ? lstat : stat)(fullPath, { baseDir: options?.baseDir })

      const entry: FileSystemEntry = {
        ...stats,
        name: dirEntry.name,
        path: fullPath,
        parentPath: currentPath,
      }

      if (
        options?.recursive
        && stats.isDirectory
        && (!options?.recurse || options.recurse(entry))
      ) {
        queue.push(fullPath)
      }

      if (!options?.include || options.include(entry)) {
        yield options?.transform ? await options.transform(entry) : entry as T
      }
    }
  }
}
