import type { RealmId, Trial } from '@/src/features/game/types';
import { REALMS } from '@/src/features/game/data';

/** Service seam: UI depends on this interface. Mock now; Express/Anchor later. */
export interface GameService {
  listRealms(): Promise<typeof REALMS>;
  getRealm(id: RealmId): Promise<(typeof REALMS)[number]>;
  listTrials(realmId: RealmId): Promise<Trial[]>;
}

export const mockGameService: GameService = {
  async listRealms() {
    return REALMS;
  },
  async getRealm(id) {
    const realm = REALMS.find((r) => r.id === id);
    if (!realm) throw new Error(`Unknown realm: ${id}`);
    return realm;
  },
  async listTrials(realmId) {
    const realm = REALMS.find((r) => r.id === realmId);
    if (!realm) throw new Error(`Unknown realm: ${realmId}`);
    return realm.trials;
  },
};
