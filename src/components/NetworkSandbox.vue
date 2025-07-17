<template>
  <div class="network-sandbox">
    <h1>Network Sandbox</h1>
    <p class="network-sandbox__description">
      Test different network requests, HTTP methods, headers, and response handling.
    </p>

    <!-- Request Configuration -->
    <div class="network-sandbox__section">
      <h2>Request Configuration</h2>
      
      <div class="network-sandbox__form">
        <div class="network-sandbox__form-group">
          <label for="url">URL:</label>
          <input 
            id="url" 
            v-model="requestConfig.url" 
            type="text" 
            placeholder="https://jsonplaceholder.typicode.com/posts"
            class="network-sandbox__input"
          />
        </div>

        <div class="network-sandbox__form-group">
          <label for="method">Method:</label>
          <select id="method" v-model="requestConfig.method" class="network-sandbox__select">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
            <option value="HEAD">HEAD</option>
            <option value="OPTIONS">OPTIONS</option>
          </select>
        </div>

        <div class="network-sandbox__form-group">
          <label for="timeout">Timeout (ms):</label>
          <input 
            id="timeout" 
            v-model.number="requestConfig.timeout" 
            type="number" 
            min="1000" 
            max="30000"
            class="network-sandbox__input"
          />
        </div>
      </div>
    </div>

    <!-- Headers -->
    <div class="network-sandbox__section">
      <h2>Headers</h2>
      <div class="network-sandbox__headers">
        <div 
          v-for="(header, index) in requestConfig.headers" 
          :key="index"
          class="network-sandbox__header-row"
        >
          <input 
            v-model="header.key" 
            placeholder="Header name" 
            class="network-sandbox__header-input"
          />
          <input 
            v-model="header.value" 
            placeholder="Header value" 
            class="network-sandbox__header-input"
          />
          <button 
            @click="removeHeader(index)" 
            class="network-sandbox__remove-btn"
            type="button"
          >
            ×
          </button>
        </div>
        <button 
          @click="addHeader" 
          class="network-sandbox__add-btn"
          type="button"
        >
          + Add Header
        </button>
      </div>
    </div>

    <!-- Request Body -->
    <div class="network-sandbox__section" v-if="showRequestBody">
      <h2>Request Body</h2>
      <div class="network-sandbox__form-group">
        <label for="contentType">Content-Type:</label>
        <select id="contentType" v-model="requestConfig.contentType" class="network-sandbox__select">
          <option value="application/json">application/json</option>
          <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>
          <option value="text/plain">text/plain</option>
          <option value="multipart/form-data">multipart/form-data</option>
        </select>
      </div>
      <div class="network-sandbox__form-group">
        <label for="body">Body:</label>
        <textarea 
          id="body" 
          v-model="requestConfig.body" 
          placeholder="Enter request body..."
          class="network-sandbox__textarea"
          rows="6"
        ></textarea>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="network-sandbox__section">
      <h2>Quick Actions</h2>
      <div class="network-sandbox__quick-actions">
        <button 
          @click="loadPreset('jsonplaceholder')" 
          class="network-sandbox__preset-btn"
          type="button"
        >
          JSONPlaceholder API
        </button>
        <button 
          @click="loadPreset('httpbin')" 
          class="network-sandbox__preset-btn"
          type="button"
        >
          HTTPBin API
        </button>
        <button 
          @click="loadPreset('mockapi')" 
          class="network-sandbox__preset-btn"
          type="button"
        >
          MockAPI
        </button>
        <button 
          @click="loadPreset('cors')" 
          class="network-sandbox__preset-btn"
          type="button"
        >
          CORS Test
        </button>
      </div>
    </div>

    <!-- Send Request -->
    <div class="network-sandbox__section">
      <button 
        @click="sendRequest" 
        :disabled="isLoading"
        class="network-sandbox__send-btn"
        type="button"
      >
        {{ isLoading ? 'Sending...' : 'Send Request' }}
      </button>
    </div>

    <!-- Response -->
    <div class="network-sandbox__section" v-if="response">
      <h2>Response</h2>
      
      <div class="network-sandbox__response-info">
        <div class="network-sandbox__response-item">
          <strong>Status:</strong> 
          <span :class="getStatusClass(response.status)">
            {{ response.status }} {{ response.statusText }}
          </span>
        </div>
        <div class="network-sandbox__response-item">
          <strong>Time:</strong> {{ response.time }}ms
        </div>
        <div class="network-sandbox__response-item">
          <strong>Size:</strong> {{ response.size }} bytes
        </div>
      </div>

      <div class="network-sandbox__response-tabs">
        <button 
          @click="activeTab = 'body'" 
          :class="{ active: activeTab === 'body' }"
          class="network-sandbox__tab-btn"
          type="button"
        >
          Body
        </button>
        <button 
          @click="activeTab = 'headers'" 
          :class="{ active: activeTab === 'headers' }"
          class="network-sandbox__tab-btn"
          type="button"
        >
          Headers
        </button>
        <button 
          @click="activeTab = 'console'" 
          :class="{ active: activeTab === 'console' }"
          class="network-sandbox__tab-btn"
          type="button"
        >
          Console
        </button>
      </div>

      <div class="network-sandbox__response-content">
        <div v-if="activeTab === 'body'" class="network-sandbox__response-body">
          <pre>{{ formatResponseBody(response.body) }}</pre>
        </div>
        <div v-if="activeTab === 'headers'" class="network-sandbox__response-headers">
          <pre>{{ formatHeaders(response.headers) }}</pre>
        </div>
        <div v-if="activeTab === 'console'" class="network-sandbox__response-console">
          <div class="network-sandbox__console-actions">
            <button 
              @click="logToConsole('response', response)" 
              class="network-sandbox__console-btn"
              type="button"
            >
              Log Response
            </button>
            <button 
              @click="logToConsole('headers', response.headers)" 
              class="network-sandbox__console-btn"
              type="button"
            >
              Log Headers
            </button>
            <button 
              @click="logToConsole('body', response.body)" 
              class="network-sandbox__console-btn"
              type="button"
            >
              Log Body
            </button>
            <button 
              @click="logToConsole('timing', { time: response.time, size: response.size })" 
              class="network-sandbox__console-btn"
              type="button"
            >
              Log Timing
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Display -->
    <div class="network-sandbox__section" v-if="error">
      <h2>Error</h2>
      <div class="network-sandbox__error">
        <strong>{{ error.name }}:</strong> {{ error.message }}
        <pre v-if="error.stack" class="network-sandbox__error-stack">{{ error.stack }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const requestConfig = ref({
  url: 'https://jsonplaceholder.typicode.com/posts',
  method: 'GET',
  timeout: 10000,
  headers: [
    { key: 'Content-Type', value: 'application/json' }
  ],
  contentType: 'application/json',
  body: ''
})

const response = ref(null)
const error = ref(null)
const isLoading = ref(false)
const activeTab = ref('body')

const showRequestBody = computed(() => {
  return ['POST', 'PUT', 'PATCH'].includes(requestConfig.value.method)
})

const presets = {
  jsonplaceholder: {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    headers: [
      { key: 'Content-Type', value: 'application/json' }
    ],
    body: ''
  },
  httpbin: {
    url: 'https://httpbin.org/json',
    method: 'GET',
    headers: [
      { key: 'Accept', value: 'application/json' }
    ],
    body: ''
  },
  mockapi: {
    url: 'https://mockapi.io/projects/your-project-id/resources',
    method: 'GET',
    headers: [
      { key: 'Content-Type', value: 'application/json' }
    ],
    body: ''
  },
  cors: {
    url: 'https://httpbin.org/cors',
    method: 'GET',
    headers: [
      { key: 'Origin', value: window.location.origin }
    ],
    body: ''
  }
}

const addHeader = () => {
  requestConfig.value.headers.push({ key: '', value: '' })
}

const removeHeader = (index) => {
  requestConfig.value.headers.splice(index, 1)
}

const loadPreset = (presetName) => {
  const preset = presets[presetName]
  if (preset) {
    requestConfig.value = { ...requestConfig.value, ...preset }
  }
}

const getStatusClass = (status) => {
  if (status >= 200 && status < 300) return 'status-success'
  if (status >= 300 && status < 400) return 'status-redirect'
  if (status >= 400 && status < 500) return 'status-client-error'
  if (status >= 500) return 'status-server-error'
  return 'status-unknown'
}

const formatResponseBody = (body) => {
  try {
    if (typeof body === 'string') {
      const parsed = JSON.parse(body)
      return JSON.stringify(parsed, null, 2)
    }
    return JSON.stringify(body, null, 2)
  } catch {
    return body
  }
}

const formatHeaders = (headers) => {
  return Object.entries(headers)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
}

const logToConsole = (type, data) => {
  switch (type) {
    case 'response':
      console.log('🌐 Network Response:', data)
      break
    case 'headers':
      console.log('📋 Response Headers:', data)
      break
    case 'body':
      console.log('📄 Response Body:', data)
      break
    case 'timing':
      console.log('⏱️ Response Timing:', data)
      break
  }
}

const sendRequest = async () => {
  isLoading.value = true
  error.value = null
  response.value = null

  try {
    const startTime = Date.now()
    
    // Prepare headers
    const headers = {}
    requestConfig.value.headers.forEach(header => {
      if (header.key && header.value) {
        headers[header.key] = header.value
      }
    })

    // Prepare body
    let body = null
    if (showRequestBody.value && requestConfig.value.body) {
      if (requestConfig.value.contentType === 'application/json') {
        try {
          body = JSON.stringify(JSON.parse(requestConfig.value.body))
        } catch {
          body = requestConfig.value.body
        }
      } else {
        body = requestConfig.value.body
      }
    }

    // Create controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), requestConfig.value.timeout)

    const fetchResponse = await fetch(requestConfig.value.url, {
      method: requestConfig.value.method,
      headers,
      body,
      signal: controller.signal
    })

    clearTimeout(timeoutId)
    const endTime = Date.now()

    // Get response body
    let responseBody
    const contentType = fetchResponse.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      responseBody = await fetchResponse.json()
    } else {
      responseBody = await fetchResponse.text()
    }

    // Calculate response size
    const responseSize = new Blob([JSON.stringify(responseBody)]).size

    response.value = {
      status: fetchResponse.status,
      statusText: fetchResponse.statusText,
      headers: Object.fromEntries(fetchResponse.headers.entries()),
      body: responseBody,
      time: endTime - startTime,
      size: responseSize
    }

    // Log to console
    console.log('🌐 Network Request:', {
      url: requestConfig.value.url,
      method: requestConfig.value.method,
      headers: headers,
      body: body
    })
    console.log('📡 Network Response:', response.value)

  } catch (err) {
    error.value = err
    console.error('❌ Network Error:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  console.log('🔧 Network Sandbox loaded')
})
</script>

<style lang="scss" scoped>
.network-sandbox {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  &__description {
    color: #666;
    margin-bottom: 30px;
    font-size: 16px;
  }

  &__section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
      margin-bottom: 15px;
      color: #333;
      font-size: 18px;
    }
  }

  &__form {
    display: grid;
    grid-template-columns: 1fr 200px 150px;
    gap: 15px;
    align-items: end;
  }

  &__form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
      font-weight: 500;
      color: #555;
    }
  }

  &__input,
  &__select,
  &__textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #4CAF50;
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 100px;
  }

  &__headers {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__header-row {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 10px;
    align-items: center;
  }

  &__header-input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  &__remove-btn {
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #cc0000;
    }
  }

  &__add-btn {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    align-self: flex-start;

    &:hover {
      background: #45a049;
    }
  }

  &__quick-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  &__preset-btn {
    background: #2196F3;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background: #1976D2;
    }
  }

  &__send-btn {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;

    &:hover:not(:disabled) {
      background: #45a049;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }

  &__response-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }

  &__response-item {
    background: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    font-size: 14px;
  }

  &__response-tabs {
    display: flex;
    gap: 5px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
  }

  &__tab-btn {
    background: none;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    font-size: 14px;

    &:hover {
      background: #f5f5f5;
    }

    &.active {
      border-bottom-color: #4CAF50;
      color: #4CAF50;
    }
  }

  &__response-content {
    background: #f9f9f9;
    border-radius: 4px;
    padding: 15px;
    min-height: 200px;
  }

  &__response-body,
  &__response-headers {
    pre {
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.4;
    }
  }

  &__console-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  &__console-btn {
    background: #FF9800;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;

    &:hover {
      background: #F57C00;
    }
  }

  &__error {
    background: #ffebee;
    border: 1px solid #ffcdd2;
    border-radius: 4px;
    padding: 15px;
    color: #c62828;
  }

  &__error-stack {
    margin-top: 10px;
    background: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    white-space: pre-wrap;
    overflow-x: auto;
  }

  // Status classes
  .status-success {
    color: #4CAF50;
  }

  .status-redirect {
    color: #FF9800;
  }

  .status-client-error {
    color: #F44336;
  }

  .status-server-error {
    color: #9C27B0;
  }

  .status-unknown {
    color: #666;
  }

  // Responsive design
  @media (max-width: 768px) {
    &__form {
      grid-template-columns: 1fr;
    }

    &__header-row {
      grid-template-columns: 1fr;
    }

    &__quick-actions {
      flex-direction: column;
    }

    &__console-actions {
      flex-direction: column;
    }
  }
}

// Dark mode support
.dark .network-sandbox {
  &__section {
    background: #2d2d2d;
    color: #e0e0e0;

    h2 {
      color: #e0e0e0;
    }
  }

  &__input,
  &__select,
  &__textarea {
    background: #1a1a1a;
    color: #e0e0e0;
    border-color: #444;
  }

  &__response-item {
    background: #1a1a1a;
    color: #e0e0e0;
  }

  &__response-content {
    background: #1a1a1a;
  }

  &__tab-btn {
    color: #e0e0e0;

    &:hover {
      background: #1a1a1a;
    }
  }

  &__error {
    background: #3e2723;
    border-color: #5d4037;
    color: #ef9a9a;
  }
}
</style> 