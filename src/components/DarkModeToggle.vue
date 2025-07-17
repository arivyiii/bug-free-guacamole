<template>
  <div 
    @click="isDark = !isDark" 
    class="dark-mode-toggle"
    :class="{ 'dark-mode-toggle--dark': isDark }"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <div class="dark-mode-toggle__track">
      <div class="dark-mode-toggle__slider">
        <i 
          v-if="!isDark" 
          class="dark-mode-toggle__icon fas fa-sun"
        ></i>
        <i 
          v-else 
          class="dark-mode-toggle__icon fas fa-moon"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<style scoped lang="scss">
.dark-mode-toggle {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  // Modifiers
  &--dark {
    .dark-mode-toggle__track {
      background-color: #4a5568;
    }

    .dark-mode-toggle__slider {
      transform: translateX(30px);
      background-color: #f7fafc;
    }

    .dark-mode-toggle__icon {
      color: #3b82f6;
    }
  }

  // Elements
  &__track {
    position: relative;
    width: 60px;
    height: 30px;
    background-color: #e0e0e0;
    border-radius: 15px;
    padding: 3px;
    transition: background-color 0.5s ease;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__slider {
    position: relative;
    width: 24px;
    height: 24px;
    background-color: #ffffff;
    border-radius: 50%;
    transition: transform 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &__icon {
    font-size: 14px;
    transition: all 0.5s ease;
    color: #f59e0b;
    animation: fadeIn 0.5s ease;
  }

  // Hover effects
  &:hover {
    .dark-mode-toggle__track {
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    .dark-mode-toggle__slider {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
    }
  }
}

// Dark mode hover effects
.dark .dark-mode-toggle:hover {
  .dark-mode-toggle__track {
    background-color: #5a6a7a;
  }

  .dark-mode-toggle__slider {
    background-color: #ffffff;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style> 