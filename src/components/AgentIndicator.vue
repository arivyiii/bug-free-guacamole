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
import { ref, onMounted } from 'vue'
import { localAgentUrlParam } from '../constants'

const agentType = ref('production')
const agentReason = ref('')

const toggleAgentType = () => {
  const url = new URL(window.location.href)
  const urlParams = url.searchParams
  
  const hasLocalAgentParam = urlParams.get(localAgentUrlParam) === 'true'
  
  if (hasLocalAgentParam) {
    // Remove the parameter
    urlParams.delete(localAgentUrlParam)
  } else {
    // Add the parameter
    urlParams.set(localAgentUrlParam, 'true')
  }
  
  // Reload the page with the new URL
  window.location.href = url.toString()
}

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const hasLocalAgentParam = urlParams.get(localAgentUrlParam) === 'true'
  const useLocalAgent = hasLocalAgentParam || import.meta.env.VITE_USE_LOCAL_AGENT
  
  if (useLocalAgent) {
    agentType.value = 'local'
    agentReason.value = hasLocalAgentParam ? 'query parameter' : 'environment variable'
  }
})
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