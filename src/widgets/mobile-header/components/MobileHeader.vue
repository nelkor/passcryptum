<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { NText, NIcon } from 'naive-ui';
import { 
  WifiOutline, 
  CellularOutline, 
  BatteryFullOutline 
} from '@vicons/ionicons5';

const currentTime = ref('9:41');
const currentDate = ref('');

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: false 
  });
  currentDate.value = now.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

let timeInterval: NodeJS.Timeout;

onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});
</script>

<template>
  <div class="mobile-header">
    <div class="mobile-time">
      {{ currentTime }}
    </div>
    
    <div class="mobile-status">
      <NIcon component="CellularOutline" />
      <NIcon component="WifiOutline" />
      <NIcon component="BatteryFullOutline" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-primary);
  font-size: 0.875rem;
  font-weight: 500;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  
  .mobile-time {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 1rem;
  }
  
  .mobile-status {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--text-secondary);
    
    .n-icon {
      width: 1rem;
      height: 1rem;
    }
  }
}

// Dark theme adjustments
body[theme='dark'] {
  .mobile-header {
    background: var(--bg-secondary);
    border-bottom-color: var(--border-secondary);
  }
}
</style> 