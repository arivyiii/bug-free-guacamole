<template>
  <ConsoleSandboxSection title="IP Address Test Cases" :selectedMethod="selectedMethod">
    <button @click="logWithMethod('192.168.1.1')" class="console-sandbox__btn">IP: 192.168.1.1</button>
    <button @click="logWithMethod('192.168.001.001')" class="console-sandbox__btn">IP: 192.168.001.001</button>
    <button @click="logWithMethod('192 . 168 . 1 . 1')" class="console-sandbox__btn">IP: 192 . 168 . 1 . 1</button>
    <button @click="logWithMethod('[192.168.1.1]')" class="console-sandbox__btn">IP: [192.168.1.1]</button>
    <button @click="logWithMethod('2001:0db8:85a3:0000:0000:8a2e:0370:7334')" class="console-sandbox__btn">IPv6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334</button>
    <button @click="logWithMethod('The user connected from 192.168.1.1 and accessed the system.')" class="console-sandbox__btn">IP in text</button>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';

export default {
  name: 'IpAddressTestCasesSection',
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