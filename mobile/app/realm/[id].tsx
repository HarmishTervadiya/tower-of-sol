import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from 'react-native';
import { Screen } from '@/src/components/ui/Screen';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { ProgressBar } from '@/src/components/ui/ProgressBar';
import { REALMS } from '@/src/features/game/data';
import type { RealmId } from '@/src/features/game/types';
import { useTowerStore } from '@/src/features/game/store';
import { colors, typography } from '@/src/theme';

const IDS: RealmId[] = ['shadows', 'flow', 'artifacts'];

export default function RealmDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const realmId: RealmId = IDS.includes(id as RealmId) ? (id as RealmId) : 'shadows';
  const realm = REALMS.find((r) => r.id === realmId) ?? REALMS[0];
  if (!realm) throw new Error('Realm missing');
  const { xpByRealm } = useTowerStore();
  const xp = xpByRealm[realm.id] ?? 0;

  return (
    <Screen>
      <Badge label={`${realm.epithet} · ${realm.status.toUpperCase()}`} tone="violet" />
      <Text style={[typography.display, { color: colors.ink }]}>{realm.name}</Text>
      <Text style={[typography.body, { color: colors.dim }]}>{realm.tagline}</Text>

      <Card accent={colors.gold}>
        <Text style={[typography.label, { color: colors.gold }]}>GUARDIAN</Text>
        <Text style={[typography.h1, { color: colors.ink }]}>{realm.guardian.name}</Text>
        <Text style={[typography.caption, { color: colors.dim }]}>
          {realm.guardian.title} · held {realm.guardian.heldSince} · time-weight ×
          {realm.guardian.timeWeight}
        </Text>
        <Text style={[typography.caption, { color: colors.faint }]}>
          First to clear the contested event becomes Guardian and sets the active trial.
          Transcend pays the outgoing Guardian a time-weighted bonus.
        </Text>
      </Card>

      <Card accent={realm.accent}>
        <Text style={[typography.label, { color: colors.gold }]}>TRANSCENDENCE</Text>
        <ProgressBar value={xp} max={realm.xpThreshold} accent={realm.accent} />
        <Text style={[typography.caption, { color: colors.dim }]}>
          {xp} / {realm.xpThreshold} XP · Bypass: {realm.bypass}
        </Text>
      </Card>

      <Text style={[typography.h2, { color: colors.ink }]}>Trials</Text>
      {realm.trials.map((t) => (
        <Card key={t.id}>
          <Badge label={t.kind} tone="dim" />
          <Text style={[typography.body, { color: colors.ink, fontWeight: '700' }]}>{t.title}</Text>
          <Text style={[typography.caption, { color: colors.dim }]} numberOfLines={2}>
            {t.prompt}
          </Text>
          <Button title="Play trial" onPress={() => router.push(`/trial/${t.id}`)} />
        </Card>
      ))}
    </Screen>
  );
}
