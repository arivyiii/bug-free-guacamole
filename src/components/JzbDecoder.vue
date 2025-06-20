<template>
  <div class="jzb-decoder">
    <h2>JZB Decoder</h2>
    <div class="input-section">
      <label for="jzbInput">JZB String:</label>
      <input 
        id="jzbInput" 
        v-model="jzbString" 
        @input="onInputHandler"
        placeholder="Enter JZB string here..."
        class="jzb-input"
      />
    </div>
    
    <div class="options-section">
      <label class="checkbox-label">
        <input 
          type="checkbox" 
          v-model="autoDecodeNested" 
          @change="onInputHandler"
        />
        Auto-decode nested JZB strings
      </label>
      <label class="checkbox-label">
        <input 
          type="checkbox" 
          v-model="showInteractive" 
          @change="onInputHandler"
        />
        Show interactive JSON view
      </label>
    </div>

    <div class="custom-properties-section">
      <label for="customProperties">Custom properties that might be encoded (comma-separated):</label>
      <input 
        id="customProperties" 
        v-model="customProperties" 
        @input="onInputHandler"
        placeholder="e.g., data, payload, content, config"
        class="custom-properties-input"
      />
    </div>

    <div class="output-section">
      <h3>Decoded Output:</h3>
      <div v-if="showInteractive && parsedData" class="interactive-json">
        <vue-json-pretty
          :data="parsedData"
          :deep="3"
          :show-double-quotes="true"
          :show-length="true"
          :show-line="true"
          :selectable="true"
          :select-on-click-node="true"
          :highlight-selected-node="true"
          :highlight-mouseover-node="true"
          :show-icon="true"
          :path-selectable="true"
          :path-default-expanded="pathDefaultExpanded"
          :path-default-expanded-all="false"
          :highlight-mouseover-path="true"
          :highlight-selected-path="true"
          :show-select-controller="true"
          :show-copy-button="true"
          :show-length-controller="true"
          :show-line-controller="true"
          :show-icon-controller="true"
          :show-double-quotes-controller="true"
          :show-select-controller-button="true"
          :show-copy-button-controller="true"
          :show-length-controller-button="true"
          :show-line-controller-button="true"
          :show-icon-controller-button="true"
          :show-double-quotes-controller-button="true"
          :theme="'light'"
          :custom-value-formatter="customValueFormatter"
          @click="onNodeClick"
          @mouseover="onNodeMouseover"
          @mouseout="onNodeMouseout"
          @select="onNodeSelect"
          @copy="onNodeCopy"
        />
      </div>
      <pre v-else id="humanReadable" class="human-readable">{{ humanReadable }}</pre>
    </div>
  </div>
</template>

<script>
import pako from "pako";
import base64js from "base64-js";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
  name: 'JzbDecoder',
  components: {
    VueJsonPretty
  },
  data() {
    return {
      jzbString: `eJzVuccO7MC6Fvoua7x9djuGPXPOOQWELOfYzqmNePfjxQEmwIQrXYlBTaqru11_-oL_03_5c7Zbu09r0hZ__vUnMTmdNRI3ESzbM32OyNbszz_-pHk-HeP-386MxzD848_-m8v3fFGew1S_J7Yjc_9jK5_GbRrKd-_9UJ1qtTzL4d2_0nX8n5vM35_78y_wH3-ydbq2ck329vt-G8QREkNx6ANBOPQ_Dpvpb5jSv49Xyjff9bxxPZRlp2RbWp7TNWYHKrDpiakf8HbRGeCtcOu2sIZHl-qhpy0DF2VmfpIEYDw3PAsQOjQ_BsZBBn9Kpa4sj05p-YWl9tKc9grkSFOS6-AYzt8GsJfBu8W9DlU5zuuIksNbJAJROSVBV_GzLXWWWijrEsIcdY95HfIb17qJrluzjNcM4fIakliEzKcg1uNIlGTHjL-iAsySZKxOlMphgQW0LgHc5_vpL1xVitXAn7LRMuR6YCzPjKbRa-qN3rH-DWWz7_P2r3_-M13b89e27b_V7d4c2b-10z-zowaqtSyB-kjz9Psm4p9__us__v_Lcrmu0_r_Pc2_vffAFXnT3JyAQqRf2jnlENkc79rjj3t9vZ7fIJroUyOYh1_Y9RmnzhVCQKwF4s8HfohjRulvhgvehqg8hDeUER3S3Aj6ZZkg7vJZ1JQJFPoFJ3y4vJBMKaiaJavd3DIm6MGo20K8aJ1-sIhxampbJI7DxyYIRz-7YIRZHdwcJig67Se3P6prbHF5oOAFOg2zjFwnMg03KNLhMLxLhfLgtd6vn-7QdjdiBoAIDYLUT4cP0VfAkyII0qdggvzi0VyogITMo2OdYNcDAIYnjE01V4Bs6kPNNIhe-HGZpSEhMj8rAC-F242FabLAJGCkKyrFG297ULFO6GZix-BC6lWZeTcmSIwHu9b-iKNOyvO0CWitWAwNfUb8wmtJhuLFR2e8az9HZY5nJT-xg5dI__9E6bVjNf0vlff5P5QeSBLYh_jfld6zh_5-KsRwJ-3BjI1cG-WKNx4Z30jWXKpQfDWUJZsr9wxbQlqUZ1obRFT_Ts4dAD2jiP3E6DVzNqlackwKG5VxWRccw3aVFxMUPaArSWARB7QKyvEDGAvs0OskgwDAEBN8TBquSiqWjPANrdQn3tFzSE8d2UjcGJ4cqUQDKYvuyAYUxtBjvAB-MHEI_wJkMMJkufqZjgDrRYprtaoxTGKA2SNFAX2QMgRKFah0CC5Q0qzITQeBz6HJ7UGOXQvEAIDPMXxeFwxoaXeTZ3KE-y6dwzyONJiVLhBwJHyTFXI_enTuhP6rfviZikAggIe4Wyy0orlAfIlkE_VBhPERa4fzBqQmOaDcYDezShf8vAAgE5PYztQlzhPgOHkFKgP0mYHSC-DfcO5GWAplClRsUU9CS6UKVYZgpRYNIaRFTeke_OBbKmEfviOZWHsAsDnnq0J3I6tgDEmyJ10vPIOjKlMKbBvGDsjNc1bxBP9ASZIII4RVVUIWZAIQZ5JoeIEDyN-0wEgYkTDEcuK-X756oqRaJtXakfWWjC86CJhI__rt7Zcerk7thg8zg08YNUVAbWGnR07I_Lod01xAn-z4Sabr9s6uQTD09PpVzxDnCt_zMcBMhsbgWFK6KoseA7gFHQxcuYbkJL3p50CGKgnXkUqDn08g1vcZjw15s2Nio_3p7IJUqUy4ZZOYsHbE4bNpACZYjC6zuGcGRDBnjiGP1GR8_Ion3TyiU1WySrSzI79JECxphuKZkACVSXbHU3NCsn9z9sRLYR1KSst46KmQElLGKmCd-Lo0gCfu0_d-2GB1cQVVhNHg5d9AV4UpmUXOMgecYrBKgvi2ACeQZN4kas3gxNmpb8Cqx31ZiXp84jlUsgnEons2YvhtbxhZ6cRuIVWCtGaCwaRxvQEUaOQi8_NI0qbxBLEsVyMfm6XDivgZ86QJNAgizCXKQkoVKIgo_IYk1-9H4JyJ0uyDMLQPzCUUF20jmEcDRuQcJ6rsDBKzcsAHUPnjFh0hCxPAXjShDacozJQrdLlaQOZJLVbwSRlx_oRr4jQbhtjDOOxD4SMka6kEkXdq2PlihITTugOmBKmhtUWfS_juwNBmbRYNqjETEwif83GgwMehUCkP4jvqdzA8OgSBtCtsSH_8UD0EP7UjeGWNS1aHe2HXGYoSAOXGCdFmwysDRk-mWLo4f4W8e6vnkhINkDnbBBHo14ka-81ko00mQEh-HxymGAftOrOPh7u9l1LRyfQ6ot_cuVygCamWqbP9wCO3r5nmC7a-3bvtlUb72KNG1h3vdAkVShsqdYSTi6mI967ZuKXx0ecIzaIr1Gmps2MmFkrbFMgrSyF_aL6tflO_uOTg-e6E8dSUNhqkNDzUSTtACqWG1qZXaU_7NW9tRnsx6EWpiz5nOi8FhENXOF0PWtoKPuCOHJSRYDkl7Yiuh_8RX7mZ505nhcAZPrnLF4fo9u8d5w9oysI2FFnl69aNPMjXYGV6VVeDthgt7s6-K0C0bwMlrfGFinQGb9MPYcf4d8cDVhcgIvICJOdItr3q7-pEZK5_vvmTtbHSVF5tfzv4mt2bOmrJi_RLAi3Yn1v2JSK4D579YF37iCyi00tpHmveIAJ1Tw2P5lHXOJYXG8mK3eR5MC6K1d9cGH3rM3aPmiMW9z6N2K21OLo8ww1Sp7my63ni1W68yYUkabCwXII-0-d2jXD-DRzXQQLXv4SyuKBtvtwnlAbM4GTNMGLVXYJU2Q_EK35-qe03LQF0w4UfFi0Gtu2Y8kWWMNKQHqRaK4dY7fpu-eLAY4trnBWYkuURNREtckopja9ouL6BS0OrzBiFlB7rQhztC4Z7-aej32JvzsgoP_VF5FQMOOJQ0sgnwgzTOgejEQCWgOan5yRVFCTZEqdSzCCBilLb-xUG4jKj9HS_WKl0a04VzNsampZIu9HT38ePF-T2vCPzBufZrNrawAi9CbmM0lResKVne4gTOUjj2VMFb3dsc65mIFmIw-DnPTW-GdfP5ibyG2HOJIctBSLOR7Z6Bmfa5r4ze3T31Va7M-C-qWo5vqa7TLg8YNbYDdcxAhFFzO1qkv3-ReVjG2y8qMRReuPvHqLncaVsqM42A8fSX8_K73cCNrN8d9e4JgHp6DLzi0RYbDQS7ShPGIx8oepooevCMvjLYEIKnh-epB29oBYn9FWHjL2XH5Zr3tzXcByEADm0fM-dE3LD2544tAqtyjgIazeaPSJ7FtDWf9xLYOrp6L4xVaDXLSV7p1jazSmfnZD8WrbcX1fS2GqElpW71uUIEIpAoveW5qGqEwbi04vdrS3IMxSlOvF9VK3IcwOpIwOmDIJwehupJSH8IjPthQNMPQoFNUjJaIWYqY_hT9ZmT1ZPAapYpKVlt0IqB3pchJfBcYNFdUUYvk-HbDF1vTPNnwVJuWBx_DYOyczW4U9KZo21BOfMsEg_J56u-u8y7I7mnY02vJTJwVinJxZADotyhb7Wtfi69-Xola9lKIKlKcrN_7hJkQC-0yBeLQV5stlRG0Y6OiY4jKB0_fFcs9ocyxDoLDNhGPCVwzR7fn9XCJKiSQMdwcJbIh9vDR1o9n6XNWgxkl7wpz_4SDR4g9vElxKJsqYYlt0MZsx3rDzULFVa7Lc05PqhHaJrSyWrZUTq2qD_aRoDVmH5dvn2dylaqOhOqlyHJzATFknS3mqQp35a5u7IKvDr64hr6uRzNuI-h6jUuGZl6uTshAko06xavHlhX_75Bpr6LS3I5BS1H0dKNusqqvwixhhufLgo6M-W7vfyi3K5TdSR_WnnXiwtlPugKQidFKw032sb2DG1BM-ZJ-XZvKXPDezN_dP2OS_GMs5jk0qSX21aKecOGFhhHL1p07HZ7VHdJkHdKIEWLffmOq3TESNOZQmNmP0aUA27wi9bBkYgbfl819N8U1OhXrFYzmq7IETKhaCt5ukSIybFMiV7A8tIcyKtHdJ215dl2KinpDNHfH4NL6wHZR21ek4-ZL-PDpbCewObvnmaNgDr7GVdIOkuvBFloegQ6SgxeGvxnTdLIIO2LTsP71AczyMdJ8GF-Akcri8PWaKlH8N7y7ZMCj5L2UTI6oZ6LD17ntW1EmMXwhRQPP9SamW8p6KZJPaJArO7lqpP5WgU03xj6k9vC9PHBLX0bQKmrjtV4D2U5mK5qw3lK3yLieZnr6Pvd11jPwn8OVhy3zgudPQgy0FdzZYW4_5ocYbW0D38yNreNQi95zJrr0UvBambwTsBg4yCkVNLSbrdA6oX-9YwuzEDCTx6j6a_TRQZQgwUQ2PKv0C2CyrofHsPMPp-VxNYb0itkRr5qix5ZFvVDwFQvj9t6yM9e1B-m_9-TvZgVgyNoOWE9n7JQmgPhyhRORXc116Yn7LOHaDt10ZFKcXJDiMVgqgrUjEM51QaDG--Tp8qPfTbidw6CdyM0F-OrQdaQihF_aJz4-yS7qh8pqzVi6WzoBONew2Xpkz0KCCTY1gm3qirUi4TUfLCdWq05qvTuBBFUFDIWtCK2Kuu25Lal4vsYNKI9W55y4hWr5aiuKjBfM9n5ptqivguOs5DvMXrV7ohVBEtbxcu6tX4hu-K8m8eIUTu_9bKokkoTfu2cAy2GKS2a9-FdgNt-TDkRGugoDTNssBV_jhN9Fg2M0G9ndESdbZNrdrfYYMc3FMxehiAiciiVw5sX_v2v4o7cR2nNBpEIiorbJoY-kTEuDyl602o6b8mXUHobUtN7n8WsqkcHQyf9itVdX6y7PINml5HqBRkT0lvdajkrZiBRf6X0fyvqeyh35alppKgO-_du80p-8WRjPsSOdmTX7T4mqNqx9xqzZiDw35H8syU1mSD_ZSlmWdm7DVN1oT2HDTf_cnTatn-fY9IpMBeuYSAVSl0L49JYNSfTjuX4tNz8LoH-U430vDiePUt6sU_XxBFdjRc6cCXPE8SbfxaddGfII1-2jC_nZpBKI7q6TH3xLrfAvHElqlzadtvFOECnyoiQB6fRtWLBNVDaH60yh5sRy_SXnadLO2vvlLepxZUbtdzrfGfSyGZS12ZKUZ8GWmtTtgBQn0CkqQ0n7q9cXrAV7jz6PIYHvKela5s04DjipCXhK5c8uMR8BdRvbzRTs8OykfmHRlOoZ5Xv4TGfS-r6jhP5nPJeBme1ylgFtZj0Ot7zVPBypbo1jX75g2YLHkhr2hGIP-cr_tKFN02d6n4NGKpjnu5tRmF5Jkqv7CoTJxyObkh25Y_n9Ck3PV2qCBFfyQzavwCm4dDk74AJeGCMbhS_oAjf1jnCA1O0Eth3atC0JJOx_ryqwjYJIqlUrAKRvEbPw4jr0-1z77SdmtvFH92BySro6LFhcXK4TVM1uDJH2m8MxCi1VgggSQswdb16mwy3mp-eQF0zDHSNiLnxnKesoxjsb_JjUTIwiXnCgml13QNvKHWdCZhLVuKjqHKSQeOYi5CL320eCVDKs4pPBsbv9cq08Artol3rww-Ib8ScrOCL3a9XCdzb0allLzz9nyK-szhlEgZHGMx5klCSoAbUguwep0Oohhjk5b1V0Xhw19jyyczoHZj_ZZaX2zQyOnLiT_D887osL125mduy7qeDE3Qy6UlQeF6fpnv9l0fdtNKhCZiFi6-lE4nweIO1Fz5KpQotsc0p205hBRyhbxsWa40v8nHGyg_rRnOB8c7OI2xjiOa4kcBo9_V8DF49Y39DmT3ODyJ58ug9bjBL0BiBR0e_bYhhwnnM_SaNiSOU5sCvIg-lXTzBNhiBqPcbTM-ifEYo_D7LtttUOWy8ul-jLG-_IWC7aO2A8iM1svadM202IonNwRh9kWFdD12Wfn38L2mcJXc0O098IcgE8SLPCAbIhb7zog1WnLUegV33jE9XotKn647ZViYtu2zcx9hF8oAfFDdKsLHO_wzanDrmXzlLlKryNpq86uN4p2I1A10frSdgQP96yTVGJcxonO2bfLX12bEGhhSutY4OOp5szzCAIquIQYy89tCc2xT0e4MyJW7Z92vkZjGaU249Ac6_Kx8rJRgx4CGPUuKHQ0O1w_vSMhYSS-AKig9OQ82QpJL49nC53piwRE6GRxTLCSq59k0DKNMRLqpfxGEV10GFaYeXLrzOoNt0njNv0nBtR-AhaKBvimAsplmrROcTL8Q-4ifT4YeF-d6CnXb5uPUQvNqLFHwriuteD5h0tKMtMnNdTFrJEe_V3sRX6DWqUBVfZ1iKn-NJbPP9aqO9IBec-VtKGZQKTCHZ6VfcLahOUrxH919XTvc-QUC64I7l3NW2wvFi0cUwicgSi6i_B3YH1WmNTJTwtLdhRHiFxOilExZWVoy4AR67m_DTna-YbosImu1aQr6jljNSeNPk0bUZi_qVUBXqa2c9NmbdhTpiWbuOs9pb5OqOx5Tn2GxKdJhdoMx1XH29WgoqPrKxP113RRGeiaHfu9wCc_f8rkCZVx96vJ7AWVSahVo0G9q5WqikCXVGuLk4wgU3RgswnTMcAnONfRgGv-CkvJEAKDjv7ejgQ0phM9zzshCGj77EDCUZ3t2uuGY6cVkSbMwFdB8wVl0hzNeGjPAWXOBr1U2Ap2aszHBVy-Mn5-B1LN8R3K266Ayq7CfMaPQBr-SesJIGyegCUZjPfjCnjDPxzs-kcd6NcyTXiiHfXbeVN05wxF0TJJqR1_BMcdm_PySolDUk0zWyK7c434g0CF88xwJ0pREukIc84KEJC34uhKLBzJxL9vZkdQbt2D5yqRfO1RNM6D6YI_O3Fw5NpZiqDSz2yT7JABIhslTQ1KSkBmCJDaupzr9emHB5-t89eQ0Lif6bOQj5WDWwVBcgmXBxRuT89kaAewmNkxPWpd58D_2AqITjuW6hyolTj9UBzUzakbmOFs6GZsulgv0TnVloSo50SEeC2DVOGFLwull37nzaSM97NYiZ5lK02GY20O7uQlW4ELaJPefrnsahQ0HDJGTNZeZfeSxy3uFF-nV70uJATEny1uuEUWMK_yxY8ucjDtCvsQyFIXFmljDg51H5g1VksCzGCc0n7ql5fXIP1_9tRbu30d86LNsxznRxGbrzNcngenriiXKbYF6XCbjghlqUl7FerUKzdkx6beF_awyUD91RdA931Cppz5KtvMtUG0D3b_WQc2OH0NQ-KmNfOpXvhz8nVTCBJZfB9N76dW4y4tXYZ3GT6g4ndCmcpvir-3kq3G32dRQnus28hwW1TZdV6TXik_Kh6w1yh9QNCFl4Rir6-Ppq0RvvF5c-RGeMgwYRwzWtKymSw7xhxTeuYmlQM0er3D5gGP2gc7VGaTB9W1wGax031YDmhLjQ39-sckF6pSer3LgsAVbcRurP3FarqrxnGJnMzHog-pHGGI7sXuoW7ZL5_BTikz-0yr862iGn2I7HjTw4KJ9SOW7z8Lye_6Co2wsx1wmvvXLltRRWjH9rmnEoox35bZjfZX5tQRBoeS_Y1Z2fgfJkdrGLul5oMG-Ru_3QkGMdHhBQ9p6QxesQnufj3k6YYrD7GKp3fAFG5BZ6QYmGZ2iiRGlvur3Hidu3STvftqezQjhV_lxXIArwR1Awbjh5CUWx3KYiMDzmBlOtlmV9fP2_ZWwBR_HJIHGnu3zVmdtCc0vYl5E3S3Tye5SzRy5b4SmkP19Fd3DgrNh8ypEW-537i2aJrzpvVaHxtpLu5ELBqLE4WQeLjv1p7Wnj_UtwSIlT39YYc0TWaulC6J0pNdZFj4eslffjtaFNh6L0D8d3Qu-2VLokAicpzpjT5aBcKbjxih3r-lrz8yn6iPHSBj1E8iw0n-ZeV_Vu2w_igGVi2uPz_pafZUtSauhHHvp-o7me9Waye2P7sWuF_35aSWO2yeadeQpNB1ipl8rXBwmZDTRqy7oGPbBFf7s9vR9JdB2xRTEPMe6hLXtbN8MOd6RIJJJeN65Ou-0geanGF4vqmIV8n_9gu8__zty0d3V`,
      humanReadable: '',
      autoDecodeNested: false,
      showInteractive: false,
      parsedData: null,
      customProperties: 'data,payload,content,config,settings,options',
      pathDefaultExpanded: []
    }
  },
  mounted() {
    // Initialize with the default JZB string
    this.onInputHandler();
  },
  methods: {
    convertJzbToHumanReadable(jzbString) {
      if (!jzbString) return "";

      try {
        const unpaddedJzbString = jzbString.substr(
          0,
          jzbString.length - (jzbString.length % 4)
        );

        const byteArray = base64js.toByteArray(unpaddedJzbString);

        // zlib inflate (decompress) binary -> JSON string
        const jsonStr = pako.inflate(byteArray, { to: "string" });

        // Parse and potentially recursively decode
        const parsed = JSON.parse(jsonStr);
        const processed = this.autoDecodeNested ? this.recursivelyDecodeJzb(parsed) : parsed;
        
        // Make it nice to read
        return JSON.stringify(processed, null, 2);
      } catch (error) {
        console.error('Error decoding JZB string:', error);
        return `Error decoding JZB string: ${error.message}`;
      }
    },
    
    recursivelyDecodeJzb(obj, parentKey = '') {
      if (typeof obj === 'string') {
        // Check if this string looks like a JZB string or if the parent key matches custom properties
        if (this.isLikelyJzbString(obj) || this.isCustomProperty(parentKey)) {
          try {
            const decoded = this.convertJzbToHumanReadable(obj);
            if (!decoded.startsWith('Error')) {
              return {
                __decoded_jzb: true,
                original: obj.substring(0, 50) + '...',
                decoded: JSON.parse(decoded),
                parentKey: parentKey
              };
            }
          } catch (e) {
            // If decoding fails, return original string
            return obj;
          }
        }
        return obj;
      } else if (Array.isArray(obj)) {
        return obj.map((item, index) => this.recursivelyDecodeJzb(item, `${parentKey}[${index}]`));
      } else if (obj && typeof obj === 'object') {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
          result[key] = this.recursivelyDecodeJzb(value, key);
        }
        return result;
      }
      return obj;
    },
    
    isLikelyJzbString(str) {
      // Check if string looks like a JZB string
      // JZB strings typically start with "eJ" and are long base64 strings with specific patterns
      return str.startsWith('eJ') &&
             /^[A-Za-z0-9+/_-]+$/.test(str) && 
             (str.includes('_') || str.includes('-')) &&
             str.length % 4 === 0;
    },
    
    isCustomProperty(key) {
      if (!this.customProperties) return false;
      const properties = this.customProperties.split(',').map(p => p.trim().toLowerCase());
      return properties.includes(key.toLowerCase());
    },
    
    customValueFormatter(value) {
      // Custom formatter for JZB decoded objects
      if (value && typeof value === 'object' && value.__decoded_jzb) {
        return {
          type: 'object',
          value: {
            '🔗 Decoded JZB': value.decoded,
            'Original (truncated)': value.original,
            'Parent Key': value.parentKey
          }
        };
      }
      return value;
    },
    
    onNodeClick(node) {
      console.log('Node clicked:', node);
    },
    
    onNodeMouseover(node) {
      console.log('Node mouseover:', node);
    },
    
    onNodeMouseout(node) {
      console.log('Node mouseout:', node);
    },
    
    onNodeSelect(node) {
      console.log('Node selected:', node);
    },
    
    onNodeCopy(node) {
      console.log('Node copied:', node);
    },
    
    onInputHandler() {
      this.humanReadable = this.convertJzbToHumanReadable(this.jzbString);
      
      if (this.showInteractive) {
        try {
          this.parsedData = JSON.parse(this.humanReadable);
        } catch (e) {
          this.parsedData = null;
          console.error('Failed to parse JSON for interactive view:', e);
        }
      } else {
        this.parsedData = null;
      }
      
      console.log(this.humanReadable);
    }
  }
}
</script>

<style scoped>
.jzb-decoder {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.jzb-decoder h2 {
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #007acc;
  padding-bottom: 10px;
}

.input-section {
  margin-bottom: 20px;
}

.input-section label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.jzb-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

.jzb-input:focus {
  outline: none;
  border-color: #007acc;
  background-color: #fff;
}

.options-section {
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #555;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.custom-properties-section {
  margin-bottom: 20px;
}

.custom-properties-section label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.custom-properties-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

.custom-properties-input:focus {
  outline: none;
  border-color: #007acc;
  background-color: #fff;
}

.output-section h3 {
  color: #333;
  margin-bottom: 10px;
}

.human-readable {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 600px;
  overflow-y: auto;
  color: #333;
}

.interactive-json {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px;
  max-height: 600px;
  overflow-y: auto;
  color: #333;
}

/* Custom styles for vue-json-pretty */
.interactive-json :deep(.vjs-tree) {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
}

.interactive-json :deep(.vjs-tree__brackets) {
  color: #333;
  font-weight: bold;
}

.interactive-json :deep(.vjs-tree__key) {
  color: #d73a49;
  font-weight: bold;
}

.interactive-json :deep(.vjs-tree__value) {
  color: #032f62;
}

.interactive-json :deep(.vjs-tree__value--string) {
  color: #032f62;
}

.interactive-json :deep(.vjs-tree__value--number) {
  color: #005cc5;
  font-weight: bold;
}

.interactive-json :deep(.vjs-tree__value--boolean) {
  color: #e36209;
  font-weight: bold;
}

.interactive-json :deep(.vjs-tree__value--null) {
  color: #6a737d;
  font-style: italic;
}

.interactive-json :deep(.vjs-tree__node) {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.interactive-json :deep(.vjs-tree__node:hover) {
  background-color: #e3f2fd;
}

.interactive-json :deep(.vjs-tree__node--selected) {
  background-color: #bbdefb;
}

.interactive-json :deep(.vjs-tree__toggle) {
  color: #007acc;
  font-weight: bold;
}

.interactive-json :deep(.vjs-tree__toggle:hover) {
  color: #005a9e;
}

.interactive-json :deep(.vjs-tree__copy-button) {
  background-color: #007acc;
  color: white;
  border: none;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  cursor: pointer;
  margin-left: 8px;
}

.interactive-json :deep(.vjs-tree__copy-button:hover) {
  background-color: #005a9e;
}

/* Special styling for JZB decoded objects */
.interactive-json :deep(.vjs-tree__key:contains('🔗 Decoded JZB')) {
  color: #007acc;
  font-weight: bold;
}

.interactive-json :deep(.vjs-tree__key:contains('Original (truncated)')) {
  color: #6a737d;
  font-style: italic;
}

.interactive-json :deep(.vjs-tree__key:contains('Parent Key')) {
  color: #28a745;
  font-weight: bold;
}
</style>