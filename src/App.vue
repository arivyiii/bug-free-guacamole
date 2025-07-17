<script setup>
import { RouterView } from 'vue-router'
import AgentIndicator from './components/AgentIndicator.vue'
import DarkModeToggle from './components/DarkModeToggle.vue'

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
          <router-link to="/jzb-encoder" class="nav-link">JZB Encoder</router-link>
          <AgentIndicator />
          <DarkModeToggle />
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
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Add transition to all elements for smooth dark mode switching */
:global(*) {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Dark mode styles */
.dark body {
  background-color: #1a1a1a;
  color: #e0e0e0;
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
  transition: background-color 0.3s ease;
}

.dark .navigation {
  background-color: #2d2d2d;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
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
  transition: background-color 0.3s ease;
}

.dark .nav-link:hover {
  background-color: #444;
}

.nav-link.router-link-active {
  background-color: #4CAF50;
  transition: background-color 0.3s ease;
}

.dark .nav-link.router-link-active {
  background-color: #45a049;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  transition: background-color 0.3s ease;
}

.dark .main-content {
  background-color: #1a1a1a;
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
}
</style>

