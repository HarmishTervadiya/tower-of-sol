import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

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
        <Text style={[typography.h1, { color: colors.ink }]}>This floor doesn&apos;t exist.</Text>
        <Link href="/" style={{ marginTop: spacing.sm }}>
          <Text style={[typography.body, { color: colors.gold }]}>Return to the Tower</Text>
        </Link>
      </View>
    </>
  );
}
