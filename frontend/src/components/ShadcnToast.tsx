import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { AlertCircle, CheckCircle2, Zap, X } from 'lucide-react-native';
import type { ThemeColors } from '../constants/theme';

export type ToastVariant = 'default' | 'success' | 'destructive';

export interface ToastData {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ShadcnToastProps {
  toast: ToastData | null;
  onDismiss: () => void;
  theme: ThemeColors;
}

export function ShadcnToast({ toast, onDismiss, theme }: ShadcnToastProps) {
  const translateY = useRef(new Animated.Value(-60)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 9,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        onDismiss();
      }, 3800);

      return () => clearTimeout(timer);
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -60,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [toast]);

  if (!toast) return null;

  const isDestructive = toast.variant === 'destructive';
  const isSuccess = toast.variant === 'success';

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.toastWrapper,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View
        style={[
          styles.toastCard,
          {
            backgroundColor: isDestructive
              ? theme.dangerBg
              : isSuccess
              ? theme.successBg
              : theme.surface,
            borderColor: isDestructive
              ? theme.dangerBorder
              : isSuccess
              ? theme.successBorder
              : theme.border,
          },
        ]}
      >
        <View style={styles.toastIconBox}>
          {isDestructive ? (
            <AlertCircle size={17} color={theme.dangerText} />
          ) : isSuccess ? (
            <CheckCircle2 size={17} color={theme.successText} />
          ) : (
            <Zap size={17} color={theme.text} />
          )}
        </View>

        <View style={styles.toastTextBox}>
          <Text
            style={[
              styles.toastTitle,
              {
                color: isDestructive
                  ? theme.dangerText
                  : isSuccess
                  ? theme.successText
                  : theme.text,
              },
            ]}
          >
            {toast.title}
          </Text>
          {toast.description ? (
            <Text style={[styles.toastDesc, { color: theme.textMuted }]}>
              {toast.description}
            </Text>
          ) : null}
        </View>

        <Pressable
          style={[styles.toastCloseBtn, { borderColor: theme.border }]}
          onPress={onDismiss}
          hitSlop={10}
        >
          <X size={13} color={theme.textMuted} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 99999,
    alignItems: 'center',
  },
  toastCard: {
    width: '100%',
    maxWidth: 540,
    borderRadius: 100,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },
  toastIconBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastTextBox: {
    flex: 1,
    gap: 2,
  },
  toastTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  toastDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  toastCloseBtn: {
    width: 24,
    height: 24,
    borderRadius: 9999,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
