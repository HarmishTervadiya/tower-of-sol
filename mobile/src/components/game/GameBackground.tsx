import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, resolveRealmTheme, semantic } from '@/src/theme';

/**
 * Layered game background: atmosphere gradient → optional radial burst →
 * legibility scrims → content. Screens pick a Realm (or default Tower),
 * never gradient stops.
 *
 * Full-bleed photographic art goes in `artwork` (rendered above the base
 * gradients, below the veil and content). The `veil` re-renders the scrims
 * above the artwork so titles stay legible over photos.
 */
export function GameBackground({
  realm,
  burst = false,
  scrim = true,
  artwork = null,
  veil = false,
  children,
  style,
}: {
  realm?: string;
  burst?: boolean;
  scrim?: boolean;
  artwork?: ReactNode;
  veil?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const rt = resolveRealmTheme(realm ?? 'tower');
  const atmosphere = gradients[rt.atmosphere];
  return (
    <View style={[{ flex: 1, backgroundColor: semantic.screenBackground }, style]}>
      <LinearGradient
        colors={atmosphere.colors}
        start={atmosphere.start}
        end={atmosphere.end}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      {burst ? (
        <LinearGradient
          colors={gradients.burst.colors}
          start={gradients.burst.start}
          end={gradients.burst.end}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      ) : null}
      {scrim ? (
        <>
          <LinearGradient
            colors={gradients.scrimTop.colors}
            start={gradients.scrimTop.start}
            end={gradients.scrimTop.end}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%' }}
          />
          <LinearGradient
            colors={gradients.scrimBottom.colors}
            start={gradients.scrimBottom.start}
            end={gradients.scrimBottom.end}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '65%' }}
          />
        </>
      ) : null}
      {artwork}
      {veil ? (
        <>
          <LinearGradient
            colors={gradients.scrimTop.colors}
            start={gradients.scrimTop.start}
            end={gradients.scrimTop.end}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%' }}
            pointerEvents="none"
          />
          <LinearGradient
            colors={gradients.scrimBottom.colors}
            start={gradients.scrimBottom.start}
            end={gradients.scrimBottom.end}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '65%' }}
            pointerEvents="none"
          />
        </>
      ) : null}
      {children}
    </View>
  );
}
