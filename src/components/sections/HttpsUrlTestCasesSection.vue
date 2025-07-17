<template>
  <ConsoleSandboxSection title="HTTPS URL Test Cases" :selectedMethod="selectedMethod">
    <button @click="logWithMethod('https://example.com')" class="console-sandbox__btn">URL: beginning</button>
    <button @click="logWithMethod('foo https://example.com bar')" class="console-sandbox__btn">URL: middle</button>
    <button @click="logWithMethod('foo bar https://example.com')" class="console-sandbox__btn">URL: end</button>
    <button @click="logWithMethod('https://example.com/path/to/resource')" class="console-sandbox__btn">URL: with path</button>
    <button @click="logWithMethod('https://example.com?foo=bar&baz=qux')" class="console-sandbox__btn">URL: with query</button>
    <button @click="logWithMethod('https://example.com:8080')" class="console-sandbox__btn">URL: with port</button>
    <button @click="logWithMethod('https://example.com#fragment')" class="console-sandbox__btn">URL: with fragment</button>
    <button @click="logWithMethod('https://sub.example.com')" class="console-sandbox__btn">URL: with subdomain</button>
    <button @click="logWithMethod('https://user:pass@example.com')" class="console-sandbox__btn">URL: with credentials</button>
    <button @click="logWithMethod('The user visited https://example.com while browsing the site.')" class="console-sandbox__btn">URL in text</button>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';

export default {
  name: 'HttpsUrlTestCasesSection',
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