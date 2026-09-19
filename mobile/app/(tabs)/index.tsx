import { Link, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Screen } from '@/src/components/ui/Screen';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { ProgressBar } from '@/src/components/ui/ProgressBar';
import { REALMS } from '@/src/features/game/data';
import { useTowerStore } from '@/src/features/game/store';
import { colors, motion, typography } from '@/src/theme';

export default function TowerScreen() {
  const router = useRouter();
  const { currentRealmId, xpByRealm, shards, level, onboardingDone } = useTowerStore();
  const current = REALMS.find((r) => r.id === currentRealmId) ?? REALMS[0];
  if (!current) throw new Error('No realms seeded');

  useEffect(() => {
    if (!onboardingDone) router.replace('/onboarding');
  }, [onboardingDone, router]);

  const xp = xpByRealm[current.id] ?? 0;

  return (
    <Screen>
      <Animated.View entering={motion.entering.rise()}>
        <Text style={[typography.label, { color: colors.gold }]}>TOWER OF SOL</Text>
        <Text style={[typography.display, { color: colors.ink, marginTop: 4 }]}>
          Ascend the Tower
        </Text>
        <Text style={[typography.body, { color: colors.dim, marginTop: 6 }]}>
          Level {level} · {shards} shards — a premium multiplayer ascension. No wallets, no charts.
        </Text>
      </Animated.View>

      <Card accent={current.accent}>
        <Badge label={`${current.epithet} · LIVE`} tone="violet" />
        <Text style={[typography.h1, { color: colors.ink }]}>{current.name}</Text>
        <Text style={[typography.body, { color: colors.dim }]}>{current.tagline}</Text>
        <Text style={[typography.caption, { color: colors.faint }]}>
          Guardian: {current.guardian.name} · {current.guardian.title} · held{' '}
          {current.guardian.heldSince}
        </Text>
        <ProgressBar value={xp} max={current.xpThreshold} accent={current.accent} />
        <Text style={[typography.caption, { color: colors.dim }]}>
          {xp} / {current.xpThreshold} XP to transcend
        </Text>
        <Button title="Enter Realm" onPress={() => router.push(`/realm/${current.id}`)} />
        <Link href={`/trial/${current.trials[0]?.id ?? 'shadow-match'}`} asChild>
          <Button
            title="Begin Trial"
            variant="ghost"
            onPress={() => router.push(`/trial/${current.trials[0]?.id ?? 'shadow-match'}`)}
          />
        </Link>
      </Card>

      <Text style={[typography.h2, { color: colors.ink }]}>How ascension works</Text>
      {[
        ['1 · Glance', 'Free signal the moment the round opens.'],
        ['2 · Probe', 'Spend seconds off the clock to reveal one more layer.'],
        ['3 · Commit', 'Stake Focus: Low / Med / High. Higher pays more, risks more.'],
        ['4 · Resolve', 'Proportional payout. Next round starts immediately.'],
      ].map(([t, d]) => (
        <Card key={t}>
          <Text style={[typography.body, { color: colors.ink, fontWeight: '700' }]}>{t}</Text>
          <Text style={[typography.caption, { color: colors.dim }]}>{d}</Text>
        </Card>
      ))}

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button
          title="How Guardians work"
          variant="ghost"
          onPress={() => router.push('/realm/shadows')}
        />
      </View>
    </Screen>
  );
}
