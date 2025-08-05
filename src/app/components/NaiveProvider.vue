<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NLoadingBarProvider, NDialogProvider, NNotificationProvider } from 'naive-ui';
import { computed } from 'vue';
import { useTheme } from '@/features/theme';

const { theme } = useTheme();

const themeOverrides = computed(() => ({
  common: {
    primaryColor: 'var(--brand-primary)',
    primaryColorHover: 'var(--brand-secondary)',
    primaryColorPressed: 'var(--brand-primary)',
    primaryColorSuppl: 'var(--brand-secondary)',
    
    baseColor: 'var(--bg-primary)',
    cardColor: 'var(--bg-secondary)',
    modalColor: 'var(--bg-secondary)',
    popoverColor: 'var(--bg-secondary)',
    tableColor: 'var(--bg-secondary)',
    tableHeaderColor: 'var(--bg-tertiary)',
    
    textColorBase: 'var(--text-primary)',
    textColor1: 'var(--text-primary)',
    textColor2: 'var(--text-secondary)',
    textColor3: 'var(--text-tertiary)',
    
    borderColor: 'var(--border-primary)',
    borderColorHover: 'var(--border-secondary)',
    borderColorFocus: 'var(--border-focus)',
    
    borderRadius: '8px',
    borderRadiusSmall: '6px',
    borderRadiusLarge: '12px',
    
    boxShadow1: 'var(--shadow-sm)',
    boxShadow2: 'var(--shadow-md)',
    boxShadow3: 'var(--shadow-lg)',
    boxShadow4: 'var(--shadow-xl)',
    
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
