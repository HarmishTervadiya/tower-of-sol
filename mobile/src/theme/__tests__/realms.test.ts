import { composeRealmTheme, resolveRealmTheme, type RealmThemeKey } from '@/src/theme/realms';

describe('resolveRealmTheme composition', () => {
  it('returns per-realm accents without touching component styles', () => {
    expect(resolveRealmTheme('shadows').accent).toBe(resolveRealmTheme('shadows').glow);
    expect(resolveRealmTheme('order').atmosphere).toBe('frostMarket');
    expect(resolveRealmTheme('wealth').accent).toBe(resolveRealmTheme('artifacts').accent);
  });

  it('falls back to Tower gold for unknown keys', () => {
    expect(resolveRealmTheme('nope').accent).toBe(resolveRealmTheme('artifacts').accent);
  });

  it('composes guardian overlays without rewriting the base', () => {
    const base = resolveRealmTheme('shadows');
    const overlaid = composeRealmTheme(base, { glow: '#FFFFFF' });
    expect(overlaid.glow).toBe('#FFFFFF');
    expect(overlaid.accent).toBe(base.accent);
    expect(base.glow).not.toBe('#FFFFFF');
  });

  it('covers every declared realm key', () => {
    const keys: RealmThemeKey[] = ['shadows', 'flow', 'artifacts', 'order', 'wealth'];
    for (const key of keys) {
      expect(resolveRealmTheme(key).key).toBe(key);
    }
  });
});
