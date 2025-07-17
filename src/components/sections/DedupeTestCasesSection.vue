<template>
  <ConsoleSandboxSection title="Dedupe Test Cases" :selectedMethod="selectedMethod">
    <button @click="dedupeSameMethodMessageStack" class="console-sandbox__btn">Same method, message, stack (x5)</button>
    <button @click="dedupeSameMethodMessageDiffStack" class="console-sandbox__btn">Same method+message, diff stack (x5)</button>
    <button @click="dedupeSameMethodStackDiffMessage" class="console-sandbox__btn">Same method+stack, diff message (x5)</button>
    <button @click="dedupeDiffMethodSameMessageStack" class="console-sandbox__btn">Diff method, same message+stack (x5)</button>
    <button @click="dedupeDiffMethodMessageStack" class="console-sandbox__btn">Diff method, message, stack (x5)</button>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';

export default {
  name: 'DedupeTestCasesSection',
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
    dedupeSameMethodMessageStack() {
      // Same method, message, and stack - log from same function multiple times
      const logSameStack = () => {
        const err = new Error('dedupe');
        if (this.selectedMethod === 'all') {
          console.log('dedupe message', err);
        } else {
          console[this.selectedMethod]('dedupe message', err);
        }
      };
      
      for(let i = 0; i < 5; i++) {
        logSameStack();
      }
    },
    dedupeSameMethodMessageDiffStack() {
      // Same method and message, but different stack traces by calling from different functions
      const logFromFunction1 = () => {
        const err = new Error('dedupe');
        console.error('dedupe message', err);
      };
      
      const logFromFunction2 = () => {
        const err = new Error('dedupe');
        console.error('dedupe message', err);
      };
      
      const logFromFunction3 = () => {
        const err = new Error('dedupe');
        console.error('dedupe message', err);
      };
      
      const logFromFunction4 = () => {
        const err = new Error('dedupe');
        console.error('dedupe message', err);
      };
      
      const logFromFunction5 = () => {
        const err = new Error('dedupe');
        console.error('dedupe message', err);
      };
      
      // Call each function once to create different stack traces
      logFromFunction1();
      logFromFunction2();
      logFromFunction3();
      logFromFunction4();
      logFromFunction5();
    },
    dedupeSameMethodStackDiffMessage() {
      // Same method and stack, but different messages
      const logWithMessage = (message) => {
        const err = new Error('dedupe');
        if (this.selectedMethod === 'all') {
          console.log(message, err);
        } else {
          console[this.selectedMethod](message, err);
        }
      };
      
      for(let i = 0; i < 5; i++) {
        logWithMessage('dedupe message ' + i);
      }
    },
    dedupeDiffMethodSameMessageStack() {
      // Different methods, same message and stack
      const methods = ['info', 'warn', 'error', 'log', 'debug'];
      
      const logWithMethod = (method) => {
        const err = new Error('dedupe');
        console[method]('dedupe message', err);
      };
      
      for(let i = 0; i < 5; i++) {
        logWithMethod(methods[i]);
      }
    },
    dedupeDiffMethodMessageStack() {
      // Different methods, messages, and stack traces
      const methods = ['info', 'warn', 'error', 'log', 'debug'];
      
      const logFromContext1 = (method, message) => {
        const err = new Error('dedupe');
        console[method](message, err);
      };
      
      const logFromContext2 = (method, message) => {
        const err = new Error('dedupe');
        console[method](message, err);
      };
      
      const logFromContext3 = (method, message) => {
        const err = new Error('dedupe');
        console[method](message, err);
      };
      
      const logFromContext4 = (method, message) => {
        const err = new Error('dedupe');
        console[method](message, err);
      };
      
      const logFromContext5 = (method, message) => {
        const err = new Error('dedupe');
        console[method](message, err);
      };
      
      // Call each context with different method and message
      for(let i = 0; i < 5; i++) {
        const method = methods[i];
        const message = 'dedupe message ' + i;
        
        switch(i) {
          case 0: logFromContext1(method, message); break;
          case 1: logFromContext2(method, message); break;
          case 2: logFromContext3(method, message); break;
          case 3: logFromContext4(method, message); break;
          case 4: logFromContext5(method, message); break;
        }
      }
    }
  }
};
</script>