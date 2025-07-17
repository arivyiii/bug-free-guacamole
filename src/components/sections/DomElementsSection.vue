<template>
  <ConsoleSandboxSection title="DOM Elements" :selectedMethod="selectedMethod">
    <button @click="logDOMElement()" class="console-sandbox__btn">DOM Element</button>
    <button @click="logIframe()" class="console-sandbox__btn">Iframe</button>
    <div id="iframe-container" class="console-sandbox__iframe-container"></div>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';

export default {
  name: 'DomElementsSection',
  components: {
    ConsoleSandboxSection
  },
  props: {
    selectedMethod: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      iframe: null
    };
  },
  methods: {
    logDOMElement() {
      const container = document.createElement('div');
      container.className = 'nested-container';
      let current = container;
      for (let i = 0; i < 5; i++) {
        const child = document.createElement('div');
        child.className = `nested-level-${i}`;
        current.appendChild(child);
        current = child;
      }
      logWithMethod(this.selectedMethod, 'Deeply Nested DOM Element:', container);
    },
    logIframe() {
      if (!this.iframe) {
        this.iframe = document.createElement('iframe');
        this.iframe.src = 'about:blank';
        document.getElementById('iframe-container').appendChild(this.iframe);
      }
      logWithMethod(this.selectedMethod, 'Iframe:', this.iframe);
    }
  }
};
</script>

<style scoped>
</style> 