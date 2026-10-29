import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getTheme, type ThemeMode, type ThemeColors } from '../constants/theme';
import { HOST_IP } from '../constants/config';
import { ShadcnToast, type ToastData, type ToastVariant } from '../components/ShadcnToast';

interface AppContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  theme: ThemeColors;
  autoRefresh: boolean;
  setAutoRefresh: (val: boolean) => void;
  notifications: boolean;
  setNotifications: (val: boolean) => void;
  compactCards: boolean;
  setCompactCards: (val: boolean) => void;
  showToast: (title: string, description?: string, variant?: ToastVariant) => void;
  dismissToast: () => void;
  eventsCount: number;
  setEventsCount: (count: number) => void;
  hostIp: string;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<boolean>(true);
  const [compactCards, setCompactCards] = useState<boolean>(false);
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [toast, setToast] = useState<ToastData | null>(null);

  const theme = getTheme(themeMode);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (
    title: string,
    description?: string,
    variant: ToastVariant = 'default'
  ) => {
    if (!notifications && variant !== 'destructive') {
      return;
    }
    setToast({
      id: Date.now(),
      title,
      description,
      variant,
    });
  };

  const dismissToast = () => {
    setToast(null);
  };

  return (
    <AppContext.Provider
      value={{
        themeMode,
        setThemeMode,
        toggleTheme,
        theme,
        autoRefresh,
        setAutoRefresh,
        notifications,
        setNotifications,
        compactCards,
        setCompactCards,
        showToast,
        dismissToast,
        eventsCount,
        setEventsCount,
        hostIp: HOST_IP,
      }}
    >
      {children}
      <ShadcnToast toast={toast} onDismiss={dismissToast} theme={theme} />
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
