import React, { useEffect } from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {
  X,
  Plus,
  CheckCircle2,
  XCircle,
  Trash2,
} from 'lucide-react-native';
import type { FestivalEvent, EventInput } from '../types/events';
import { useApp } from '../context/AppContext';
import { commonStyles } from '../styles/commonStyles';

interface EventFormSheetProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  initialData?: FestivalEvent | null;
  onClose: () => void;
  onSubmit: (data: EventInput) => void;
  onDelete?: (id: string) => void;
  isPending: boolean;
  isDeleting?: boolean;
}

export function EventFormSheet({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
  onDelete,
  isPending,
  isDeleting = false,
}: EventFormSheetProps) {
  const { theme } = useApp();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventInput>({
    defaultValues: {
      artist: '',
      space: '',
      time: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      status: 'CONFIRMED',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        reset({
          artist: initialData.artist,
          space: initialData.space,
          time: initialData.time,
          date: initialData.date || '',
          location: initialData.location || '',
          status: initialData.status,
        });
      } else {
        reset({
          artist: '',
          space: '',
          time: '',
          date: new Date().toISOString().split('T')[0],
          location: '',
          status: 'CONFIRMED',
        });
      }
    }
  }, [isOpen, mode, initialData, reset]);

  if (!isOpen) return null;

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalBackdrop}
      >
        <Pressable style={styles.backdropOverlay} onPress={onClose} />

        <View
          style={[
            styles.sheetSurface,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          {/* Grab Handle */}
          <View
            style={[
              commonStyles.grabHandle,
              { backgroundColor: theme.border },
            ]}
          />

          {/* Sheet Header */}
          <View
            style={[
              styles.sheetHeader,
              { borderBottomColor: theme.borderSubtle },
            ]}
          >
            <View>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>
                {mode === 'create'
                  ? 'Nueva Actuación'
                  : `Editar ${initialData?.id ?? ''}`}
              </Text>
              <Text style={[styles.sheetSubtitle, { color: theme.textMuted }]}>
                {mode === 'create'
                  ? 'Introduce los detalles para programar el festival'
                  : 'Modifica los datos y el estado de la actuación'}
              </Text>
            </View>

            <Pressable
              style={[
                styles.closeCircleBtn,
                {
                  backgroundColor: theme.surfaceElevated,
                  borderColor: theme.border,
                },
              ]}
              onPress={onClose}
              hitSlop={12}
              accessibilityLabel="Cerrar formulario"
            >
              <X size={16} color={theme.textMuted} />
            </Pressable>
          </View>

          {/* Form Scroll Content */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formStack}>
              {/* Artista Input */}
              <View style={styles.formGroup}>
                <Text style={[styles.inputLabel, { color: theme.textMuted }]}>
                  ARTISTA / BANDA *
                </Text>
                <Controller
                  control={control}
                  name="artist"
                  rules={{
                    required: 'El nombre del artista es obligatorio',
                    minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[
                        commonStyles.pillInput,
                        {
                          backgroundColor: theme.bg,
                          borderColor: theme.border,
                          color: theme.text,
                        },
                        errors.artist && styles.inputError,
                      ]}
                      placeholder="Nombre del artista o grupo"
                      placeholderTextColor={theme.textSubtle}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.artist && (
                  <Text style={styles.errorText}>{errors.artist.message}</Text>
                )}
              </View>

              {/* Escenario y Hora Row */}
              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1.2 }]}>
                  <Text style={[styles.inputLabel, { color: theme.textMuted }]}>
                    ESCENARIO *
                  </Text>
                  <Controller
                    control={control}
                    name="space"
                    rules={{ required: 'Indica el escenario' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          commonStyles.pillInput,
                          {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                          },
                          errors.space && styles.inputError,
                        ]}
                        placeholder="Ej: Main Stage"
                        placeholderTextColor={theme.textSubtle}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.space && (
                    <Text style={styles.errorText}>{errors.space.message}</Text>
                  )}
                </View>

                <View style={[styles.formGroup, { flex: 0.9 }]}>
                  <Text style={[styles.inputLabel, { color: theme.textMuted }]}>
                    HORA (HH:mm) *
                  </Text>
                  <Controller
                    control={control}
                    name="time"
                    rules={{
                      required: 'Obligatorio',
                      pattern: {
                        value: /^([01]\d|2[0-3]):[0-5]\d$/,
                        message: 'HH:mm válido',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          commonStyles.pillInput,
                          {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                          },
                          errors.time && styles.inputError,
                        ]}
                        placeholder="21:30"
                        placeholderTextColor={theme.textSubtle}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.time && (
                    <Text style={styles.errorText}>{errors.time.message}</Text>
                  )}
                </View>
              </View>

              {/* Fecha y Ubicación Row */}
              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={[styles.inputLabel, { color: theme.textMuted }]}>
                    FECHA
                  </Text>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          commonStyles.pillInput,
                          {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                          },
                        ]}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor={theme.textSubtle}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={[styles.inputLabel, { color: theme.textMuted }]}>
                    UBICACIÓN
                  </Text>
                  <Controller
                    control={control}
                    name="location"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          commonStyles.pillInput,
                          {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                          },
                        ]}
                        placeholder="Ej: Madrid Arena"
                        placeholderTextColor={theme.textSubtle}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
              </View>

              {/* Selector de Estado */}
              <View style={styles.formGroup}>
                <Text style={[styles.inputLabel, { color: theme.textMuted }]}>
                  ESTADO
                </Text>
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.statusButtonsRow}>
                      <Pressable
                        style={[
                          styles.statusTogglePill,
                          {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                          },
                          value === 'CONFIRMED' && {
                            backgroundColor: theme.successBg,
                            borderColor: theme.successBorder,
                          },
                        ]}
                        onPress={() => onChange('CONFIRMED')}
                      >
                        <CheckCircle2
                          size={14}
                          color={
                            value === 'CONFIRMED'
                              ? theme.successText
                              : theme.textMuted
                          }
                        />
                        <Text
                          style={[
                            styles.statusTogglePillText,
                            { color: theme.textMuted },
                            value === 'CONFIRMED' && {
                              color: theme.successText,
                            },
                          ]}
                        >
                          CONFIRMED
                        </Text>
                      </Pressable>

                      <Pressable
                        style={[
                          styles.statusTogglePill,
                          {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                          },
                          value === 'CANCELLED' && {
                            backgroundColor: theme.dangerBg,
                            borderColor: theme.dangerBorder,
                          },
                        ]}
                        onPress={() => onChange('CANCELLED')}
                      >
                        <XCircle
                          size={14}
                          color={
                            value === 'CANCELLED'
                              ? theme.dangerText
                              : theme.textMuted
                          }
                        />
                        <Text
                          style={[
                            styles.statusTogglePillText,
                            { color: theme.textMuted },
                            value === 'CANCELLED' && {
                              color: theme.dangerText,
                            },
                          ]}
                        >
                          CANCELLED
                        </Text>
                      </Pressable>
                    </View>
                  )}
                />
              </View>

              {/* Action Buttons in Sheet */}
              {mode === 'create' ? (
                <Pressable
                  style={({ pressed }) => [
                    styles.primaryBtn,
                    { backgroundColor: theme.primary },
                    pressed && commonStyles.pressed,
                    isPending && commonStyles.disabled,
                  ]}
                  disabled={isPending}
                  onPress={() => handleSubmit(onSubmit)()}
                >
                  {isPending ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <>
                      <Plus size={18} color="#ffffff" strokeWidth={2.5} />
                      <Text style={styles.primaryBtnText}>
                        CONFIRMAR Y AGENDAR
                      </Text>
                    </>
                  )}
                </Pressable>
              ) : (
                <View style={styles.editActionsRow}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.primaryBtn,
                      {
                        flex: 1.4,
                        backgroundColor: theme.primary,
                      },
                      pressed && commonStyles.pressed,
                      isPending && commonStyles.disabled,
                    ]}
                    disabled={isPending}
                    onPress={() => handleSubmit(onSubmit)()}
                  >
                    {isPending ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <>
                        <CheckCircle2
                          size={16}
                          color="#ffffff"
                          strokeWidth={2.5}
                        />
                        <Text style={styles.primaryBtnText}>GUARDAR</Text>
                      </>
                    )}
                  </Pressable>

                  {onDelete && initialData && (
                    <Pressable
                      style={({ pressed }) => [
                        styles.dangerBtn,
                        {
                          backgroundColor: theme.dangerBg,
                          borderColor: theme.dangerBorder,
                        },
                        pressed && commonStyles.pressed,
                        isDeleting && commonStyles.disabled,
                      ]}
                      disabled={isDeleting}
                      onPress={() => onDelete(initialData.id)}
                    >
                      {isDeleting ? (
                        <ActivityIndicator
                          size="small"
                          color={theme.dangerText}
                        />
                      ) : (
                        <>
                          <Trash2
                            size={15}
                            color={theme.dangerText}
                            strokeWidth={2}
                          />
                          <Text
                            style={[
                              styles.dangerBtnText,
                              { color: theme.dangerText },
                            ]}
                          >
                            ELIMINAR
                          </Text>
                        </>
                      )}
                    </Pressable>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  backdropOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheetSurface: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
    maxHeight: '85%',
    paddingBottom: 36,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  sheetSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  closeCircleBtn: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 24,
  },
  formStack: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginLeft: 6,
  },
  inputError: {
    borderColor: '#ff453a',
  },
  errorText: {
    color: '#ff453a',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 8,
  },
  statusButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statusTogglePill: {
    flex: 1,
    height: 48,
    borderRadius: 9999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statusTogglePillText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  primaryBtnText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.2,
    color: '#ffffff',
  },
  editActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  dangerBtn: {
    height: 52,
    flex: 1,
    borderRadius: 9999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dangerBtnText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
