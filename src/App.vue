<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { localAgentUrlParam } from './constants'

const agentType = ref('production')
const agentReason = ref('')

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const hasLocalAgentParam = urlParams.get(localAgentUrlParam) === 'true' || hashParams.get(localAgentUrlParam) === 'true';
  const useLocalAgent = hasLocalAgentParam || import.meta.env.VITE_USE_LOCAL_AGENT;
  
  if (useLocalAgent) {
    agentType.value = 'local'
    agentReason.value = hasLocalAgentParam ? 'query parameter' : 'environment variable'
  }
})

pendo.initialize({
        visitor: {
            id: 'VISITOR-UNIQUE-ID'
        },
        account: {
            id: 'MyAccount'
        }
});
</script>

<template>
  <div id="app">
    <nav class="navigation">
      <div class="nav-container">
        <h1 class="nav-title">Bug Free Guacamole</h1>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Console Sandbox</router-link>
          <router-link to="/jzb-decoder" class="nav-link">JZB Decoder</router-link>
          <div class="agent-indicator" :class="agentType">
            <span class="agent-label">{{ agentType.toUpperCase() }}</span>
            <span v-if="agentReason" class="agent-reason">({{ agentReason }})</span>
          </div>
        </div>
      </div>
    </nav>
    
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navigation {
  background-color: #333;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #555;
}

.nav-link.router-link-active {
  background-color: #4CAF50;
}

.agent-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
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

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 15px;
  }
  
  .nav-links {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 14px;
  }
  
  .agent-indicator {
    font-size: 10px;
    padding: 4px 8px;
  }
  
  .agent-reason {
    display: none;
  }
}
</style>

