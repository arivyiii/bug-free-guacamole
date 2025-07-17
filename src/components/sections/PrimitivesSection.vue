<template>
  <ConsoleSandboxSection title="Primitives" :selectedMethod="selectedMethod">
    <button @click="logPrimitive('string', 'Hello, world!')" class="console-sandbox__btn">String</button>
    <button @click="logPrimitive('number', 42)" class="console-sandbox__btn">Number</button>
    <button @click="logPrimitive('boolean', true)" class="console-sandbox__btn">Boolean</button>
    <button @click="logPrimitive('null', null)" class="console-sandbox__btn">Null</button>
    <button @click="logPrimitive('undefined', undefined)" class="console-sandbox__btn">Undefined</button>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';

export default {
  name: 'PrimitivesSection',
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
    logPrimitive(type, value) {
      logWithMethod(this.selectedMethod, `[${type}]`, value);
    }
  }
};
</script> 