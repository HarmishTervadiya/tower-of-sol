import type { Confidence, RoundResult } from '@/src/features/game/types';

/** v1 payout curve — tunable open item from outline. Focus resets to 100 each round. */
const MULT: Record<Confidence, { win: number; loss: number }> = {
  low: { win: 1.0, loss: 0.25 },
  med: { win: 1.75, loss: 0.5 },
  high: { win: 2.75, loss: 1.0 },
} as const;

export const BASE_XP = 20;
export const CEILING_XP = 60;

export function resolveRound(args: {
  correct: boolean;
  confidence: Confidence;
  probeUsed: boolean;
}): RoundResult {
  const { correct, confidence, probeUsed } = args;
  const m = MULT[confidence];
  if (correct) {
    const payoutXp = Math.round(BASE_XP * m.win + (probeUsed ? 5 : 0));
    return { correct: true, payoutXp, payoutShards: Math.round(payoutXp / 4) };
  }
  const penalty = Math.round(CEILING_XP * m.loss);
  return { correct: false, payoutXp: -penalty, payoutShards: 0 };
}
