import { create } from 'zustand';
import type { RealmId } from '@/src/features/game/types';

interface TowerState {
  currentRealmId: RealmId;
  xpByRealm: Record<RealmId, number>;
  shards: number;
  level: number;
  onboardingDone: boolean;
  selectRealm: (id: RealmId) => void;
  addXp: (realmId: RealmId, amount: number, shards: number) => void;
  completeOnboarding: () => void;
}

export const useTowerStore = create<TowerState>()((set) => ({
  currentRealmId: 'shadows',
  xpByRealm: { shadows: 1240, flow: 0, artifacts: 0 },
  shards: 86,
  level: 7,
  onboardingDone: false,
  selectRealm: (id) => set({ currentRealmId: id }),
  addXp: (realmId, amount, shards) =>
    set((s) => ({
      xpByRealm: { ...s.xpByRealm, [realmId]: Math.max(0, (s.xpByRealm[realmId] ?? 0) + amount) },
      shards: Math.max(0, s.shards + shards),
    })),
  completeOnboarding: () => set({ onboardingDone: true }),
}));
