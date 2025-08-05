<script setup lang="ts">
import { computed } from 'vue';
import { NList, NListItem, NIcon, NText, NSpace } from 'naive-ui';
import { 
  StarOutline, 
  PersonOutline, 
  GlobeOutline,
  LockClosedOutline,
  ShieldCheckmarkOutline 
} from '@vicons/ionicons5';

import { getServices } from '@/entities/session';

const services = computed(() => getServices());

const getServiceIcon = (serviceName: string) => {
  const iconMap: Record<string, any> = {
    'Stack': StarOutline,
    'Steam': PersonOutline,
    'GitHub': GlobeOutline,
    'default': ShieldCheckmarkOutline
  };
  
  return iconMap[serviceName] || iconMap.default;
};

const getServiceColor = (serviceName: string) => {
  const colorMap: Record<string, string> = {
    'Stack': 'var(--warning-500)',
    'Steam': 'var(--primary-500)',
    'GitHub': 'var(--neutral-700)',
    'default': 'var(--brand-primary)'
  };
  
  return colorMap[serviceName] || colorMap.default;
};
</script>

<template>
  <div class="mobile-service-list">
    <NList>
      <NListItem 
        v-for="service in services" 
        :key="service.name"
        class="service-item"
      >
        <div class="service-icon" :style="{ background: getServiceColor(service.name) + '20' }">
          <NIcon :component="getServiceIcon(service.name)" :color="getServiceColor(service.name)" />
        </div>
        
        <div class="service-info">
          <NText class="service-name">
            {{ service.name }}
          </NText>
          <NText depth="3" class="service-description">
            {{ service.login }}
          </NText>
        </div>
        
        <div class="service-actions">
          <NIcon component="LockClosedOutline" color="var(--text-tertiary)" />
        </div>
      </NListItem>
    </NList>
  </div>
</template>

<style scoped lang="scss">
.mobile-service-list {
  padding: 1rem;
  
  .service-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 12px;
    margin-bottom: 0.75rem;
    transition: all 0.2s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
      border-color: var(--border-secondary);
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .service-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .service-info {
    flex: 1;
    min-width: 0;
    
    .service-name {
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
      display: block;
    }
    
    .service-description {
      font-size: 0.875rem;
      color: var(--text-secondary);
      display: block;
    }
  }
  
  .service-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }
}

// Dark theme adjustments
body[theme='dark'] {
  .mobile-service-list {
    .service-item {
      background: var(--bg-secondary);
      border-color: var(--border-secondary);
      
      &:hover {
        border-color: var(--border-primary);
      }
    }
  }
}
</style> 