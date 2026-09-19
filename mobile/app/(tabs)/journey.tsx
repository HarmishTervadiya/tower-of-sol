import { Text } from 'react-native';
import { Screen } from '@/src/components/ui/Screen';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { useTowerStore } from '@/src/features/game/store';
import { REALMS } from '@/src/features/game/data';
import { colors, typography } from '@/src/theme';

export default function JourneyScreen() {
  const { level, shards, xpByRealm } = useTowerStore();
  return (
    <Screen>
      <Text style={[typography.label, { color: colors.gold }]}>CLIMBER RECORD</Text>
      <Text style={[typography.display, { color: colors.ink }]}>Journey</Text>
      <Card accent={colors.gold}>
        <Badge label={`LEVEL ${level}`} tone="gold" />
        <Text style={[typography.h1, { color: colors.ink }]}>{shards} Shards</Text>
        <Text style={[typography.caption, { color: colors.dim }]}>
          Free lane: shards + SKR-track rewards from skill. Premium lane (Crystals) is
          cosmetics/titles only — never crosses.
        </Text>
      </Card>
      {REALMS.map((r) => (
        <Card key={r.id} accent={r.accent}>
          <Text style={[typography.body, { color: colors.ink, fontWeight: '700' }]}>{r.name}</Text>
          <Text style={[typography.caption, { color: colors.dim }]}>
            {xpByRealm[r.id] ?? 0} / {r.xpThreshold} XP · Bypass: {r.bypass}
          </Text>
        </Card>
      ))}
    </Screen>
  );
}
