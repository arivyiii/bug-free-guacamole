<template>
  <div class="jzb-encoder">
    <div class="controls">
      <h2 class="title">JZB Encoder</h2>
      <button @click="addPayload" class="btn add-btn">+ Add Payload</button>
    </div>

    <div
      v-for="(p, idx) in payloads"
      :key="p.id"
      class="payload-card"
    >
      <section class="payload-section">
        <header class="section-header">
          <h3 class="section-title">Input #{{ idx + 1 }}</h3>
          <div class="actions">
            <button @click="encodePayload(idx)" class="btn encode-btn">Encode</button>
            <button @click="clearPayload(idx)" class="btn clear-btn">Clear</button>
            <button @click="removePayload(idx)" class="btn remove-btn">Remove</button>
          </div>
        </header>
        <textarea
          v-model="p.text"
          placeholder="Paste JSON object here..."
          class="input-area"
        ></textarea>
      </section>

      <section class="payload-section">
        <header class="section-header">
          <h3 class="section-title">JZB Output #{{ idx + 1 }}</h3>
          <div class="actions">
            <button @click="copyOutput(idx)" class="btn copy-btn">Copy</button>
            <button @click="openInDecoder(idx)" class="btn decode-btn">Decode</button>
            <button @click="downloadJzb(idx)" class="btn download-btn">Download</button>
          </div>
        </header>
        <pre class="output-area">{{ p.jzbOutput }}</pre>
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
        window.open('/#/jzb-decoder', '_blank')
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

<style scoped>
.jzb-encoder {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  background: #fafafa;
  min-height: 100vh;
  box-sizing: border-box;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
}

.add-btn {
  font-size: 0.9rem;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #007acc;
  border-radius: 4px;
  color: #007acc;
  transition: background 0.2s;
}
.add-btn:hover {
  background: rgba(0, 122, 204, 0.1);
}

.payload-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  padding: 24px;
}

.payload-section {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 400;
  color: #555;
}

.actions button {
  margin-left: 8px;
}

.input-area {
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

.output-area {
  flex: 1;
  background: #f7f7f7;
  border-radius: 4px;
  padding: 12px;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  color: #333;
  overflow-y: auto;
  /* allow wrapping and break long lines */
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.4;
  /* optional max height to keep cards uniform */
  max-height: 60vh;
}

.btn {
  font-size: 0.85rem;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.encode-btn { background: #007acc; color: #fff; }
.clear-btn { background: #e0e0e0; color: #555; }
.remove-btn { background: #f44336; color: #fff; }
.copy-btn { background: #4caf50; color: #fff; }
.decode-btn { background: #ff9800; color: #fff; }
.download-btn { background: #2196f3; color: #fff; }

.encode-btn:hover { opacity: 0.9; }
.clear-btn:hover { opacity: 0.9; }
.remove-btn:hover { opacity: 0.9; }
.copy-btn:hover { opacity: 0.9; }
.download-btn:hover { opacity: 0.9; }
</style> 