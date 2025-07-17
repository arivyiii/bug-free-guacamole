<template>
  <div class="jzb-encoder">
    <div class="jzb-encoder__controls">
      <h2 class="jzb-encoder__title">JZB Encoder</h2>
      <button @click="addPayload" class="jzb-encoder__btn jzb-encoder__btn--add">+ Add Payload</button>
    </div>

    <div
      v-for="(p, idx) in payloads"
      :key="p.id"
      class="jzb-encoder__payload-card"
    >
      <section class="jzb-encoder__payload-section">
        <header class="jzb-encoder__section-header">
          <h3 class="jzb-encoder__section-title">Input #{{ idx + 1 }}</h3>
          <div class="jzb-encoder__actions">
            <button @click="encodePayload(idx)" class="jzb-encoder__btn jzb-encoder__btn--encode">Encode</button>
            <button @click="clearPayload(idx)" class="jzb-encoder__btn jzb-encoder__btn--clear">Clear</button>
            <button @click="removePayload(idx)" class="jzb-encoder__btn jzb-encoder__btn--remove">Remove</button>
          </div>
        </header>
        <textarea
          v-model="p.text"
          placeholder="Paste JSON object here..."
          class="jzb-encoder__input-area"
        ></textarea>
      </section>

      <section class="jzb-encoder__payload-section">
        <header class="jzb-encoder__section-header">
          <h3 class="jzb-encoder__section-title">JZB Output #{{ idx + 1 }}</h3>
          <div class="jzb-encoder__actions">
            <button @click="copyOutput(idx)" class="jzb-encoder__btn jzb-encoder__btn--copy">Copy</button>
            <button @click="openInDecoder(idx)" class="jzb-encoder__btn jzb-encoder__btn--decode">Decode</button>
            <button @click="downloadJzb(idx)" class="jzb-encoder__btn jzb-encoder__btn--download">Download</button>
          </div>
        </header>
        <pre class="jzb-encoder__output-area">{{ p.jzbOutput }}</pre>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import pako from 'pako'
import base64js from 'base64-js'

export default {
  name: 'JzbEncoder',
  setup() {
    const router = useRouter()
    
    const example = JSON.stringify({
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345"
      },
      hobbies: ["reading", "hiking", "coding"],
      active: true
    }, null, 2)

    const payloads = ref([
      { id: Date.now(), text: example, jzbOutput: '' }
    ])

    function makeUrlSafe(base64) {
      return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    }

    function encodeJzb(jsonStr) {
      if (!jsonStr) return ''
      try {
        // Parse and re-stringify to ensure valid JSON
        const obj = JSON.parse(jsonStr)
        const cleanJson = JSON.stringify(obj)
        
        // Convert to UTF-8 bytes
        const jsonBytes = new TextEncoder().encode(cleanJson)
        
        // Compress with deflate
        const compressed = pako.deflate(jsonBytes)
        
        // Convert to base64
        const base64 = base64js.fromByteArray(compressed)
        
        // Make URL-safe
        return makeUrlSafe(base64)
      } catch (e) {
        return `Error: ${e.message}`
      }
    }

    function encodePayload(idx) {
      const p = payloads.value[idx]
      p.jzbOutput = encodeJzb(p.text)
    }

    function clearPayload(idx) {
      const p = payloads.value[idx]
      p.text = ''
      p.jzbOutput = ''
    }

    function removePayload(idx) {
      payloads.value.splice(idx, 1)
    }

    function addPayload() {
      payloads.value.push({
        id: Date.now() + Math.random(),
        text: '',
        jzbOutput: ''
      })
    }

    function copyOutput(idx) {
      navigator.clipboard.writeText(payloads.value[idx].jzbOutput)
    }

    function downloadJzb(idx) {
      const content = payloads.value[idx].jzbOutput
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `encoded_${idx + 1}.jzb`
      a.click()
      URL.revokeObjectURL(url)
    }

    function openInDecoder(idx) {
      const jzbOutput = payloads.value[idx].jzbOutput
      if (jzbOutput && !jzbOutput.startsWith('Error:')) {
        // Store the JZB output in localStorage for the decoder to pick up
        localStorage.setItem('jzbToDecode', jzbOutput)
        // Open decoder in new tab
        const url = router.resolve({ name: 'JzbDecoder' });
        window.open(url.href, '_blank')
      }
    }

    onMounted(() => {
      // Check if there's JSON data from the decoder
      const jsonFromDecoder = localStorage.getItem('jsonToEncode')
      if (jsonFromDecoder) {
        payloads.value = []
        // Add a new payload with the JSON data from decoder
        payloads.value.push({
          id: Date.now() + Math.random(),
          text: jsonFromDecoder,
          jzbOutput: ''
        })
        // Remove the data from localStorage
        localStorage.removeItem('jsonToEncode')
        // Encode the new payload
        encodePayload(payloads.value.length - 1)
      } else {
        // Default behavior - encode the example
        encodePayload(0)
      }
    })

    return {
      payloads,
      addPayload,
      encodePayload,
      clearPayload,
      removePayload,
      copyOutput,
      downloadJzb,
      openInDecoder
    }
  }
}
</script>

<style scoped lang="scss">
.jzb-encoder {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  background: #fafafa;
  min-height: 100vh;
  box-sizing: border-box;

  // Elements
  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 500;
    color: #333;
  }

  &__btn {
    font-size: 0.85rem;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;

    // Button modifiers
    &--add {
      font-size: 0.9rem;
      padding: 8px 16px;
      background: transparent;
      border: 1px solid #007acc;
      border-radius: 4px;
      color: #007acc;
      transition: background 0.2s;

      &:hover {
        background: rgba(0, 122, 204, 0.1);
      }
    }

    &--encode { 
      background: #007acc; 
      color: #fff; 
      
      &:hover { 
        opacity: 0.9; 
      }
    }

    &--clear { 
      background: #e0e0e0; 
      color: #555; 
      
      &:hover { 
        opacity: 0.9; 
      }
    }

    &--remove { 
      background: #f44336; 
      color: #fff; 
      
      &:hover { 
        opacity: 0.9; 
      }
    }

    &--copy { 
      background: #4caf50; 
      color: #fff; 
      
      &:hover { 
        opacity: 0.9; 
      }
    }

    &--decode { 
      background: #ff9800; 
      color: #fff; 
      
      &:hover { 
        opacity: 0.9; 
      }
    }

    &--download { 
      background: #2196f3; 
      color: #fff; 
      
      &:hover { 
        opacity: 0.9; 
      }
    }
  }

  &__payload-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    padding: 24px;
  }

  &__payload-section {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  &__section-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 400;
    color: #555;
  }

  &__actions {
    button {
      margin-left: 8px;
    }
  }

  &__input-area {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 12px;
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
    color: #333;
    resize: vertical;
    background: #fefefe;
  }

  &__output-area {
    flex: 1;
    background: #f7f7f7;
    border-radius: 4px;
    padding: 12px;
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
    color: #333;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.4;
    max-height: 60vh;
  }

  // Dark mode styles
  .dark & {
    background: #1a1a1a;

    &__title {
      color: #ffffff;
    }

    &__btn {
      &--add {
        border-color: #007acc;
        color: #007acc;

        &:hover {
          background: rgba(0, 122, 204, 0.2);
        }
      }

      &--clear {
        background: #404040;
        color: #e0e0e0;

        &:hover {
          background: #505050;
        }
      }
    }

    &__payload-card {
      background: #2d2d2d;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    &__section-title {
      color: #e0e0e0;
    }

    &__input-area {
      border-color: #404040;
      color: #e0e0e0;
      background: #1a1a1a;
    }

    &__output-area {
      background: #1a1a1a;
      color: #e0e0e0;
    }
  }
}
</style> 