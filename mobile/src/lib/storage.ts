import type { MMKV } from 'react-native-mmkv';
import { createMMKV } from 'react-native-mmkv';

/** Lazily created so Jest/Web never touch native modules at import time. */
let instance: MMKV | null = null;

export function storage(): MMKV {
  if (instance === null) instance = createMMKV({ id: 'tower-of-sol' });
  return instance;
}
