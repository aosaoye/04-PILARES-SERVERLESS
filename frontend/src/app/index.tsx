import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Plus,
  RotateCw,
  Calendar,
  XCircle,
} from 'lucide-react-native';
import type { FestivalEvent, EventInput, EventStatus } from '../types/events';
import { getEvents, createEvents, updateEvents, deleteEvents } from '../api';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import { BentoMetrics } from '../components/BentoMetrics';
import { EventCard } from '../components/EventCard';
import { EventFormSheet } from '../components/EventFormSheet';
import { commonStyles } from '../styles/commonStyles';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const {
    theme,
    autoRefresh,
    compactCards,
    showToast,
    setEventsCount,
  } = useApp();

  // BottomSheet State
  const [sheetMode, setSheetMode] = useState<'create' | 'edit' | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<FestivalEvent | null>(null);
  const [filterStatus, setFilterStatus] = useState<'ALL' | EventStatus>('ALL');

  // Query: Get Events
  const {
    data: events = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery<FestivalEvent[]>({
    queryKey: ['events'],
    queryFn: getEvents,
    refetchInterval: autoRefresh ? 12000 : false,
  });

  // Sync count with AppContext for Drawer Badge
  useEffect(() => {
    if (events) {
      setEventsCount(events.length);
    }
  }, [events, setEventsCount]);

  // Mutation: Create
  const createMutation = useMutation({
    mutationFn: (data: EventInput) => createEvents(data),
    onSuccess: (newEvent) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setSheetMode(null);
      showToast(
        'Actuación Creada',
        `${newEvent.artist} ha sido añadido a la cartelera.`,
        'success'
      );
    },
    onError: (err: any) => {
      showToast(
        'Error al Crear',
        err?.message || 'No se pudo guardar la nueva actuación.',
        'destructive'
      );
    },
  });

  // Mutation: Update
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<EventInput> }) =>
      updateEvents(id, payload),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setSheetMode(null);
      setSelectedEvent(null);
      showToast(
        'Actuación Actualizada',
        `Los cambios en ${updated.artist} se han guardado.`,
        'success'
      );
    },
    onError: (err: any) => {
      showToast(
        'Error al Actualizar',
        err?.message || 'No se pudo actualizar la actuación.',
        'destructive'
      );
    },
  });

  // Mutation: Delete
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEvents(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setSheetMode(null);
      setSelectedEvent(null);
      showToast(
        'Actuación Eliminada',
        'El evento fue removido del festival.',
        'default'
      );
    },
    onError: (err: any) => {
      showToast(
        'Error al Eliminar',
        err?.message || 'No se pudo eliminar la actuación.',
        'destructive'
      );
    },
  });

  const isBusy =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  // Handlers
  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const handleOpenCreate = () => {
    setSelectedEvent(null);
    setSheetMode('create');
  };

  const handleOpenEdit = (event: FestivalEvent) => {
    setSelectedEvent(event);
    setSheetMode('edit');
  };

  const handleToggleStatus = (event: FestivalEvent) => {
    const newStatus = event.status === 'CONFIRMED' ? 'CANCELLED' : 'CONFIRMED';
    updateMutation.mutate({
      id: event.id,
      payload: { status: newStatus },
    });
  };

  const handleFormSubmit = (data: EventInput) => {
    if (sheetMode === 'create') {
      createMutation.mutate(data);
    } else if (sheetMode === 'edit' && selectedEvent) {
      updateMutation.mutate({ id: selectedEvent.id, payload: data });
    }
  };

  const handleDeleteEvent = (id: string) => {
    deleteMutation.mutate(id);
  };

  // Metrics
  const totalEvents = events.length;
  const confirmedCount = events.filter((e) => e.status === 'CONFIRMED').length;
  const cancelledCount = events.filter((e) => e.status === 'CANCELLED').length;
  const ratio = totalEvents > 0 ? Math.round((confirmedCount / totalEvents) * 100) : 0;

  // Filtered Events
  const filteredEvents = events.filter((e) => {
    if (filterStatus === 'ALL') return true;
    return e.status === filterStatus;
  });

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Bar */}
        <HeaderBar
          onOpenDrawer={handleOpenDrawer}
          onRefresh={() => refetch()}
          isRefetching={isRefetching}
        />

        {/* Bento Metrics */}
        <BentoMetrics
          total={totalEvents}
          confirmed={confirmedCount}
          cancelled={cancelledCount}
          ratio={ratio}
        />

        {/* Filter Chips Bar */}
        <View style={styles.filterBar}>
          {(['ALL', 'CONFIRMED', 'CANCELLED'] as const).map((status) => {
            const isActive = filterStatus === status;
            return (
              <Pressable
                key={status}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: isActive
                      ? theme.primary
                      : theme.surfaceElevated,
                    borderColor: isActive ? theme.primary : theme.border,
                  },
                ]}
                onPress={() => setFilterStatus(status)}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    {
                      color: isActive ? '#ffffff' : theme.textMuted,
                      fontWeight: isActive ? '800' : '600',
                    },
                  ]}
                >
                  {status === 'ALL' ? 'TODOS' : status}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Event Cards List */}
        {isLoading ? (
          <View style={styles.centerStateBox}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.loadingMessage, { color: theme.textMuted }]}>
              CONECTANDO CON SERVERLESS OFFLINE...
            </Text>
          </View>
        ) : isError ? (
          <View
            style={[
              styles.emptyStateBox,
              {
                backgroundColor: theme.surface,
                borderColor: theme.dangerBorder,
              },
            ]}
          >
            <XCircle size={32} color={theme.dangerText} />
            <Text style={[styles.emptyStateTitle, { color: theme.text }]}>
              Error al obtener cartelera
            </Text>
            <Text style={[styles.emptyStateDesc, { color: theme.textMuted }]}>
              {error instanceof Error
                ? error.message
                : 'No se pudo conectar con el backend.'}
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.pillRetryBtn,
                {
                  backgroundColor: theme.surfaceElevated,
                  borderColor: theme.border,
                },
                pressed && commonStyles.pressed,
              ]}
              onPress={() => refetch()}
            >
              <RotateCw size={14} color={theme.text} />
              <Text style={[styles.pillRetryText, { color: theme.text }]}>
                REINTENTAR CONEXIÓN
              </Text>
            </Pressable>
          </View>
        ) : filteredEvents.length === 0 ? (
          <View
            style={[
              styles.emptyStateBox,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <Calendar size={36} color={theme.textMuted} />
            <Text style={[styles.emptyStateTitle, { color: theme.text }]}>
              Sin actuaciones programadas
            </Text>
            <Text style={[styles.emptyStateDesc, { color: theme.textMuted }]}>
              No hay eventos registrados que coincidan con el filtro actual.
            </Text>
          </View>
        ) : (
          <View style={styles.cardsStack}>
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={handleOpenEdit}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteEvent}
                isBusy={isBusy}
                isCompact={compactCards}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button (100% Redondeado) */}
      <View style={styles.fabContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.fabButton,
            { backgroundColor: theme.primary },
            pressed && commonStyles.pressed,
          ]}
          onPress={handleOpenCreate}
          accessibilityLabel="Crear nueva actuación"
        >
          <Plus size={18} color="#ffffff" strokeWidth={2.5} />
          <Text style={styles.fabButtonText}>NUEVA ACTUACIÓN</Text>
        </Pressable>
      </View>

      {/* Modular Event Form Sheet (BottomSheet) */}
      <EventFormSheet
        isOpen={sheetMode !== null}
        mode={sheetMode ?? 'create'}
        initialData={selectedEvent}
        onClose={() => setSheetMode(null)}
        onSubmit={handleFormSubmit}
        onDelete={handleDeleteEvent}
        isPending={createMutation.isPending || updateMutation.isPending}
        isDeleting={deleteMutation.isPending}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 56,
    paddingBottom: 110,
    paddingHorizontal: 20,
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    gap: 24,
  },
  filterBar: {
    flexDirection: 'row',
    gap: 8,
  },
  filterPill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    borderWidth: 1,
  },
  filterPillText: {
    fontSize: 11,
    letterSpacing: 1,
  },
  cardsStack: {
    gap: 14,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 99,
  },
  fabButton: {
    height: 52,
    paddingHorizontal: 28,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 8,
  },
  fabButtonText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: '#ffffff',
  },
  centerStateBox: {
    padding: 48,
    alignItems: 'center',
    gap: 12,
  },
  loadingMessage: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  emptyStateBox: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 40,
    alignItems: 'center',
    gap: 8,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  emptyStateDesc: {
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 18,
  },
  pillRetryBtn: {
    height: 42,
    borderRadius: 9999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  pillRetryText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
