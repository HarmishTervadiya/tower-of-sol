export type RealmId = 'shadows' | 'flow' | 'artifacts';

export type Confidence = 'low' | 'med' | 'high';

export type RoundPhase = 'glance' | 'probe' | 'commit' | 'resolve';

export interface Guardian {
  name: string;
  title: string;
  heldSince: string;
  timeWeight: number;
}

export interface Trial {
  id: string;
  realmId: RealmId;
  title: string;
  kind: string;
  prompt: string;
  options: readonly [string, string, string];
  answerIndex: 0 | 1 | 2;
  signal: string;
  probeSignal: string;
}

export interface Realm {
  id: RealmId;
  name: string;
  epithet: string;
  tagline: string;
  accent: string;
  status: 'live' | 'sealed';
  guardian: Guardian;
  xp: number;
  xpThreshold: number;
  bypass: string;
  trials: Trial[];
}

export interface RoundResult {
  correct: boolean;
  payoutXp: number;
  payoutShards: number;
}
