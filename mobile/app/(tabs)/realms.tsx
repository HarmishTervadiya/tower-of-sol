import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { Screen } from '@/src/components/ui/Screen';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { REALMS } from '@/src/features/game/data';
import { colors, typography } from '@/src/theme';

export default function RealmsScreen() {
  const router = useRouter();
  return (
    <Screen>
      <Text style={[typography.label, { color: colors.gold }]}>THE TOWER</Text>
      <Text style={[typography.display, { color: colors.ink }]}>Realms</Text>
      <Text style={[typography.body, { color: colors.dim }]}>
        Any player can play any live Realm immediately. Level affects reward, never access.
      </Text>
      {REALMS.map((r) => (
        <Pressable
          key={r.id}
          accessibilityRole="button"
          onPress={() => router.push(`/realm/${r.id}`)}
        >
          <Card accent={r.accent}>
            <Badge
              label={r.status === 'live' ? 'LIVE' : 'SEALED · PREVIEW'}
              tone={r.status === 'live' ? 'gold' : 'dim'}
            />
            <Text style={[typography.h1, { color: colors.ink }]}>{r.name}</Text>
            <Text style={[typography.caption, { color: colors.faint }]}>{r.epithet}</Text>
            <Text style={[typography.body, { color: colors.dim }]}>{r.tagline}</Text>
            <Text style={[typography.caption, { color: colors.dim }]}>
              {r.trials.length} trial{r.trials.length === 1 ? '' : 's'} · Guardian:{' '}
              {r.guardian.name}
            </Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}
