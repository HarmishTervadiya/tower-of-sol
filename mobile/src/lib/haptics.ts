import * as Haptics from 'expo-haptics';
import { motion, type HapticEvent } from '@/src/theme';

export type TapKind = 'light' | 'medium' | 'success' | 'error';

export async function tap(kind: TapKind): Promise<void> {
  try {
    if (kind === 'success') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    else if (kind === 'error') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    else if (kind === 'medium') await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    else await Haptics.selectionAsync();
  } catch {
    // haptics unavailable (web) — silent
  }
}

/**
 * Semantic game haptics. Screens name the *event* (commit, win, transcend…);
 * the kind mapping lives in `theme.motion.hapticMap`. One haptic per commit,
 * always paired with a visual — never per frame.
 */
export async function gameHaptic(event: HapticEvent): Promise<void> {
  const kind = motion.hapticMap[event] as TapKind;
  await tap(kind);
}
