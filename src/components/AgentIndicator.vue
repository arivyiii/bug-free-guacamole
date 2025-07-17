<template>
  <div v-if="!routerReady" class="agent-indicator agent-indicator--loading">
    <span class="agent-indicator__loading-text">Loading...</span>
  </div>
  <div v-else-if="hasLocalAgentParam !== null"
    class="agent-indicator" 
    :class="`agent-indicator--${agentType}`"
    @dblclick="toggleAgentType"
    title="Double-click to toggle agent type"
  >
    <span class="agent-indicator__label">{{ agentType.toUpperCase() }}</span>
    <span v-if="agentReason" class="agent-indicator__reason">({{ agentReason }})</span>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, nextTick, watch } from 'vue'
import { localAgentUrlParam } from '../constants'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const hasLocalAgentParam = ref(null);
const routerReady = ref(false);

const toggleAgentType = () => {
  const query = { ...route.query }
  if (query[localAgentUrlParam]) {
    // Remove the parameter
    delete query[localAgentUrlParam]
  } else {
    // Add the parameter
    query[localAgentUrlParam] = 'true'
  }

  // Update route and force refresh in one go
  router.push({ query }).then(() => {
    window.location.reload()
  })
}

const agentType = computed(() => {
  const useLocalAgent = hasLocalAgentParam.value || import.meta.env.VITE_USE_LOCAL_AGENT

  return useLocalAgent ? 'local' : 'production'
})

const agentReason = computed(() => {
  return hasLocalAgentParam.value ? 'query parameter' : 'environment variable'
});

onMounted(async () => {
    await router.isReady();
    routerReady.value = true;
    hasLocalAgentParam.value = route.query[localAgentUrlParam] === 'true'
});
</script>

<style scoped lang="scss">
.agent-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  // Modifiers
  &--loading {
    background-color: #666;
    color: white;
    cursor: default;
  }

  &--local {
    background-color: #ff9800;
    color: white;
  }

  &--production {
    background-color: #4CAF50;
    color: white;
  }

  // Elements
  &__label {
    font-weight: bold;
  }

  &__reason {
    font-size: 10px;
    opacity: 0.9;
    font-weight: normal;
  }

  &__loading-text {
    font-size: 10px;
    opacity: 0.8;
  }

  // Responsive
  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 8px;

    &__reason {
      display: none;
    }
  }
}
</style> 