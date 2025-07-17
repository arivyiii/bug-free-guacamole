<template>
  <ConsoleSandboxSection title="Utilities" :selectedMethod="selectedMethod">
    <button @click="logDeduped('This is a deduped log', 200)" class="console-sandbox__btn">Deduped Log</button>
    <button @click="logAllTypes('Test message')" class="console-sandbox__btn">All Types</button>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';

export default {
  name: 'UtilitiesSection',
  components: {
    ConsoleSandboxSection
  },
  props: {
    selectedMethod: {
      type: String,
      required: true
    }
  },
  methods: {
    logDeduped(message, count) {
      for (let i = 0; i < count; i++) {
        if (this.selectedMethod === 'all') {
          console.log(message);
        } else {
          console[this.selectedMethod](message);
        }
      }
    },
    logAllTypes(message) {
      console.log(message);
      console.info(message);
      console.warn(message);
      console.error(message);
    }
  }
};
</script> 