<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NLoadingBarProvider, NDialogProvider, NNotificationProvider } from 'naive-ui';
import { computed } from 'vue';
import { useTheme } from '@/features/theme';

const { theme, isDarkTheme } = useTheme();

const themeOverrides = computed(() => {
  const isDark = isDarkTheme.value;
  
  return {
    common: {
      primaryColor: isDark ? '#00b05b' : '#00b05b',
      primaryColorHover: isDark ? '#00f1b9' : '#00f1b9',
      primaryColorPressed: isDark ? '#00b05b' : '#00b05b',
      primaryColorSuppl: isDark ? '#00f1b9' : '#00f1b9',
      
      baseColor: isDark ? '#0f172a' : '#f8fafc',
      cardColor: isDark ? '#1e293b' : '#ffffff',
      modalColor: isDark ? '#1e293b' : '#ffffff',
      popoverColor: isDark ? '#1e293b' : '#ffffff',
      tableColor: isDark ? '#1e293b' : '#ffffff',
      tableHeaderColor: isDark ? '#334155' : '#f1f5f9',
      
      textColorBase: isDark ? '#f8fafc' : '#0f172a',
      textColor1: isDark ? '#f8fafc' : '#0f172a',
      textColor2: isDark ? '#94a3b8' : '#475569',
      textColor3: isDark ? '#64748b' : '#64748b',
      
      borderColor: isDark ? '#334155' : '#e2e8f0',
      borderColorHover: isDark ? '#475569' : '#cbd5e1',
      borderColorFocus: isDark ? '#38bdf8' : '#0ea5e9',
      
      borderRadius: '8px',
      borderRadiusSmall: '6px',
      borderRadiusLarge: '12px',
      
      boxShadow1: isDark 
        ? '0 1px 2px 0 rgb(0 0 0 / 0.3)' 
        : '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      boxShadow2: isDark 
        ? '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)' 
        : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      boxShadow3: isDark 
        ? '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)' 
        : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      boxShadow4: isDark 
        ? '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)' 
        : '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      
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
  };
});
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
