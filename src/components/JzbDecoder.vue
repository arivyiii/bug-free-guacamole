<template>
    <div class="jzb-decoder">
      <!-- Global Controls -->
      <div class="controls">
        <h2>JZB Decoder</h2>
        <button @click="addPayload" class="btn btn-primary">Add Payload</button>
      </div>
  
      <!-- Payload Cards -->
      <div
        v-for="(p, idx) in payloads"
        :key="p.id"
        class="payload-card"
      >
        <!-- Input Side -->
        <div class="payload-input">
          <div class="card-header">
            <h3>Payload #{{ idx + 1 }}</h3>
            <div class="button-group">
              <button @click="decodePayload(idx)" class="btn btn-primary">Decode</button>
              <button @click="clearPayload(idx)" class="btn btn-secondary">Clear</button>
              <button @click="removePayload(idx)" class="btn btn-danger">Remove</button>
            </div>
          </div>
          <textarea
            v-model="p.text"
            placeholder="Paste JZB string here..."
            class="input-area"
          ></textarea>
        </div>
  
        <!-- Output Side -->
        <div class="payload-output">
          <div class="card-header">
            <h3>Output #{{ idx + 1 }}</h3>
            <div class="button-group">
              <button @click="copyOutput(idx)" class="btn btn-success">Copy</button>
              <button @click="downloadJson(idx)" class="btn btn-info">Download</button>
            </div>
          </div>
          <pre class="json-raw">{{ p.humanReadable }}</pre>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import pako from 'pako'
  import base64js from 'base64-js'
  
  export default {
    name: 'JzbDecoder',
    setup() {
      const example = 'eJyrVkrLz1eyUkpKLFKqBQA1IwYH'
      const payloads = ref([
        { id: Date.now(), text: example, humanReadable: '' }
      ])
  
      function normalizeBase64(str) {
        let b64 = str.replace(/-/g, '+').replace(/_/g, '/')
        b64 += '='.repeat((4 - (b64.length % 4)) % 4)
        return b64
      }
  
      function decodeJzb(str) {
        if (!str) return ''
        try {
          const b64 = normalizeBase64(str)
          const bytes = base64js.toByteArray(b64)
          let jsonStr
          try {
            jsonStr = pako.inflate(bytes, { to: 'string' })
          } catch {
            const raw = pako.inflateRaw(bytes)
            jsonStr = new TextDecoder().decode(raw)
          }
          return jsonStr
        } catch (e) {
          return `Error: ${e.message}`
        }
      }
  
      function decodePayload(idx) {
        const p = payloads.value[idx]
        const jsonStr = decodeJzb(p.text)
        try {
          const obj = JSON.parse(jsonStr)
          p.humanReadable = JSON.stringify(obj, null, 2)
        } catch {
          p.humanReadable = jsonStr
        }
      }
  
      function clearPayload(idx) {
        const p = payloads.value[idx]
        p.text = ''
        p.humanReadable = ''
      }
  
      function removePayload(idx) {
        payloads.value.splice(idx, 1)
      }
  
      function addPayload() {
        payloads.value.push({
          id: Date.now() + Math.random(),
          text: '',
          humanReadable: ''
        })
      }
  
      function copyOutput(idx) {
        const p = payloads.value[idx]
        navigator.clipboard.writeText(p.humanReadable)
      }
  
      function downloadJson(idx) {
        const p = payloads.value[idx]
        const blob = new Blob([p.humanReadable], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `decoded_${idx + 1}.json`
        a.click()
        URL.revokeObjectURL(url)
      }
  
      return {
        payloads,
        addPayload,
        decodePayload,
        clearPayload,
        removePayload,
        copyOutput,
        downloadJson
      }
    }
  }
  </script>
  
  <style scoped>
  .jzb-decoder {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 16px;
    box-sizing: border-box;
    height: 100vh;
    overflow-y: auto;
  }
  
  .controls {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .payload-card {
    display: flex;
    gap: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 16px;
  }
  
  .payload-input,
  .payload-output {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .input-area {
    flex: 1;
    width: 100%;
    padding: 8px;
    font-family: monospace;
    font-size: 14px;
    resize: vertical;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .json-raw {
    flex: 1;
    background: #fbfbfb;
    padding: 12px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 13px;
    white-space: pre-wrap;
    word-break: break-word;
    overflow: auto;
  }
  
  .button-group {
    display: flex;
    gap: 8px;
  }
  
  .btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .btn-primary { background: #007acc; color: white; }
  .btn-secondary { background: #ccc; color: #333; }
  .btn-success { background: #28a745; color: white; }
  .btn-info { background: #17a2b8; color: white; }
  .btn-danger { background: #dc3545; color: white; }
  </style>
  