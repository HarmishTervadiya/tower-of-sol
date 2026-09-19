import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Screen } from '@/src/components/ui/Screen';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { REALMS } from '@/src/features/game/data';
import { resolveRound } from '@/src/features/game/payout';
import { useTowerStore } from '@/src/features/game/store';
import type { Confidence, RoundPhase } from '@/src/features/game/types';
import { gameHaptic, tap } from '@/src/lib/haptics';
import { colors, motion, radii, spacing, typography } from '@/src/theme';

const CONF: { id: Confidence; label: string; hint: string }[] = [
  { id: 'low', label: 'Low', hint: '1.0× · safe' },
  { id: 'med', label: 'Med', hint: '1.75× · balanced' },
  { id: 'high', label: 'High', hint: '2.75× · bold' },
];

export default function TrialScreen() {
  const router = useRouter();
  const { trialId } = useLocalSearchParams<{ trialId: string }>();
  const trial = useMemo(
    () => REALMS.flatMap((r) => r.trials).find((t) => t.id === trialId),
    [trialId],
  );
  const addXp = useTowerStore((s) => s.addXp);
  const [phase, setPhase] = useState<RoundPhase>('glance');
  const [probeUsed, setProbe] = useState(false);
  const [confidence, setConfidence] = useState<Confidence>('med');
  const [pick, setPick] = useState<number | null>(null);

  if (!trial) {
    return (
      <Screen>
        <Text style={[typography.h1, { color: colors.ink }]}>Trial not found</Text>
        <Button title="Back to Tower" onPress={() => router.back()} />
      </Screen>
    );
  }

  const result =
    phase === 'resolve' && pick !== null
      ? resolveRound({ correct: pick === trial.answerIndex, confidence, probeUsed })
      : null;

  const commit = () => {
    if (pick === null) return;
    const correct = pick === trial.answerIndex;
    const r = resolveRound({ correct, confidence, probeUsed });
    addXp(trial.realmId, r.payoutXp, r.payoutShards);
    void gameHaptic(correct ? 'win' : 'lose');
    setPhase('resolve');
  };

  return (
    <Screen>
      <Badge
        label={`FOCUS 100 · ${phase.toUpperCase()}${probeUsed ? ' · PROBED' : ''}`}
        tone="gold"
      />
      <Text style={[typography.display, { color: colors.ink }]}>{trial.title}</Text>
      <Text style={[typography.caption, { color: colors.faint }]}>{trial.kind}</Text>

      <Animated.View entering={motion.entering.fade()} key={phase}>
        <Card accent={colors.violet}>
          <Text style={[typography.label, { color: colors.gold }]}>GLANCE — FREE SIGNAL</Text>
          <Text style={[typography.body, { color: colors.ink }]}>{trial.signal}</Text>
          <Text style={[typography.body, { color: colors.ink, fontWeight: '700', marginTop: 4 }]}>
            {trial.prompt}
          </Text>
        </Card>

        {phase !== 'glance' || probeUsed ? (
          <Card>
            <Text style={[typography.label, { color: colors.violetSoft }]}>PROBE SIGNAL</Text>
            <Text style={[typography.body, { color: colors.ink }]}>
              {probeUsed ? trial.probeSignal : 'Probe skipped — committing on glance alone.'}
            </Text>
          </Card>
        ) : null}
      </Animated.View>

      {phase === 'glance' ? (
        <View style={{ gap: spacing.sm }}>
          <Button
            title={probeUsed ? 'Probed' : 'Probe (reveal more)'}
            variant="ghost"
            disabled={probeUsed}
            onPress={() => {
              setProbe(true);
              void gameHaptic('probe');
              setPhase('probe');
            }}
          />
          <Button title="Continue to commit" onPress={() => setPhase('commit')} />
        </View>
      ) : null}

      {phase === 'probe' ? (
        <Button title="Continue to commit" onPress={() => setPhase('commit')} />
      ) : null}

      {phase === 'commit' || phase === 'resolve' ? (
        <Card>
          <Text style={[typography.label, { color: colors.gold }]}>COMMIT — PICK + CONFIDENCE</Text>
          <View style={{ gap: spacing.sm }}>
            {trial.options.map((opt, i) => {
              const active = pick === i;
              const revealed = phase === 'resolve';
              const isAnswer = i === trial.answerIndex;
              return (
                <Pressable
                  key={opt}
                  disabled={phase === 'resolve'}
                  onPress={() => {
                    setPick(i);
                    void tap('light');
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: revealed && isAnswer ? colors.jade : active ? colors.gold : colors.line,
                    backgroundColor: active ? colors.goldDeep : colors.surface2,
                    borderRadius: radii.md,
                    padding: spacing.md,
                  }}
                >
                  <Text style={[typography.body, { color: colors.ink }]}>{opt}</Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={[typography.label, { color: colors.dim, marginTop: spacing.sm }]}>
            CONFIDENCE (FOCUS)
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            {CONF.map((c) => (
              <Pressable
                key={c.id}
                disabled={phase === 'resolve'}
                onPress={() => setConfidence(c.id)}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: confidence === c.id ? colors.gold : colors.line,
                  borderRadius: radii.md,
                  padding: spacing.sm,
                  alignItems: 'center',
                  backgroundColor: confidence === c.id ? colors.goldDeep : 'transparent',
                }}
              >
                <Text style={[typography.body, { color: colors.ink, fontWeight: '700' }]}>{c.label}</Text>
                <Text style={[typography.caption, { color: colors.dim }]}>{c.hint}</Text>
              </Pressable>
            ))}
          </View>
          {phase === 'commit' ? (
            <Button
              title={pick === null ? 'Pick an answer' : 'Resolve round'}
              disabled={pick === null}
              onPress={commit}
            />
          ) : null}
        </Card>
      ) : null}

      {phase === 'resolve' && result ? (
        <Card accent={result.correct ? colors.jade : colors.ember}>
          <Text style={[typography.h1, { color: colors.ink }]}>
            {result.correct ? 'Trial cleared' : 'Trial failed'}
          </Text>
          <Text style={[typography.body, { color: colors.dim }]}>
            {result.correct
              ? `+${result.payoutXp} XP · +${result.payoutShards} shards — the Tower notices.`
              : `${result.payoutXp} XP — the Tower takes its cut. No shards.`}
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <View style={{ flex: 1 }}>
              <Button title="Next round" onPress={() => router.back()} />
            </View>
            <View style={{ flex: 1 }}>
              <Button title="Tower" variant="ghost" onPress={() => router.replace('/(tabs)')} />
            </View>
          </View>
        </Card>
      ) : null}
    </Screen>
  );
}
