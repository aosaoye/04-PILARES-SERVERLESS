import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import {
  Menu,
  ArrowLeft,
  Moon,
  Sun,
  RotateCw,
  Bell,
  Sliders,
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { SettingRow } from '../components/SettingRow';
import { getEvents } from '../api';
import { commonStyles } from '../styles/commonStyles';
import { BACKEND_PORT, BACKEND_STAGE } from '../constants/config';

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    theme,
    themeMode,
    toggleTheme,
    autoRefresh,
    setAutoRefresh,
    notifications,
    setNotifications,
    compactCards,
    setCompactCards,
    showToast,
    hostIp,
  } = useApp();

  const [isTesting, setIsTesting] = useState(false);

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      await getEvents();
      queryClient.invalidateQueries({ queryKey: ['events'] });
      showToast(
        'Conexión Serverless Exitosa',
        `Conectado a http://${hostIp}:${BACKEND_PORT}/${BACKEND_STAGE}/events`,
        'success'
      );
    } catch (err) {
      showToast(
        'Error de Conexión',
        `No se pudo alcanzar el backend en http://${hostIp}:${BACKEND_PORT}/${BACKEND_STAGE}`,
        'destructive'
      );
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Settings Header */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View style={styles.headerLeftGroup}>
              <Pressable
                style={({ pressed }) => [
                  commonStyles.circleBtn,
                  {
                    backgroundColor: theme.surfaceElevated,
                    borderColor: theme.border,
                  },
                  pressed && commonStyles.pressed,
                ]}
                onPress={handleOpenDrawer}
                hitSlop={10}
                accessibilityLabel="Abrir menú"
              >
                <Menu size={18} color={theme.text} />
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.pillBtnBack,
                  {
                    backgroundColor: theme.surfaceElevated,
                    borderColor: theme.border,
                  },
                  pressed && commonStyles.pressed,
                ]}
                onPress={() => router.push('/')}
                accessibilityLabel="Volver a cartelera"
              >
                <ArrowLeft size={14} color={theme.primary} />
                <Text style={[styles.pillBtnBackText, { color: theme.primary }]}>
                  VOLVER A CARTELERA
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.titleBox}>
            <Text style={[styles.eyebrow, { color: theme.primary }]}>
              PREFERENCIAS DEL SISTEMA
            </Text>
            <Text style={[styles.mainTitle, { color: theme.text }]}>
              Configuración
            </Text>
            <Text style={[styles.subtitle, { color: theme.textMuted }]}>
              Personaliza el tema, comportamiento de actualización y diagnósticos.
            </Text>
          </View>
        </View>

        {/* Section: Apariencia */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
            APARIENCIA & VISUALIZACIÓN
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <SettingRow
              icon={
                themeMode === 'dark' ? (
                  <Moon size={17} color={theme.primary} />
                ) : (
                  <Sun size={17} color={theme.primary} />
                )
              }
              iconBg={theme.isDark ? '#1f2142' : '#e0e7ff'}
              title="Modo Oscuro"
              subtitle={
                themeMode === 'dark'
                  ? 'Tema negro azulado profundo activado'
                  : 'Tema claro minimalista activado'
              }
              value={themeMode === 'dark'}
              onValueChange={toggleTheme}
            />

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.borderSubtle },
              ]}
            />

            <SettingRow
              icon={<Sliders size={17} color={theme.purple} />}
              iconBg={theme.isDark ? '#27173b' : '#f3e8ff'}
              title="Vista Compacta"
              subtitle="Reduce espaciados en la lista de actuaciones"
              value={compactCards}
              onValueChange={(val) => setCompactCards(val)}
            />
          </View>
        </View>

        {/* Section: Sincronización */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
            SINCRONIZACIÓN & ALERTAS
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <SettingRow
              icon={<RotateCw size={17} color={theme.successText} />}
              iconBg={theme.isDark ? '#082a22' : '#dcfce7'}
              title="Auto-refresco de Cartelera"
              subtitle="Polling activo con AWS Lambda cada 12s"
              value={autoRefresh}
              onValueChange={(val) => setAutoRefresh(val)}
            />

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.borderSubtle },
              ]}
            />

            <SettingRow
              icon={<Bell size={17} color={theme.amber} />}
              iconBg={theme.isDark ? '#2e1908' : '#fef3c7'}
              title="Toasts de Notificación"
              subtitle="Alertas flotantes estilo Shadcn"
              value={notifications}
              onValueChange={(val) => setNotifications(val)}
            />
          </View>
        </View>

        {/* Section: Diagnóstico Serverless */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
            CONEXIÓN SERVERLESS OFFLINE
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.diagRow}>
              <Text style={[styles.diagLabel, { color: theme.textMuted }]}>
                Host IP:
              </Text>
              <Text style={[styles.diagValue, { color: theme.text }]}>
                {hostIp}
              </Text>
            </View>

            <View style={styles.diagRow}>
              <Text style={[styles.diagLabel, { color: theme.textMuted }]}>
                Puerto Backend:
              </Text>
              <Text style={[styles.diagValue, { color: theme.text }]}>
                {BACKEND_PORT} (serverless-offline)
              </Text>
            </View>

            <View style={styles.diagRow}>
              <Text style={[styles.diagLabel, { color: theme.textMuted }]}>
                Stage:
              </Text>
              <Text style={[styles.diagValue, { color: theme.successText }]}>
                /{BACKEND_STAGE} (activo)
              </Text>
            </View>

            {/* Botón de prueba 100% redondeado con color vibrante */}
            <Pressable
              style={({ pressed }) => [
                styles.pillBtnAction,
                { backgroundColor: theme.primary },
                pressed && commonStyles.pressed,
                isTesting && commonStyles.disabled,
              ]}
              disabled={isTesting}
              onPress={handleTestConnection}
              accessibilityLabel="Probar conexión con backend"
            >
              {isTesting ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <RotateCw size={14} color="#ffffff" />
                  <Text style={styles.pillBtnActionText}>
                    PROBAR CONEXIÓN CON BACKEND
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 56,
    paddingBottom: 90,
    paddingHorizontal: 20,
    maxWidth: 680,
    width: '100%',
    alignSelf: 'center',
    gap: 28,
  },
  header: {
    gap: 16,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pillBtnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 9999,
    borderWidth: 1,
  },
  pillBtnBackText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  titleBox: {
    gap: 4,
    marginTop: 6,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginLeft: 6,
  },
  card: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    gap: 16,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  diagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  diagLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  diagValue: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  pillBtnAction: {
    height: 48,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
  },
  pillBtnActionText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    color: '#ffffff',
  },
});
