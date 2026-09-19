import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { queryClient } from '@/src/lib/query-client';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) void SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0B0B16' } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="realm/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="trial/[trialId]" options={{ presentation: 'card' }} />
        <Stack.Screen name="onboarding" options={{ presentation: 'modal' }} />
      </Stack>
    </QueryClientProvider>
  );
}
