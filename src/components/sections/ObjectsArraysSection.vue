<template>
  <ConsoleSandboxSection title="Objects & Arrays" :selectedMethod="selectedMethod">
    <button @click="logObject({ key: 'value', nested: { foo: 'bar' } })" class="console-sandbox__btn">Object</button>
    <button @click="logObject({})" class="console-sandbox__btn">Empty Object</button>
    <button @click="logObject({ a: { b: { c: { d: 1 } } } })" class="console-sandbox__btn">Nested Object</button>
    <button @click="logObject(getSymbolKeyObject())" class="console-sandbox__btn">Symbol Keys</button>
    <button @click="logArray([1, 2, 3, 4, 5])" class="console-sandbox__btn">Array</button>
    <button @click="logArray([])" class="console-sandbox__btn">Empty Array</button>
    <button @click="logArray([{id:1},{id:2}])" class="console-sandbox__btn">Object Array</button>
    <button @click="logArray([1, 'two', null, {foo:'bar'}, [5,6]])" class="console-sandbox__btn">Mixed Array</button>
    <button @click="logSet()" class="console-sandbox__btn">Set</button>
    <button @click="logWeakSet()" class="console-sandbox__btn">WeakSet</button>
    <button @click="logMap()" class="console-sandbox__btn">Map</button>
    <button @click="logWeakMap()" class="console-sandbox__btn">WeakMap</button>
    <button @click="logRegExp()" class="console-sandbox__btn">RegExp</button>
    <button @click="logArrayBuffer()" class="console-sandbox__btn">ArrayBuffer</button>
    <button @click="logDataView()" class="console-sandbox__btn">DataView</button>
    <button @click="logTypedArray()" class="console-sandbox__btn">Uint8Array</button>
    <button @click="logCircularReference()" class="console-sandbox__btn">Circular Ref</button>
    <button @click="logDate()" class="console-sandbox__btn">Date</button>
    <button @click="logLargeObject()" class="console-sandbox__btn">Large Object</button>
    <button @click="logLargeObject(50)" class="console-sandbox__btn">Large Object (50)</button>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';

export default {
  name: 'ObjectsArraysSection',
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
    logObject(obj) {
      logWithMethod(this.selectedMethod, 'Object:', obj);
    },
    logArray(arr) {
      logWithMethod(this.selectedMethod, 'Array:', arr);
    },
    logSet() {
      const set = new Set([1, 2, 3, 4, 5]);
      logWithMethod(this.selectedMethod, 'Set:', set);
    },
    logWeakSet() {
      const obj1 = {};
      const obj2 = {};
      const weakSet = new WeakSet([obj1, obj2]);
      logWithMethod(this.selectedMethod, 'WeakSet:', weakSet);
    },
    logMap() {
      const map = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ]);
      logWithMethod(this.selectedMethod, 'Map:', map);
    },
    logWeakMap() {
      const obj1 = {};
      const obj2 = {};
      const weakMap = new WeakMap([[obj1, 'foo'], [obj2, 'bar']]);
      logWithMethod(this.selectedMethod, 'WeakMap:', weakMap);
    },
    logRegExp() {
      const regex = /abc/i;
      logWithMethod(this.selectedMethod, 'RegExp:', regex);
    },
    logArrayBuffer() {
      const buffer = new ArrayBuffer(8);
      logWithMethod(this.selectedMethod, 'ArrayBuffer:', buffer);
    },
    logDataView() {
      const buffer = new ArrayBuffer(8);
      const view = new DataView(buffer);
      logWithMethod(this.selectedMethod, 'DataView:', view);
    },
    logTypedArray() {
      const arr = new Uint8Array([1, 2, 3, 4]);
      logWithMethod(this.selectedMethod, 'Uint8Array:', arr);
    },
    logCircularReference() {
      const obj = {};
      obj.self = obj;
      logWithMethod(this.selectedMethod, 'Circular Reference:', obj);
    },
    logDate() {
      const date = new Date();
      logWithMethod(this.selectedMethod, 'Date:', date);
    },
    getSymbolKeyObject() {
      const sym = Symbol('sym');
      return { [sym]: 'symbol value', normal: 'normal value' };
    },
    logLargeObject(logCount = 1) {
      const largeObject = {
        metadata: {
          version: '1.0.0',
          timestamp: new Date().toISOString(),
          environment: 'development'
        },
        user: {
          id: 12345,
          profile: {
            name: 'John Doe',
            email: 'john@example.com',
            preferences: {
              theme: 'dark',
              notifications: true,
              language: 'en-US'
            }
          },
          roles: ['admin', 'user', 'editor'],
          permissions: new Set(['read', 'write', 'delete', 'update'])
        },
        data: {
          items: Array.from({ length: 100 }, (_, i) => ({
            id: i + 1,
            name: `Item ${i + 1}`,
            value: Math.random() * 1000,
            tags: ['tag1', 'tag2', 'tag3'].slice(0, Math.floor(Math.random() * 3) + 1),
            metadata: {
              created: new Date(Date.now() - Math.random() * 10000000000),
              modified: new Date(),
              status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)]
            }
          })),
          statistics: {
            total: 100,
            active: 75,
            inactive: 20,
            pending: 5,
            categories: {
              electronics: 30,
              clothing: 25,
              books: 20,
              other: 25
            }
          }
        },
        settings: {
          api: {
            endpoint: 'https://api.example.com',
            timeout: 5000,
            retries: 3,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer token123'
            }
          },
          cache: {
            enabled: true,
            ttl: 3600,
            maxSize: '1GB'
          }
        },
        history: Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          action: ['create', 'update', 'delete'][Math.floor(Math.random() * 3)],
          timestamp: new Date(Date.now() - i * 86400000),
          user: `user${Math.floor(Math.random() * 10) + 1}`,
          details: {
            changes: Math.floor(Math.random() * 10) + 1,
            affectedItems: Math.floor(Math.random() * 100) + 1
          }
        }))
      };
      for (let i = 0; i < logCount; i++) {
        logWithMethod(this.selectedMethod, 'Large Object:', largeObject);
      }
    }
  }
};
</script> 