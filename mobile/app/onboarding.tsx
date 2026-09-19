import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import { Screen } from '@/src/components/ui/Screen';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { useTowerStore } from '@/src/features/game/store';
import { colors, typography } from '@/src/theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const complete = useTowerStore((s) => s.completeOnboarding);
  return (
    <Screen>
      <Badge label="SESSION 1 · ZERO STAKES" tone="gold" />
      <Text style={[typography.display, { color: colors.ink }]}>Climb with training wheels</Text>
      <Text style={[typography.body, { color: colors.dim }]}>
        Tower → Shadows (suggested) → practice round → first real round → XP/Shard feedback.
        Realm switching, Premium shop and Expeditions unlock over later sessions.
      </Text>
      <Card accent={colors.violet}>
        <Text style={[typography.body, { color: colors.ink, fontWeight: '700' }]}>
          Practice: Match the Actor
        </Text>
        <Text style={[typography.caption, { color: colors.dim }]}>
          Glance the signal, optionally Probe, Commit Low/Med/High, Resolve. Zero stakes — learn
          the rhythm.
        </Text>
        <Button
          title="Start practice round"
          onPress={() => {
            complete();
            router.replace('/trial/shadow-match');
          }}
        />
        <Button title="Skip to Tower" variant="ghost" onPress={() => {
          complete();
          router.replace('/(tabs)');
        }} />
      </Card>
    </Screen>
  );
}
