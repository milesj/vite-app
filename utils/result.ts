// Electron loses error information when passing through IPC,
// so to work around this, we're using a Rust Result like API.
// https://github.com/electron/electron/issues/24427

export type Result<T> = [T, Error | null];

export function ok<T>(value: T): Result<T> {
  return [value, null];
}

export function err<T = unknown>(value: string | Error): Result<T> {
  // @ts-expect-error Allow null
  return [null, value instanceof Error ? value : new Error(value)];
}
