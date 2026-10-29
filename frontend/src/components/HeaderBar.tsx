import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Menu, Zap, RotateCw } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { commonStyles } from '../styles/commonStyles';

interface HeaderBarProps {
  onOpenDrawer: () => void;
  onRefresh: () => void;
  isRefetching: boolean;
}

export function HeaderBar({
  onOpenDrawer,
  onRefresh,
  isRefetching,
}: HeaderBarProps) {
  const { theme } = useApp();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        {/* Brand & Drawer toggle */}
        <View style={styles.brandGroup}>
          <Pressable
            style={({ pressed }) => [
              commonStyles.circleBtn,
              {
                backgroundColor: theme.surfaceElevated,
                borderColor: theme.border,
              },
              pressed && commonStyles.pressed,
            ]}
            onPress={onOpenDrawer}
            hitSlop={10}
            accessibilityLabel="Abrir menú"
          >
            <Menu size={18} color={theme.text} />
          </Pressable>

          <View style={[styles.brandBadge, { backgroundColor: theme.primary }]}>
            <Zap size={16} color="#ffffff" strokeWidth={2.5} />
          </View>

          <Text style={[styles.brandTitle, { color: theme.text }]}>
            FESTIVAL OS
          </Text>
        </View>

        {/* Live Pill & Refresh Button */}
        <View style={styles.controlsGroup}>
          <View
            style={[
              styles.livePill,
              {
                backgroundColor: theme.surfaceElevated,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={[styles.liveDot, { backgroundColor: theme.successText }]} />
            <Text style={[styles.liveText, { color: theme.successText }]}>LIVE</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              commonStyles.circleBtn,
              {
                backgroundColor: theme.surfaceElevated,
                borderColor: theme.border,
              },
              pressed && commonStyles.pressed,
            ]}
            onPress={onRefresh}
            hitSlop={10}
            accessibilityLabel="Refrescar cartelera"
          >
            <RotateCw
              size={15}
              color={theme.text}
              style={isRefetching ? styles.spinning : undefined}
            />
          </Pressable>
        </View>
      </View>

      {/* Typographic Title Area */}
      <View style={styles.titleArea}>
        <Text style={[styles.eyebrow, { color: theme.primary }]}>
          CONSOLA DE EVENTOS
        </Text>
        <Text style={[styles.mainHeading, { color: theme.text }]}>
          Cartelera
        </Text>
        <Text style={[styles.subheading, { color: theme.textMuted }]}>
          Control operacional y programación en tiempo real vía AWS Lambda.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    gap: 16,
    paddingBottom: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandBadge: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 2,
  },
  controlsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 9999,
    borderWidth: 1,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 9999,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  titleArea: {
    gap: 3,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  mainHeading: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
  },
  subheading: {
    fontSize: 13,
    lineHeight: 18,
  },
  spinning: {
    transform: [{ rotate: '45deg' }],
  },
});
