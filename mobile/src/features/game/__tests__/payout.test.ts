import { resolveRound } from '@/src/features/game/payout';

describe('resolveRound payout curve', () => {
  it('pays more for higher confidence when correct', () => {
    const low = resolveRound({ correct: true, confidence: 'low', probeUsed: false });
    const med = resolveRound({ correct: true, confidence: 'med', probeUsed: false });
    const high = resolveRound({ correct: true, confidence: 'high', probeUsed: false });
    expect(high.payoutXp).toBeGreaterThan(med.payoutXp);
    expect(med.payoutXp).toBeGreaterThan(low.payoutXp);
    expect(low.payoutShards).toBeGreaterThan(0);
  });

  it('penalizes higher confidence more when wrong', () => {
    const low = resolveRound({ correct: false, confidence: 'low', probeUsed: false });
    const high = resolveRound({ correct: false, confidence: 'high', probeUsed: false });
    expect(high.payoutXp).toBeLessThan(low.payoutXp);
    expect(high.payoutShards).toBe(0);
  });

  it('adds a small probe bonus on correct', () => {
    const a = resolveRound({ correct: true, confidence: 'med', probeUsed: false });
    const b = resolveRound({ correct: true, confidence: 'med', probeUsed: true });
    expect(b.payoutXp).toBeGreaterThan(a.payoutXp);
  });
});
