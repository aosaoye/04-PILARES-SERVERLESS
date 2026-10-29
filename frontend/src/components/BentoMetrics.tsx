import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Activity, CheckCircle2, XCircle, Layers } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

interface BentoMetricsProps {
  total: number;
  confirmed: number;
  cancelled: number;
  ratio: number;
}

export function BentoMetrics({
  total,
  confirmed,
  cancelled,
  ratio,
}: BentoMetricsProps) {
  const { theme } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {/* Total Shows */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.isDark ? '#141733' : '#eef2ff',
              borderColor: theme.isDark ? '#2e3566' : '#c7d2fe',
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Activity size={15} color={theme.primary} />
            <Text style={[styles.cardLabel, { color: theme.primary }]}>
              TOTAL SHOWS
            </Text>
          </View>
          <Text style={[styles.cardNumber, { color: theme.primary }]}>
            {total}
          </Text>
        </View>

        {/* Confirmados */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.successBg,
              borderColor: theme.successBorder,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <CheckCircle2 size={15} color={theme.successText} />
            <Text style={[styles.cardLabel, { color: theme.successText }]}>
              CONFIRMADOS
            </Text>
          </View>
          <Text style={[styles.cardNumber, { color: theme.successText }]}>
            {confirmed}
          </Text>
        </View>

        {/* Cancelados */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.dangerBg,
              borderColor: theme.dangerBorder,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <XCircle size={15} color={theme.dangerText} />
            <Text style={[styles.cardLabel, { color: theme.dangerText }]}>
              CANCELADOS
            </Text>
          </View>
          <Text style={[styles.cardNumber, { color: theme.dangerText }]}>
            {cancelled}
          </Text>
        </View>

        {/* Efectividad Ratio */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.isDark ? '#261806' : '#fffbeb',
              borderColor: theme.isDark ? '#633d06' : '#fde68a',
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Layers size={15} color={theme.amber} />
            <Text style={[styles.cardLabel, { color: theme.amber }]}>
              EFECTIVIDAD
            </Text>
          </View>
          <Text style={[styles.cardNumber, { color: theme.amber }]}>
            {ratio}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    flex: 1,
    minWidth: '47%',
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    gap: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  cardNumber: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
});
