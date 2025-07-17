<template>
  <ConsoleSandboxSection title="Functions & Errors" :selectedMethod="selectedMethod">
    <button @click="logFunction(() => console.log('Function executed'))" class="console-sandbox__btn">Function</button>
    <button @click="logError(new Error('Test error with stack trace'))" class="console-sandbox__btn console-sandbox__btn--error">Error</button>
    <button @click="logResolvedPromise()" class="console-sandbox__btn">Resolved Promise</button>
    <button @click="logPendingPromise()" class="console-sandbox__btn">Pending Promise</button>
    <button @click="logRejectedPromise()" class="console-sandbox__btn console-sandbox__btn--error">Rejected Promise</button>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';

export default {
  name: 'FunctionsErrorsSection',
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
    logFunction(fn) {
      logWithMethod(this.selectedMethod, 'Function:', fn);
    },
    logError(err) {
      logWithMethod(this.selectedMethod, 'Error:', err);
    },
    logResolvedPromise() {
      const promise = Promise.resolve('resolved value');
      logWithMethod(this.selectedMethod, 'Resolved Promise:', promise);
    },
    logPendingPromise() {
      const promise = new Promise(() => {});
      logWithMethod(this.selectedMethod, 'Pending Promise:', promise);
    },
    logRejectedPromise() {
      try {
        const promise = Promise.reject('rejected value');
        logWithMethod(this.selectedMethod, 'Rejected Promise:', promise);
      } catch (e) {
        console.error('Caught error from rejected promise:', e);
      }
    }
  }
};
</script> 