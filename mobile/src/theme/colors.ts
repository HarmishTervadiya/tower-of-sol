/** Base palette — dark fantasy RPG. Screens must use these, never raw hex. */
export const colors = {
  void: '#0B0B16',
  abyss: '#121222',
  surface: '#1A1A2E',
  surface2: '#23233B',
  line: '#2E2E4D',
  gold: '#E8B44A',
  goldSoft: '#F5D48A',
  goldDeep: '#2A2111',
  inkOnGold: '#1A1206',
  violet: '#7C5CFF',
  violetSoft: '#A68CFF',
  violetDeep: '#221D3D',
  ember: '#FF6B4A',
  jade: '#3DDC97',
  frost: '#7BDFF2',
  ink: '#F4F1EA',
  dim: '#A7A7C4',
  faint: '#6B6B8A',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorToken = keyof typeof colors;

/** Rarity/state colors for loot, trials, progression — shared across Realms. */
export const rarity = {
  common: '#A7A7C4',
  uncommon: '#3DDC97',
  rare: '#7BDFF2',
  epic: '#7C5CFF',
  legendary: '#E8B44A',
} as const;

export type Rarity = keyof typeof rarity;

/** Realm / progression states. Per-Realm accents stay in game data (`Realm.accent`). */
export const state = {
  live: '#3DDC97',
  sealed: '#6B6B8A',
  locked: '#3A3A55',
  contested: '#FF6B4A',
  transcending: '#E8B44A',
} as const;

export type RealmState = keyof typeof state;
