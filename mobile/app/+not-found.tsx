import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { colors, spacing, typeScale } from '@/src/theme/tokens';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Lost in the Tower' }} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.lg,
          backgroundColor: colors.void,
          gap: spacing.sm,
        }}
      >
        <Text style={[typeScale.h1, { color: colors.ink }]}>This floor doesn&apos;t exist.</Text>
        <Link href="/(tabs)" style={{ marginTop: spacing.sm }}>
          <Text style={[typeScale.body, { color: colors.gold }]}>Return to the Tower</Text>
        </Link>
      </View>
    </>
  );
}
