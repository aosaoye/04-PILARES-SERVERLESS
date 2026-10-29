import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, useApp } from '../context/AppContext';
import { CustomDrawerContent } from '../components/CustomDrawerContent';

const queryClient = new QueryClient();

function DrawerNavigationLayout() {
  const { theme } = useApp();

  return (
    <>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: theme.surface,
            width: 310,
          },
          sceneStyle: {
            backgroundColor: theme.bg,
          },
          swipeEdgeWidth: 80,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Cartelera',
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Settings',
            title: 'Ajustes',
          }}
        />
      </Drawer>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <DrawerNavigationLayout />
        </AppProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
