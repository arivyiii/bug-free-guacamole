<template>
  <ConsoleSandboxSection title="Credit Card Test Cases" :selectedMethod="selectedMethod">
    <button @click="logWithMethod('4111 1111 1111 1111')" class="console-sandbox__btn">Visa: 4111 1111 1111 1111</button>
    <button @click="logWithMethod('5500 0000 0000 0000')" class="console-sandbox__btn">Mastercard: 5500 0000 0000 0000</button>
    <button @click="logWithMethod('3400 000000 00009')" class="console-sandbox__btn">Amex: 3400 000000 00009</button>
    <button @click="logWithMethod('6011 0000 0000 0004')" class="console-sandbox__btn">Discover: 6011 0000 0000 0004</button>
    <button @click="logWithMethod('4111-1111-1111-1111')" class="console-sandbox__btn">Visa (dashes): 4111-1111-1111-1111</button>
    <button @click="logWithMethod('4111.1111.1111.1111')" class="console-sandbox__btn">Visa (dots): 4111.1111.1111.1111</button>
    <button @click="logWithMethod('4111/1111/1111/1111')" class="console-sandbox__btn">Visa (slashes): 4111/1111/1111/1111</button>
    <button @click="logWithMethod('4111111111111111')" class="console-sandbox__btn">Visa (no spaces): 4111111111111111</button>
    <button @click="logWithMethod('The card number 4111 1111 1111 1111 was used for the transaction.')" class="console-sandbox__btn">Credit Card in text</button>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';

export default {
  name: 'CreditCardTestCasesSection',
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