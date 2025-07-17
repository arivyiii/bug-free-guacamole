<template>
  <ConsoleSandboxSection title="SSN Test Cases" :selectedMethod="selectedMethod">
    <button @click="logWithMethod('123-45-6789')" class="console-sandbox__btn">SSN: 123-45-6789</button>
    <button @click="logWithMethod('12345678')" class="console-sandbox__btn">SSN: 12345678</button>
    <button @click="logWithMethod('123 45 6789')" class="console-sandbox__btn">SSN: 123 45 6789</button>
    <button @click="logWithMethod('123.45.6789')" class="console-sandbox__btn">SSN: 123.45.6789</button>
    <button @click="logWithMethod('123/45/6789')" class="console-sandbox__btn">SSN: 123/45/6789</button>
    <button @click="logWithMethod('(123) 45-6789')" class="console-sandbox__btn">SSN: (123) 45-6789</button>
    <button @click="logWithMethod('The provided SSN is 123-45-6789 and should be scrubbed.')" class="console-sandbox__btn">SSN in text</button>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';

export default {
  name: 'SsnTestCasesSection',
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
    logWithMethod
  }
};
</script> 