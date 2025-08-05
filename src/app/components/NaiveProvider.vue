<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NLoadingBarProvider, NDialogProvider, NNotificationProvider } from 'naive-ui';
import { computed } from 'vue';
import { useTheme } from '@/features/theme';

const { theme } = useTheme();

const themeOverrides = computed(() => ({
  common: {
    primaryColor: '#00b05b',
    primaryColorHover: '#00f1b9',
    primaryColorPressed: '#00b05b',
    primaryColorSuppl: '#00f1b9',
    
    baseColor: '#0f172a',
    cardColor: '#1e293b',
    modalColor: '#1e293b',
    popoverColor: '#1e293b',
    tableColor: '#1e293b',
    tableHeaderColor: '#334155',
    
    textColorBase: '#f8fafc',
    textColor1: '#f8fafc',
    textColor2: '#94a3b8',
    textColor3: '#64748b',
    
    borderColor: '#334155',
    borderColorHover: '#475569',
    borderColorFocus: '#38bdf8',
    
    borderRadius: '8px',
    borderRadiusSmall: '6px',
    borderRadiusLarge: '12px',
    
    boxShadow1: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    boxShadow2: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    boxShadow3: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    boxShadow4: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
    
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: '"Monaco", "Menlo", "Ubuntu Mono", monospace',
  },
  
  Button: {
    borderRadiusSmall: '6px',
    borderRadiusMedium: '8px',
    borderRadiusLarge: '10px',
    fontSizeSmall: '0.875rem',
    fontSizeMedium: '1rem',
    fontSizeLarge: '1.125rem',
    heightSmall: '32px',
    heightMedium: '40px',
    heightLarge: '48px',
    paddingSmall: '0 12px',
    paddingMedium: '0 16px',
    paddingLarge: '0 20px',
    fontWeight: '500',
  },
  
  Input: {
    borderRadius: '8px',
    fontSize: '1rem',
    heightMedium: '44px',
    paddingMedium: '12px 16px',
  },
  
  Card: {
    borderRadius: '12px',
    paddingMedium: '1.5rem',
    titleFontSize: '1.25rem',
    titleFontWeight: '600',
  },
  
  Modal: {
    borderRadius: '16px',
    padding: '1.5rem',
    titleFontSize: '1.25rem',
    titleFontWeight: '600',
  },
  
  Drawer: {
    borderRadius: '16px 0 0 16px',
    padding: '1.5rem',
    titleFontSize: '1.25rem',
    titleFontWeight: '600',
  },
  
  Tabs: {
    tabFontSize: '1rem',
    tabFontWeight: '500',
    tabBorderRadius: '8px',
    tabPadding: '12px 16px',
  },
  
  Message: {
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '1rem',
    fontWeight: '500',
  },
  
  Notification: {
    borderRadius: '12px',
    padding: '16px',
    fontSize: '1rem',
    fontWeight: '500',
  },
  
  Dropdown: {
    borderRadius: '12px',
    optionFontSize: '1rem',
    optionPadding: '12px 16px',
  },
  
  Select: {
    borderRadius: '8px',
    fontSize: '1rem',
    heightMedium: '44px',
    paddingMedium: '12px 16px',
  },
  
  Empty: {
    fontSize: '1rem',
    descriptionFontSize: '1rem',
  },
}));
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides">
    <NMessageProvider>
      <NLoadingBarProvider>
        <NDialogProvider>
          <NNotificationProvider>
            <slot />
          </NNotificationProvider>
        </NDialogProvider>
      </NLoadingBarProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
