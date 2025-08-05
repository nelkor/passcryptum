<script setup lang="ts">
import { NEmpty, NButton, NCard, NText, NSpace } from 'naive-ui';
import { 
  AddCircleOutline, 
  ShieldCheckmarkOutline,
  SparklesOutline,
  LockClosedOutline 
} from '@vicons/ionicons5';

import { addService } from '@/features/add-service';
import { ServiceView } from '@/widgets/service-view';
import { ServiceStub } from '@/widgets/service-stub';
import { MobileServiceList } from '@/widgets/mobile-service-list';
import { MobileHeader } from '@/widgets/mobile-header';
import { areServicesEmpty, isServiceSelected } from '@/entities/session';
</script>

<template>
  <div class="work-page">
    <!-- Mobile Header -->
    <MobileHeader />
    
    <!-- Mobile Container -->
    <div class="mobile-container">
      <!-- Empty State -->
      <div v-if="areServicesEmpty" class="empty-state">
        <NCard class="empty-card modern-card">
          <div class="empty-content">
            <div class="empty-icon">
              <ShieldCheckmarkOutline />
            </div>
            
            <NText class="empty-title">
              Welcome to Passcryptum
            </NText>
            
            <NText depth="3" class="empty-description">
              Start by creating your first service to generate secure passwords
            </NText>
            
            <div class="features-preview">
              <div class="feature-preview">
                <SparklesOutline class="feature-preview-icon" />
                <span>Cryptographic Security</span>
              </div>
              <div class="feature-preview">
                <LockClosedOutline class="feature-preview-icon" />
                <span>Zero Storage</span>
              </div>
            </div>
            
            <NButton 
              size="large" 
              type="primary" 
              @click="addService"
              class="create-button modern-button"
            >
              <template #icon>
                <AddCircleOutline />
              </template>
              Create Your First Service
            </NButton>
          </div>
        </NCard>
      </div>

      <!-- Service Views -->
      <div v-else class="service-container">
        <ServiceView v-if="isServiceSelected" />
        <ServiceStub v-else />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.work-page {
  min-height: 100vh;
  background: var(--bg-primary);
  
  @media (max-width: 768px) {
    padding: 0;
  }
}

.mobile-container {
  max-width: 375px;
  margin: 0 auto;
  min-height: calc(100vh - 60px);
  background: var(--bg-primary);
  
  @media (min-width: 768px) {
    max-width: 1200px;
    padding: 2rem;
  }
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
}

.empty-card {
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.empty-content {
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  color: var(--brand-primary);
  margin: 0 auto 1.5rem;
  
  svg {
    width: 100%;
    height: 100%;
  }
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  display: block;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
}

.empty-description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  display: block;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
}

.features-preview {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
}

.feature-preview {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--bg-tertiary);
  border-radius: 8px;
  border: 1px solid var(--border-primary);
  
  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
    
    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  }
}

.feature-preview-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--brand-primary);
  
  @media (max-width: 768px) {
    width: 1rem;
    height: 1rem;
  }
}

.create-button {
  height: 48px;
  font-weight: 600;
  font-size: 1rem;
  background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
  border: none;
  
  &:hover {
    background: linear-gradient(135deg, var(--brand-secondary), var(--brand-primary));
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  @media (max-width: 768px) {
    height: 44px;
    font-size: 0.875rem;
  }
}

.service-container {
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
}

// Dark theme adjustments
body[theme='dark'] {
  .feature-preview {
    background: var(--bg-secondary);
    border-color: var(--border-secondary);
  }
}
</style>
