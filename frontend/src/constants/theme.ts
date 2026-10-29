export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
  isDark: boolean;
  bg: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  borderSubtle: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  primary: string;
  accent: string;
  accentText: string;
  cyan: string;
  purple: string;
  amber: string;
  dangerBg: string;
  dangerBorder: string;
  dangerText: string;
  successBg: string;
  successBorder: string;
  successText: string;
  switchActiveTrack: string;
  switchInactiveTrack: string;
  switchActiveThumb: string;
  switchInactiveThumb: string;
}

export const getTheme = (mode: ThemeMode): ThemeColors => {
  const isDark = mode === 'dark';
  return {
    isDark,
    bg: isDark ? '#0b0c16' : '#f1f5f9',
    surface: isDark ? '#131525' : '#ffffff',
    surfaceElevated: isDark ? '#1a1d33' : '#f8fafc',
    border: isDark ? '#262a49' : '#e2e8f0',
    borderSubtle: isDark ? '#1c1f36' : '#edf2f7',
    text: isDark ? '#f8fafc' : '#0f172a',
    textMuted: isDark ? '#94a3b8' : '#64748b',
    textSubtle: isDark ? '#64748b' : '#94a3b8',
    primary: isDark ? '#6366f1' : '#4f46e5',
    accent: isDark ? '#6366f1' : '#4f46e5',
    accentText: '#ffffff',
    cyan: isDark ? '#06b6d4' : '#0891b2',
    purple: isDark ? '#a855f7' : '#9333ea',
    amber: isDark ? '#f59e0b' : '#d97706',
    dangerBg: isDark ? '#2a1219' : '#fff1f2',
    dangerBorder: isDark ? '#881337' : '#fecdd3',
    dangerText: isDark ? '#fb7185' : '#e11d48',
    successBg: isDark ? '#06281e' : '#ecfdf5',
    successBorder: isDark ? '#065f46' : '#a7f3d0',
    successText: isDark ? '#34d399' : '#059669',
    switchActiveTrack: isDark ? '#6366f1' : '#4f46e5',
    switchInactiveTrack: isDark ? '#262a49' : '#cbd5e1',
    switchActiveThumb: '#ffffff',
    switchInactiveThumb: isDark ? '#64748b' : '#ffffff',
  };
};
