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
import { useRoute } from 'vue-router'

const route = useRoute()


const agentType = ref('production')
const agentReason = ref('')

const toggleAgentType = () => {
  const hasLocalAgentParam = route.query.localAgent === 'true'
  
  if (hasLocalAgentParam) {
    // Remove the parameter
    delete route.query.localAgent
  } else {
    // Add the parameter
    route.query.localAgent = 'true'
  }
  
  // Reload the page with the new URL
  window.open(route.href, '_self');
}

onMounted(() => {
  const hasLocalAgentParam = route.query.localAgent === 'true'
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