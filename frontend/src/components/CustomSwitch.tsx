import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import type { ThemeColors } from '../constants/theme';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  theme: ThemeColors;
  disabled?: boolean;
}

export function CustomSwitch({
  value,
  onValueChange,
  theme,
  disabled = false,
}: CustomSwitchProps) {
  return (
    <Pressable
      style={[
        styles.switchTrack,
        {
          backgroundColor: value
            ? theme.switchActiveTrack
            : theme.switchInactiveTrack,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={() => !disabled && onValueChange(!value)}
      hitSlop={8}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
    >
      <View
        style={[
          styles.switchThumb,
          {
            backgroundColor: value
              ? theme.switchActiveThumb
              : theme.switchInactiveThumb,
            alignSelf: value ? 'flex-end' : 'flex-start',
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  switchTrack: {
    width: 50,
    height: 28,
    borderRadius: 9999,
    padding: 3,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 9999,
  },
});
