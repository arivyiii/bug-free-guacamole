<template>
  <div class="console-sandbox">
    <header class="console-sandbox__header" :class="{ 'console-sandbox__header--sticky': isHeaderSticky }">
      <div class="console-sandbox__container">
        <h1 class="console-sandbox__title">Console Sandbox</h1>
        <p class="console-sandbox__subtitle">Test JavaScript console methods with various data types</p>
        
        <div class="console-sandbox__method-selector">
          <label for="method-select">Console Method:</label>
          <select id="method-select" v-model="selectedMethod" class="console-sandbox__method-select">
            <option value="log">console.log</option>
            <option value="info">console.info</option>
            <option value="warn">console.warn</option>
            <option value="error">console.error</option>
            <option value="debug">console.debug</option>
            <option value="all">All Types</option>
          </select>
        </div>
      </div>
    </header>

    <!-- Placeholder to prevent layout shift -->
    <div class="console-sandbox__header-placeholder" v-show="isHeaderSticky"></div>

    <main class="console-sandbox__main">
      <div class="console-sandbox__container">
        <div class="console-sandbox__sections">
          <!-- Primitives Section -->
          <PrimitivesSection :selectedMethod="selectedMethod" />

          <!-- Objects & Arrays Section -->
          <ObjectsArraysSection :selectedMethod="selectedMethod" />

          <!-- Faker Data Section -->
          <FakerDataSection :selectedMethod="selectedMethod" />

          <!-- Functions & Errors Section -->
          <FunctionsErrorsSection :selectedMethod="selectedMethod" />

          <!-- DOM Elements Section -->
          <DomElementsSection :selectedMethod="selectedMethod" />

          <!-- Utilities Section -->
          <UtilitiesSection :selectedMethod="selectedMethod" />

          <!-- Console Styling Section -->
          <ConsoleStylingSection :selectedMethod="selectedMethod" />

          <!-- XSS Test Cases Section -->
          <XssTestCasesSection :selectedMethod="selectedMethod" />

          <!-- IP Address Test Cases Section -->
          <IpAddressTestCasesSection :selectedMethod="selectedMethod" />

          <!-- SSN Test Cases Section -->
          <SsnTestCasesSection :selectedMethod="selectedMethod" />

          <!-- Credit Card Test Cases Section -->
          <CreditCardTestCasesSection :selectedMethod="selectedMethod" />

          <!-- HTTPS URL Test Cases Section -->
          <HttpsUrlTestCasesSection :selectedMethod="selectedMethod" />

          <!-- Dedupe Test Cases Section -->
          <DedupeTestCasesSection :selectedMethod="selectedMethod" />

          <!-- Continuous Logging Section -->
          <ContinuousLoggingSection 
            v-if="showAutolog" 
            :selectedMethod="selectedMethod" 
            :isLogging="isLogging"
            @update:isLogging="isLogging = $event"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// Import global styles
import '../assets/consoleSandbox.scss';

import { defineAsyncComponent } from 'vue';

export default {
  name: 'ConsoleSandbox',
  components: {
    PrimitivesSection: defineAsyncComponent(() => import('./sections/PrimitivesSection.vue')),
    ObjectsArraysSection: defineAsyncComponent(() => import('./sections/ObjectsArraysSection.vue')),
    FakerDataSection: defineAsyncComponent(() => import('./sections/FakerDataSection.vue')),
    FunctionsErrorsSection: defineAsyncComponent(() => import('./sections/FunctionsErrorsSection.vue')),
    DomElementsSection: defineAsyncComponent(() => import('./sections/DomElementsSection.vue')),
    UtilitiesSection: defineAsyncComponent(() => import('./sections/UtilitiesSection.vue')),
    ConsoleStylingSection: defineAsyncComponent(() => import('./sections/ConsoleStylingSection.vue')),
    XssTestCasesSection: defineAsyncComponent(() => import('./sections/XssTestCasesSection.vue')),
    IpAddressTestCasesSection: defineAsyncComponent(() => import('./sections/IpAddressTestCasesSection.vue')),
    SsnTestCasesSection: defineAsyncComponent(() => import('./sections/SsnTestCasesSection.vue')),
    CreditCardTestCasesSection: defineAsyncComponent(() => import('./sections/CreditCardTestCasesSection.vue')),
    HttpsUrlTestCasesSection: defineAsyncComponent(() => import('./sections/HttpsUrlTestCasesSection.vue')),
    DedupeTestCasesSection: defineAsyncComponent(() => import('./sections/DedupeTestCasesSection.vue')),
    ContinuousLoggingSection: defineAsyncComponent(() => import('./sections/ContinuousLoggingSection.vue'))
  },
  data() {
    return {
      selectedMethod: 'debug',
      isLogging: false,
      isHeaderSticky: false,
      scrollTicking: false
    };
  },
  computed: {
    isProduction() {
      return process.env.NODE_ENV === 'production';
    },
    showAutolog() {
      return this.$route.query.showAutolog === 'true' || !this.isProduction
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Use requestAnimationFrame for smoother performance
      if (!this.scrollTicking) {
        this.scrollTicking = true;
        requestAnimationFrame(() => {
          this.updateHeaderState();
          this.scrollTicking = false;
        });
      }
    },
    
    updateHeaderState() {
      // Use a more gradual threshold with a larger buffer for smoother transitions
      const scrollThreshold = 60;
      const buffer = 30;
      const scrollY = window.scrollY;
      
      if (scrollY > scrollThreshold + buffer) {
        this.isHeaderSticky = true;
      } else if (scrollY < scrollThreshold - buffer) {
        this.isHeaderSticky = false;
      }
      // Keep current state if in buffer zone to prevent flickering
    }
  }
};
</script>