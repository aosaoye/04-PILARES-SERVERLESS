import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  Calendar,
  Edit3,
  Trash2,
} from 'lucide-react-native';
import type { FestivalEvent } from '../types/events';
import { useApp } from '../context/AppContext';
import { commonStyles } from '../styles/commonStyles';

interface EventCardProps {
  event: FestivalEvent;
  onEdit: (event: FestivalEvent) => void;
  onToggleStatus: (event: FestivalEvent) => void;
  onDelete: (id: string) => void;
  isBusy: boolean;
  isCompact?: boolean;
}

export function EventCard({
  event,
  onEdit,
  onToggleStatus,
  onDelete,
  isBusy,
  isCompact = false,
}: EventCardProps) {
  const { theme } = useApp();
  const isConfirmed = event.status === 'CONFIRMED';

  return (
    <View
      style={[
        styles.card,
        isCompact && styles.cardCompact,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      {/* Top Bar: Event ID and Status Chip */}
      <View style={styles.headerRow}>
        <View
          style={[
            styles.idPill,
            {
              backgroundColor: theme.surfaceElevated,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.idPillText, { color: theme.textMuted }]}>
            {event.id}
          </Text>
        </View>

        <View
          style={[
            styles.statusChip,
            {
              backgroundColor: isConfirmed ? theme.successBg : theme.dangerBg,
              borderColor: isConfirmed ? theme.successBorder : theme.dangerBorder,
            },
          ]}
        >
          {isConfirmed ? (
            <CheckCircle2 size={12} color={theme.successText} />
          ) : (
            <XCircle size={12} color={theme.dangerText} />
          )}
          <Text
            style={[
              styles.statusChipText,
              { color: isConfirmed ? theme.successText : theme.dangerText },
            ]}
          >
            {event.status}
          </Text>
        </View>
      </View>

      {/* Artist Heading */}
      <Text style={[styles.artistName, { color: theme.text }]}>
        {event.artist}
      </Text>

      {/* Metadata Chips */}
      <View style={styles.chipsRow}>
        <View
          style={[
            styles.chip,
            {
              backgroundColor: theme.surfaceElevated,
              borderColor: theme.border,
            },
          ]}
        >
          <MapPin size={12} color={theme.cyan} />
          <Text style={[styles.chipText, { color: theme.textMuted }]}>
            {event.space}
          </Text>
        </View>

        <View
          style={[
            styles.chip,
            {
              backgroundColor: theme.surfaceElevated,
              borderColor: theme.border,
            },
          ]}
        >
          <Clock size={12} color={theme.amber} />
          <Text style={[styles.chipText, { color: theme.textMuted }]}>
            {event.time}
          </Text>
        </View>

        {event.date ? (
          <View
            style={[
              styles.chip,
              {
                backgroundColor: theme.surfaceElevated,
                borderColor: theme.border,
              },
            ]}
          >
            <Calendar size={12} color={theme.purple} />
            <Text style={[styles.chipText, { color: theme.textMuted }]}>
              {event.date}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Actions Bar (100% Redondeadas y sin desbordes) */}
      <View
        style={[
          styles.actionsBar,
          { borderTopColor: theme.borderSubtle },
        ]}
      >
        {/* Editar */}
        <Pressable
          style={({ pressed }) => [
            styles.pillActionBtn,
            {
              backgroundColor: theme.surfaceElevated,
              borderColor: theme.border,
            },
            pressed && commonStyles.pressed,
          ]}
          onPress={() => onEdit(event)}
        >
          <Edit3 size={13} color={theme.primary} />
          <Text style={[styles.pillBtnText, { color: theme.text }]}>
            EDITAR
          </Text>
        </Pressable>

        {/* Cambiar Estado: CANCELAR o CONFIRMAR (Conciso y con código de color) */}
        <Pressable
          style={({ pressed }) => [
            styles.pillActionBtn,
            {
              backgroundColor: isConfirmed ? theme.dangerBg : theme.successBg,
              borderColor: isConfirmed ? theme.dangerBorder : theme.successBorder,
            },
            pressed && commonStyles.pressed,
            isBusy && commonStyles.disabled,
          ]}
          disabled={isBusy}
          onPress={() => onToggleStatus(event)}
        >
          {isConfirmed ? (
            <XCircle size={13} color={theme.dangerText} />
          ) : (
            <CheckCircle2 size={13} color={theme.successText} />
          )}
          <Text
            style={[
              styles.pillBtnText,
              { color: isConfirmed ? theme.dangerText : theme.successText },
            ]}
          >
            {isConfirmed ? 'CANCELAR' : 'CONFIRMAR'}
          </Text>
        </Pressable>

        {/* Eliminar (Botón circular) */}
        <Pressable
          style={({ pressed }) => [
            styles.circleDangerBtn,
            {
              backgroundColor: theme.dangerBg,
              borderColor: theme.dangerBorder,
            },
            pressed && commonStyles.pressed,
            isBusy && commonStyles.disabled,
          ]}
          disabled={isBusy}
          onPress={() => onDelete(event.id)}
          accessibilityLabel="Eliminar actuación"
        >
          <Trash2 size={13} color={theme.dangerText} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    gap: 14,
  },
  cardCompact: {
    padding: 14,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9999,
    borderWidth: 1,
  },
  idPillText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9999,
    borderWidth: 1,
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  artistName: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 9999,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 14,
    borderTopWidth: 1,
  },
  pillActionBtn: {
    flex: 1,
    height: 42,
    borderRadius: 9999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 8,
  },
  pillBtnText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  circleDangerBtn: {
    width: 42,
    height: 42,
    borderRadius: 9999,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
