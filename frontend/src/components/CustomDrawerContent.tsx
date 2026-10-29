import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { DrawerContentScrollView, type DrawerContentComponentProps } from 'expo-router/drawer';
import { Home, Settings, Zap, Moon, Sun, Radio } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { CustomSwitch } from './CustomSwitch';
import { API_URL } from '@/api';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { theme, themeMode, toggleTheme, eventsCount, hostIp } = useApp();
  const currentRouteName = props.state.routeNames[props.state.index];

  const isHome = currentRouteName === 'index';
  const isSettings = currentRouteName === 'settings';

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        {/* Drawer Branded Header */}
        <View style={[styles.brandHeader, { borderBottomColor: theme.borderSubtle }]}>
          <View style={styles.brandRow}>
            <View style={[styles.brandBadge, { backgroundColor: theme.primary }]}>
              <Zap size={18} color="#ffffff" strokeWidth={2.5} />
            </View>
            <View>
              <Text style={[styles.brandName, { color: theme.text }]}>FESTIVAL OS</Text>
              <Text style={[styles.brandTagline, { color: theme.textMuted }]}>
                Console Serverless
              </Text>
            </View>
          </View>
        </View>

        {/* Navigation Links (100% Redondeados) */}
        <View style={styles.navSection}>
          <Text style={[styles.sectionHeading, { color: theme.textMuted }]}>
            NAVEGACIÓN
          </Text>

          {/* Home Link */}
          <Pressable
            style={({ pressed }) => [
              styles.navItemPill,
              {
                backgroundColor: isHome
                  ? (theme.isDark ? '#1e2147' : '#e0e7ff')
                  : 'transparent',
                borderColor: isHome ? theme.primary : 'transparent',
              },
              pressed && styles.pressed,
            ]}
            onPress={() => props.navigation.navigate('index')}
          >
            <View style={styles.navItemLeft}>
              <Home
                size={18}
                color={isHome ? theme.primary : theme.textMuted}
                strokeWidth={isHome ? 2.5 : 2}
              />
              <Text
                style={[
                  styles.navItemLabel,
                  {
                    color: isHome ? theme.primary : theme.textMuted,
                    fontWeight: isHome ? '800' : '600',
                  },
                ]}
              >
                Cartelera
              </Text>
            </View>

            {eventsCount > 0 && (
              <View
                style={[
                  styles.countBadge,
                  {
                    backgroundColor: isHome ? theme.primary : theme.surfaceElevated,
                    borderColor: isHome ? theme.primary : theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.countBadgeText,
                    { color: isHome ? '#ffffff' : theme.text },
                  ]}
                >
                  {eventsCount}
                </Text>
              </View>
            )}
          </Pressable>

          {/* Settings Link */}
          <Pressable
            style={({ pressed }) => [
              styles.navItemPill,
              {
                backgroundColor: isSettings
                  ? (theme.isDark ? '#1e2147' : '#e0e7ff')
                  : 'transparent',
                borderColor: isSettings ? theme.primary : 'transparent',
              },
              pressed && styles.pressed,
            ]}
            onPress={() => props.navigation.navigate('settings')}
          >
            <View style={styles.navItemLeft}>
              <Settings
                size={18}
                color={isSettings ? theme.primary : theme.textMuted}
                strokeWidth={isSettings ? 2.5 : 2}
              />
              <Text
                style={[
                  styles.navItemLabel,
                  {
                    color: isSettings ? theme.primary : theme.textMuted,
                    fontWeight: isSettings ? '800' : '600',
                  },
                ]}
              >
                Ajustes
              </Text>
            </View>
          </Pressable>
        </View>
      </DrawerContentScrollView>

      {/* Drawer Footer: Quick Theme Toggle & Connection status */}
      <View style={[styles.drawerFooter, { borderTopColor: theme.borderSubtle }]}>
        {/* Quick Theme Switch */}
        <View style={styles.footerThemeRow}>
          <View style={styles.footerThemeLeft}>
            {themeMode === 'dark' ? (
              <Moon size={16} color={theme.text} />
            ) : (
              <Sun size={16} color={theme.text} />
            )}
            <Text style={[styles.footerThemeText, { color: theme.text }]}>
              {themeMode === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
            </Text>
          </View>

          <CustomSwitch
            value={themeMode === 'dark'}
            onValueChange={toggleTheme}
            theme={theme}
          />
        </View>

        {/* Backend Status */}
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: theme.surfaceElevated,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={styles.statusDot} />
          <Text style={[styles.statusText, { color: theme.textMuted }]}>
            {API_URL}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 48,
    paddingHorizontal: 16,
    gap: 20,
  },
  brandHeader: {
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandBadge: {
    width: 38,
    height: 38,
    borderRadius: 9999,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  brandTagline: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  navSection: {
    gap: 8,
  },
  sectionHeading: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 6,
    marginLeft: 12,
  },
  navItemPill: {
    height: 50,
    borderRadius: 9999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  navItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navItemLabel: {
    fontSize: 14,
    letterSpacing: 0.3,
  },
  countBadge: {
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 9999,
    borderWidth: 1,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    gap: 14,
  },
  footerThemeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerThemeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footerThemeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 9999,
    borderWidth: 1,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 9999,
    backgroundColor: '#34c759',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
