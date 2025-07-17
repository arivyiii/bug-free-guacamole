<template>
    <div class="jzb-decoder">
      <div class="controls">
        <h2 class="title">JZB Decoder</h2>
        <button @click="addPayload" class="btn add-btn">+ Add Payload</button>
      </div>
  
      <div
        v-for="(p, idx) in payloads"
        :key="p.id"
        class="payload-card"
      >
        <section class="payload-section">
          <header class="section-header">
            <h3 class="section-title">Payload #{{ idx + 1 }}</h3>
            <div class="actions">
              <button @click="decodePayload(idx)" class="btn decode-btn">Decode</button>
              <button @click="clearPayload(idx)" class="btn clear-btn">Clear</button>
              <button @click="removePayload(idx)" class="btn remove-btn">Remove</button>
            </div>
          </header>
          <textarea
            v-model="p.text"
            placeholder="Paste JZB string here..."
            class="input-area"
          ></textarea>
        </section>
  
        <section class="payload-section">
        <header class="section-header">
          <h3 class="section-title">Output #{{ idx + 1 }}</h3>
          <div class="actions">
            <button @click="copyOutput(idx)" class="btn copy-btn">Copy</button>
            <button @click="openInEncoder(idx)" class="btn encode-btn">Encode</button>
            <button @click="downloadJson(idx)" class="btn download-btn">Download</button>
          </div>
        </header>
          <pre class="output-area">{{ p.humanReadable }}</pre>
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
    name: 'JzbDecoder',
    setup() {
      const router = useRouter()
      
      const example = 'eJzVVscO60h2_Ze3bvZjDr1jDKIYxCjRMAoUUxBzDMb8e1OvZ7wwbAP2YoBZqXjq1q1Tp26dq3_7jx9rOZVzN6rJjz9-AEs0BBO4QH7YnuWL9Ht8__jtRxTH3dLOv0L0g_3r68Lno08vKEnXusuv72l5u39BcddOXZ1e2DV57_J7uqb1hZdt1v0nyP9K8weN__bjPXbblI5gLptrOUIRCE4hMIkxJPmPaCs66i76UkhvZ90gyNqcm5dbtIY3w-rr7CvHZcppaMQNBuzdzBiMODbr6Yz4yjdbGwawxiQZp_BCWEkbHu-CKw5a0dOdyRtMwIgqIZJqRmtsadM7Bp-zZgCmDvHQnZ-JkqVkIEMMuaVyZcDPChr21lQEynpWvYm5dwzTdeYdwJHdTOcC27mbNCEUaOOjkmQkEUUqshG4JEc_XHaE4RQQ1hqSNGm30zKpBCJy_1gV5rTjOStJSoB0Y96GKFMJGifs-UaPNzMtdl1aDVzNw56FQYw2VT3a5RDN04fz749ZrP2Ui0x1cIxBmx306fuDSloCQ9_j-bW3p_6hAITo1cSIC9y8xwVD-jv_GO2beoB2R23tjvJJ1w71rHcQXDhxXGvsLiRCo-GkcTAG-TLaPqjC3idddAY3dA8Lsq19iBTIcKeOGWRPbGcyZiWJFSEgGrwHBjxT1_c1jJ6IZzbQUj0aptIBZ1tXlKB7JlmifqzJOzEe3CVttvbZLMxNf9RZ3mk9QIsID0ZKfFVEqZum1ePuRln-5xS6JLFMh-ClJnc1HkUPobFuyg3quU0C7ad1EGSMkLmmCGAJ9oFlOyXTaTCK56eTnevONSpOGMxN5sg_kLjT6lHKPZVRp9Hse1jZ4kxro1Zz5nzFXNqd5I68IUfj33b-40sUYm_6hywGs0z61iWx0WHd0H2YhMdzbce7wzceaxKFbD3JndxKbzhbbl-SC7tVE65Fqpcz2b9umuYd-ZAO6eKQ91JSBw0baqpLVa_sxmR4bVL9lNcH6e9W6N1yBp1MVv7mhN3uqQ9CKXXDtVEvhwfO2bC7GmTmML_m8-lgaJcbjDIhWldeA85jRNx1m4CR8EPDmtoMcyzrEg2_IZSohd4uFrm_JqZ4Wp5XqWMaeWFzPuSLK9E_ghDiP6FEVXY1ikVnqkHVtdlQT8d3XHZtPAyvncKjC7ZDD4y6YdPPxeDf58pusfRGXH2l34V2iXaM6lME3Fc_pxxP7_xqEEv9qT3Z6CJMj7fxemZeIlJuXE7m63u2RbJ6m2A_5M1SoCj26ma1vzoi_TaVekp_NYevKyKfqRcw2aawQ99bl_Es49eFinnupz9-_ozGcj3Ksvw9L-dief9edj_fSw5lY5pC-RLFUXN52M8ff_vtn-ySWzS2_9Ulcfh_cUnqf3JJD9PQk30UA1OuclfM1ZNUCLrAHgHJS7U692ejUpLQK0RSGxsT5V_-ZCLHjaD0ZeYTY0VhodmCdV5FKCOTwaQisAXGmqAgn1ty7dMzME5HqeF5d85FjkED45aueWQf9gEwUPeJxdlAnPF2EFBqtYhyEl7cMRWtb2cwAxda6CSS4gdGAP_ImNlAZbJV58dBFk8tLODXktZoSYlcZpNpUfVoqrX-UAbcu-8akQEWCgCdV2aoVk0EwGWhfXGcRdKAsSmVmeOWWRAYTNQKWdfk3GmSh3cPxIfrTZ7PJ8VHQXT5eeOHxPb4q49I02yx_SAEoueLcTeoRB7PXt9IO4LWH89XJ3fj8Dbn2iZaiFuHFvmICsvAUMIqqpscOsfOdo3PtLzDFk19J4Yi4KW8Hmr1MQwPsmX9iteKOyvqlLlzllFGYisQfEc0d0K7S3JUvRwbQl6DzH6KVxqNftW9hGgTXdYPnFU4GfYq_C3T_2UqOh3Hbvy_lTT935b0jInSeJW0xwF-Fdtb1IWv2aHUSd_CCkV9eBL1tYNmbmr8Z4PqykHj0T4SFOLfAq43TCsj1vIpwK6lCQz5aAnoja2j2Q5Yg09lTFH9wjzDkEB9Gqowan_sFcUIVUBp5HxVskJScEoZ9DgWWYK2nGHCDKSU8E6fIbLs65zA9ImlVIpp2Ai7CYG1L9dMhr45TaaaO7Bu5PlRXhAhK2YUY8xQZ0-iwtY0Sd_abDb383b1Qmuv-kFnoncHIWrUXS2RUdpjOxMPHrUCX-4UowQhRTOfVs0wHCsYqx6BWMMr1dro2Svc-EzfakCZpxt-QHCbjeYgkVeyMVSLYgMOJYjRUpRpFS2TFhPM7A1Xq5szK7hBy3R5O68GDb89UDrhujFwNjM-SgGCoInBHpCuk8s7aGpi9qcu8uury6vdAjRytIoTw5PJq_WZ52NShFr9pgBhz3aovJ4XvYmZZx8fKdM5BWHjVQMlW5G5lWcbr2yf7DPpSqbbDKKOPIedYiY9JLK2cMfKu48PchWSBen8ex4632j2O4CcLU9oW0HUcu0Eq7iizM6CxArHuTtFAvZKKBYrzV1bpAZg1Yy3aY3ArSsfWfXFyUigVCGUraESXKkTuztpRcHErMxHr_-up6VH9mt9XN-e5wU4ijbyUPGCXhXZdZKqW5BakbywTn9xoh1yzy7exSMVcM1aVEi7keCK9wRizwr8-sUp6P68Di2WMcB5q2DBtdfFTJJL6_vHw6Z1CLWuAJ4DAGIr4mGVGX7_6jOx91EC34PyxYoBijWI7jb-_x3h3_8EA1AJcw'
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
          const bytes = base64js.toByteArray(normalizeBase64(str))
          let jsonStr
          try {
            jsonStr = pako.inflate(bytes, { to: 'string' })
          } catch {
            jsonStr = new TextDecoder().decode(pako.inflateRaw(bytes))
          }
          return jsonStr
        } catch (e) {
          return `Error: ${e.message}`
        }
      }
  
      function decodePayload(idx) {
        const p = payloads.value[idx]
        const result = decodeJzb(p.text)
        try {
          p.humanReadable = JSON.stringify(JSON.parse(result), null, 2)
        } catch {
          p.humanReadable = result
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
        navigator.clipboard.writeText(payloads.value[idx].humanReadable)
      }
  
      function downloadJson(idx) {
        const content = payloads.value[idx].humanReadable
        const blob = new Blob([content], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `decoded_${idx + 1}.json`
        a.click()
        URL.revokeObjectURL(url)
      }

      function openInEncoder(idx) {
        const jsonOutput = payloads.value[idx].humanReadable
        if (jsonOutput && !jsonOutput.startsWith('Error:')) {
          try {
            // Parse to ensure it's valid JSON
            JSON.parse(jsonOutput)
            localStorage.setItem('jsonToEncode', jsonOutput)

            const url = router.resolve({ name: 'JzbEncoder' })
            window.open(url.href, '_blank')
          } catch (e) {
            console.error('Invalid JSON, cannot encode:', e)
          }
        }
      }

      onMounted(() => {
        // Check if there's JZB data from the encoder
        const jzbFromEncoder = localStorage.getItem('jzbToDecode')
        if (jzbFromEncoder) {
          payloads.value = []
          // Add a new payload with the JZB data from encoder
          payloads.value.push({
            id: Date.now() + Math.random(),
            text: jzbFromEncoder,
            humanReadable: ''
          })
          // Remove the data from localStorage
          localStorage.removeItem('jzbToDecode')
          // Decode the new payload
          decodePayload(payloads.value.length - 1)
        } else {
          // Default behavior - decode the example
          decodePayload(0)
        }
      })
  
              return {
          payloads,
          addPayload,
          decodePayload,
          clearPayload,
          removePayload,
          copyOutput,
          downloadJson,
          openInEncoder
        }
    }
  }
  </script>
  
  <style scoped>
  .jzb-decoder {
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
  
  .decode-btn { background: #007acc; color: #fff; }
  .clear-btn { background: #e0e0e0; color: #555; }
  .remove-btn { background: #f44336; color: #fff; }
  .copy-btn { background: #4caf50; color: #fff; }
  .encode-btn { background: #ff9800; color: #fff; }
  .download-btn { background: #2196f3; color: #fff; }
  
  .decode-btn:hover { opacity: 0.9; }
.clear-btn:hover { opacity: 0.9; }
.remove-btn:hover { opacity: 0.9; }
.copy-btn:hover { opacity: 0.9; }
.download-btn:hover { opacity: 0.9; }

/* Dark mode styles */
.dark .jzb-decoder {
  background: #1a1a1a;
}

.dark .title {
  color: #ffffff;
}

.dark .add-btn {
  border-color: #007acc;
  color: #007acc;
}

.dark .add-btn:hover {
  background: rgba(0, 122, 204, 0.2);
}

.dark .payload-card {
  background: #2d2d2d;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.dark .section-title {
  color: #e0e0e0;
}

.dark .input-area {
  border-color: #404040;
  color: #e0e0e0;
  background: #1a1a1a;
}

.dark .output-area {
  background: #1a1a1a;
  color: #e0e0e0;
}

.dark .clear-btn {
  background: #404040;
  color: #e0e0e0;
}

.dark .clear-btn:hover {
  background: #505050;
}
</style>
  