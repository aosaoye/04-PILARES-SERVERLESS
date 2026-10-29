import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { CustomSwitch } from './CustomSwitch';

interface SettingRowProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
}

export function SettingRow({
  icon,
  iconBg,
  title,
  subtitle,
  value,
  onValueChange,
  disabled = false,
}: SettingRowProps) {
  const { theme } = useApp();

  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
          {icon}
        </View>
        <View style={styles.rowTextBox}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            {subtitle}
          </Text>
        </View>
      </View>

      <CustomSwitch
        value={value}
        onValueChange={onValueChange}
        theme={theme}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 4,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
    paddingRight: 14,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowTextBox: {
    flex: 1,
    flexShrink: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 3,
    lineHeight: 16,
  },
});
