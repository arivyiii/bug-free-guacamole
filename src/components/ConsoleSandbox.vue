<template>
  <div class="console-sandbox">
    <h1>Console Sandbox</h1>
    <div class="multiselect">
      <label>Select Console Method:</label>
      <select v-model="selectedMethod">
        <option value="log">Log</option>
        <option value="info">Info</option>
        <option value="warn">Warn</option>
        <option value="error">Error</option>
      </select>
    </div>
    <div class="sections">
      <section>
        <h2>Primitives</h2>
        <div class="button-grid">
          <button @click="logPrimitive('string', 'Hello, world!')">Log String</button>
          <button @click="logPrimitive('number', 42)">Log Number</button>
          <button @click="logPrimitive('boolean', true)">Log Boolean</button>
          <button @click="logPrimitive('null', null)">Log Null</button>
          <button @click="logPrimitive('undefined', undefined)">Log Undefined</button>
        </div>
      </section>
      <section>
        <h2>Objects & Arrays</h2>
        <div class="button-grid">
          <button @click="logObject({ key: 'value', nested: { foo: 'bar' } })">Log Object</button>
          <button @click="logObject({})">Log Empty Object</button>
          <button @click="logObject({ a: { b: { c: { d: 1 } } } })">Log Deeply Nested Object</button>
          <button @click="logObject(getSymbolKeyObject())">Log Object with Symbol Key</button>
          <button @click="logArray([1, 2, 3, 4, 5])">Log Array</button>
          <button @click="logArray([])">Log Empty Array</button>
          <button @click="logArray([{id:1},{id:2}])">Log Array of Objects</button>
          <button @click="logArray([1, 'two', null, {foo:'bar'}, [5,6]])">Log Mixed Array</button>
          <button @click="logSet()">Log Set</button>
          <button @click="logWeakSet()">Log WeakSet</button>
          <button @click="logMap()">Log Map</button>
          <button @click="logWeakMap()">Log WeakMap</button>
          <button @click="logRegExp()">Log RegExp</button>
          <button @click="logArrayBuffer()">Log ArrayBuffer</button>
          <button @click="logDataView()">Log DataView</button>
          <button @click="logTypedArray()">Log Uint8Array</button>
          <button @click="logCircularReference()">Log Circular Reference</button>
          <button @click="logDate()">Log Date</button>
          <button @click="logLargeObject()">Log Large Object</button>
        </div>
      </section>
      <section>
        <h2>Functions & Errors</h2>
        <div class="button-grid">
          <button @click="logFunction(() => console.log('Function executed'))">Log Function</button>
          <button @click="logError(new Error('Test error with stack trace'))">Log Error</button>
          <button @click="logResolvedPromise()">Log Resolved Promise</button>
          <button @click="logPendingPromise()">Log Pending Promise</button>
          <button @click="logRejectedPromise()">Log Rejected Promise</button>
        </div>
      </section>
      <section>
        <h2>DOM Elements</h2>
        <div class="button-grid">
          <button @click="logDOMElement()">Log DOM Element</button>
          <button @click="logIframe()">Log Iframe</button>
        </div>
        <div id="iframe-container"></div>
      </section>
      <section>
        <h2>Other</h2>
        <div class="button-grid">
          <button @click="logDeduped('This is a deduped log', 3)">Log Deduped (3 times)</button>
          <button @click="logAllTypes('Test message')">Log All Types</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsoleSandbox',
  data() {
    return {
      selectedMethod: 'log',
      iframe: null
    };
  },
  methods: {
    logPrimitive(type, value) {
      console[this.selectedMethod](`[${type}]`, value);
    },
    logObject(obj) {
      console[this.selectedMethod]('Object:', obj);
    },
    logArray(arr) {
      console[this.selectedMethod]('Array:', arr);
    },
    logSet() {
      const set = new Set([1, 2, 3, 4, 5]);
      console[this.selectedMethod]('Set:', set);
    },
    logWeakSet() {
      const obj1 = {};
      const obj2 = {};
      const weakSet = new WeakSet([obj1, obj2]);
      console[this.selectedMethod]('WeakSet:', weakSet);
    },
    logMap() {
      const map = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ]);
      console[this.selectedMethod]('Map:', map);
    },
    logWeakMap() {
      const obj1 = {};
      const obj2 = {};
      const weakMap = new WeakMap([[obj1, 'foo'], [obj2, 'bar']]);
      console[this.selectedMethod]('WeakMap:', weakMap);
    },
    logRegExp() {
      const regex = /abc/i;
      console[this.selectedMethod]('RegExp:', regex);
    },
    logArrayBuffer() {
      const buffer = new ArrayBuffer(8);
      console[this.selectedMethod]('ArrayBuffer:', buffer);
    },
    logDataView() {
      const buffer = new ArrayBuffer(8);
      const view = new DataView(buffer);
      console[this.selectedMethod]('DataView:', view);
    },
    logTypedArray() {
      const arr = new Uint8Array([1, 2, 3, 4]);
      console[this.selectedMethod]('Uint8Array:', arr);
    },
    logResolvedPromise() {
      const promise = Promise.resolve('resolved value');
      console[this.selectedMethod]('Resolved Promise:', promise);
    },
    logPendingPromise() {
      const promise = new Promise(() => {});
      console[this.selectedMethod]('Pending Promise:', promise);
    },
    logRejectedPromise() {
      try {
        const promise = Promise.reject('rejected value');
        console[this.selectedMethod]('Rejected Promise:', promise);
      } catch (e) {
        console.error('Caught error from rejected promise:', e);
      }
    },
    logFunction(fn) {
      console[this.selectedMethod]('Function:', fn);
    },
    logError(err) {
      console.error('Error:', err);
    },
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
      console[this.selectedMethod]('Deeply Nested DOM Element:', container);
    },
    logIframe() {
      if (!this.iframe) {
        this.iframe = document.createElement('iframe');
        this.iframe.src = 'about:blank';
        document.getElementById('iframe-container').appendChild(this.iframe);
      }
      console[this.selectedMethod]('Iframe:', this.iframe);
    },
    logDeduped(message, count) {
      for (let i = 0; i < count; i++) {
        console[this.selectedMethod](message);
      }
    },
    logAllTypes(message) {
      console.log('Log:', message);
      console.info('Info:', message);
      console.warn('Warn:', message);
      console.error('Error:', message);
    },
    logCircularReference() {
      const obj = {};
      obj.self = obj;
      console[this.selectedMethod]('Circular Reference:', obj);
    },
    logDate() {
      const date = new Date();
      console[this.selectedMethod]('Date:', date);
    },
    getSymbolKeyObject() {
      const sym = Symbol('sym');
      return { [sym]: 'symbol value', normal: 'normal value' };
    },
    logLargeObject() {
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
      console[this.selectedMethod]('Large Object:', largeObject);
    }
  }
};
</script>

<style scoped>
.console-sandbox {
  padding: 20px;
  font-family: Arial, sans-serif;
}
.sections {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: flex-start;
}
section {
  flex: 1 1 320px;
  min-width: 320px;
  max-width: 400px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  box-sizing: border-box;
  background: #fff;
}
.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}
button {
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #45a049;
}
.multiselect {
  margin-bottom: 20px;
}
select {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}
#iframe-container {
  margin-top: 10px;
  height: 100px;
  border: 1px dashed #ccc;
}
</style> 