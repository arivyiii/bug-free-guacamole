<template>
  <div 
    class="agent-indicator" 
    :class="agentType"
    @dblclick="toggleAgentType"
    title="Double-click to toggle agent type"
  >
    <span class="agent-label">{{ agentType.toUpperCase() }}</span>
    <span v-if="agentReason" class="agent-reason">({{ agentReason }})</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { localAgentUrlParam } from '../constants'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()


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

const hasLocalAgentParam = computed(() => {
  return route.query[localAgentUrlParam] === 'true'
})

const agentType = computed(() => {
  const useLocalAgent = hasLocalAgentParam.value || import.meta.env.VITE_USE_LOCAL_AGENT

  return useLocalAgent ? 'local' : 'production'
})

const agentReason = computed(() => {
  return hasLocalAgentParam.value ? 'query parameter' : 'environment variable'
});
</script>

<style scoped>
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
}

.agent-indicator:hover {
  opacity: 0.8;
}

.agent-indicator.local {
  background-color: #ff9800;
  color: white;
}

.agent-indicator.production {
  background-color: #4CAF50;
  color: white;
}

.agent-label {
  font-weight: bold;
}

.agent-reason {
  font-size: 10px;
  opacity: 0.9;
  font-weight: normal;
}

@media (max-width: 768px) {
  .agent-indicator {
    font-size: 10px;
    padding: 4px 8px;
  }
  
  .agent-reason {
    display: none;
  }
}
</style> 