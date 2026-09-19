import * as Haptics from 'expo-haptics';

export async function tap(kind: 'light' | 'medium' | 'success' | 'error'): Promise<void> {
  try {
    if (kind === 'success') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    else if (kind === 'error') await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    else if (kind === 'medium') await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    else await Haptics.selectionAsync();
  } catch {
    // haptics unavailable (web) — silent
  }
}
