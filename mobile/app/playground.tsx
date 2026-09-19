import { Redirect } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, { FadeIn, useReducedMotion } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GameBackground,
  GameButton,
  GamePanel,
  GameProgress,
  GameText,
  GlowView,
  RarityBadge,
  RealmSigil,
  RewardRow,
  RingProgress,
} from '@/src/components/game';
import {
  motion,
  resolveRealmTheme,
  semantic,
  spacing,
  type Rarity,
  type RealmThemeKey,
} from '@/src/theme';

const REALMS: RealmThemeKey[] = ['shadows', 'flow', 'artifacts', 'order', 'wealth'];
const RARITIES: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

/**
 * UI ARCHITECTURE PLAYGROUND — dev only. Validates that the theme system,
 * primitives, realm overrides, and motion presets compose without duplicated
 * styles. Not a game screen; never linked from production navigation.
 */
export default function PlaygroundScreen() {
  const reduced = useReducedMotion();
  const [realm, setRealm] = useState<RealmThemeKey>('shadows');
  if (!__DEV__) return <Redirect href="/" />;

  const rt = resolveRealmTheme(realm);
  const enter = (i: number) => (reduced ? FadeIn.duration(80) : motion.entering.rise(i * 60));

  return (
    <GameBackground realm={realm} burst>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <ScrollView
          contentContainerStyle={{
            padding: spacing.lg,
            gap: spacing.lg,
            paddingBottom: spacing.xxl,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={enter(0)}>
            <GameText variant="display">PLAYGROUND</GameText>
            <GameText variant="caption" tone="secondary">
              Theme architecture validation — realm override: {rt.key}
            </GameText>
          </Animated.View>

          <Animated.View entering={enter(1)}>
            <GameText variant="label" tone="secondary">
              REALM OVERRIDE (NO STYLE DUPLICATION)
            </GameText>
            <View style={{ flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' }}>
              {REALMS.map((key) => {
                const active = key === realm;
                const theme = resolveRealmTheme(key);
                return (
                  <Pressable
                    key={key}
                    onPress={() => setRealm(key)}
                    style={{
                      paddingVertical: spacing.sm,
                      paddingHorizontal: spacing.md,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: active ? theme.accent : semantic.line,
                      backgroundColor: active ? theme.accentDeep : 'transparent',
                    }}
                  >
                    <GameText variant="label" tone={active ? 'primary' : 'faint'}>
                      {key.toUpperCase()}
                    </GameText>
                  </Pressable>
                );
              })}
            </View>
          </Animated.View>

          <Animated.View entering={enter(2)}>
            <GamePanel variant="ornate">
              <GameText variant="title">Realm of {rt.key}</GameText>
              <GameText variant="body" tone="secondary">
                Accent, glow, and atmosphere resolve from one key. Panels, progress, and sigils
                below re-tint with zero style rewrites.
              </GameText>
              <GameProgress value={1240} max={2000} realm={realm} />
              <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
                <RealmSigil realm={realm} mark="◈" />
                <RingProgress value={0.62} size={96} accent={rt.accent} label="08" />
                <GlowView accent={rt.glow} pulse>
                  <RealmSigil realm={realm} mark="G" size={64} />
                </GlowView>
              </View>
            </GamePanel>
          </Animated.View>

          <Animated.View entering={enter(3)}>
            <GameText variant="label" tone="secondary">
              TYPOGRAPHY
            </GameText>
            <GamePanel>
              <GameText variant="display">KAZE ASCENDS</GameText>
              <GameText variant="title">Floor 03 Wealth cleared</GameText>
              <GameText variant="body" tone="secondary">
                Body copy for trial prompts and lore.
              </GameText>
              <GameText variant="caption" tone="faint">
                Caption for hints and metadata.
              </GameText>
              <GameText variant="timer">18:42:16</GameText>
            </GamePanel>
          </Animated.View>

          <Animated.View entering={enter(4)}>
            <GameText variant="label" tone="secondary">
              ACTIONS
            </GameText>
            <GameButton title="Enter Realm" onPress={() => undefined} />
            <GameButton title="Enter Trial" variant="ghost" onPress={() => undefined} />
            <GameButton title="Abandon" variant="danger" shape="soft" onPress={() => undefined} />
          </Animated.View>

          <Animated.View entering={enter(5)}>
            <GameText variant="label" tone="secondary">
              STATES
            </GameText>
            <GameProgress value={2000} max={2000} realm={realm} tone="complete" />
            <GameProgress value={28} max={60} realm={realm} timerLabel="00:28" />
            <View style={{ flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' }}>
              {RARITIES.map((r) => (
                <RarityBadge key={r} rarity={r} />
              ))}
            </View>
            <GamePanel variant="translucent">
              <RewardRow
                icon={<GameText variant="body">◆</GameText>}
                amount="+240 XP"
                caption="trial cleared"
              />
              <RewardRow
                icon={<GameText variant="body">●</GameText>}
                amount="+1.8 SKR"
                caption="treasury claim"
              />
            </GamePanel>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </GameBackground>
  );
}
