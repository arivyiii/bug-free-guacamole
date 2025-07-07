<template>
  <div class="console-sandbox">
    <header class="header" :class="{ 'header-sticky': isHeaderSticky }">
      <div class="container">
        <h1 class="title">Console Sandbox</h1>
        <p class="subtitle">Test JavaScript console methods with various data types</p>
        
        <div class="method-selector">
          <label for="method-select">Console Method:</label>
          <select id="method-select" v-model="selectedMethod" class="method-select">
            <option value="log">console.log</option>
            <option value="info">console.info</option>
            <option value="warn">console.warn</option>
            <option value="error">console.error</option>
            <option value="debug">console.debug</option>
          </select>
        </div>
      </div>
    </header>

    <!-- Placeholder to prevent layout shift -->
    <div class="header-placeholder" v-show="isHeaderSticky"></div>

    <main class="main">
      <div class="container">
        <div class="sections">
          <!-- Primitives Section -->
          <section class="section">
            <h2 class="section-title">Primitives</h2>
            <div class="button-grid">
              <button @click="logPrimitive('string', 'Hello, world!')" class="btn">String</button>
              <button @click="logPrimitive('number', 42)" class="btn">Number</button>
              <button @click="logPrimitive('boolean', true)" class="btn">Boolean</button>
              <button @click="logPrimitive('null', null)" class="btn">Null</button>
              <button @click="logPrimitive('undefined', undefined)" class="btn">Undefined</button>
            </div>
          </section>

          <!-- Objects & Arrays Section -->
          <section class="section">
            <h2 class="section-title">Objects & Arrays</h2>
            <div class="button-grid">
              <button @click="logObject({ key: 'value', nested: { foo: 'bar' } })" class="btn">Object</button>
              <button @click="logObject({})" class="btn">Empty Object</button>
              <button @click="logObject({ a: { b: { c: { d: 1 } } } })" class="btn">Nested Object</button>
              <button @click="logObject(getSymbolKeyObject())" class="btn">Symbol Keys</button>
              <button @click="logArray([1, 2, 3, 4, 5])" class="btn">Array</button>
              <button @click="logArray([])" class="btn">Empty Array</button>
              <button @click="logArray([{id:1},{id:2}])" class="btn">Object Array</button>
              <button @click="logArray([1, 'two', null, {foo:'bar'}, [5,6]])" class="btn">Mixed Array</button>
              <button @click="logSet()" class="btn">Set</button>
              <button @click="logWeakSet()" class="btn">WeakSet</button>
              <button @click="logMap()" class="btn">Map</button>
              <button @click="logWeakMap()" class="btn">WeakMap</button>
              <button @click="logRegExp()" class="btn">RegExp</button>
              <button @click="logArrayBuffer()" class="btn">ArrayBuffer</button>
              <button @click="logDataView()" class="btn">DataView</button>
              <button @click="logTypedArray()" class="btn">Uint8Array</button>
              <button @click="logCircularReference()" class="btn">Circular Ref</button>
              <button @click="logDate()" class="btn">Date</button>
              <button @click="logLargeObject()" class="btn">Large Object</button>
              <button @click="logLargeObject(50)" class="btn">Large Object (50)</button>
            </div>
          </section>

          <!-- Faker Data Section -->
          <section class="section">
            <h2 class="section-title">Faker Data</h2>
            <div class="button-grid">
              <button @click="logFakerUser()" class="btn">User Profile</button>
              <button @click="logFakerCompany()" class="btn">Company</button>
              <button @click="logFakerAddress()" class="btn">Address</button>
              <button @click="logFakerProduct()" class="btn">Product</button>
              <button @click="logFakerOrder()" class="btn">Order</button>
              <button @click="logFakerUsers()" class="btn">User Array</button>
              <button @click="logFakerProducts()" class="btn">Product Array</button>
              <button @click="logFakerMixed()" class="btn">Mixed Data</button>
            </div>
          </section>

          <!-- Functions & Errors Section -->
          <section class="section">
            <h2 class="section-title">Functions & Errors</h2>
            <div class="button-grid">
              <button @click="logFunction(() => console.log('Function executed'))" class="btn">Function</button>
              <button @click="logError(new Error('Test error with stack trace'))" class="btn btn-error">Error</button>
              <button @click="logResolvedPromise()" class="btn">Resolved Promise</button>
              <button @click="logPendingPromise()" class="btn">Pending Promise</button>
              <button @click="logRejectedPromise()" class="btn btn-error">Rejected Promise</button>
            </div>
          </section>

          <!-- DOM Elements Section -->
          <section class="section">
            <h2 class="section-title">DOM Elements</h2>
            <div class="button-grid">
              <button @click="logDOMElement()" class="btn">DOM Element</button>
              <button @click="logIframe()" class="btn">Iframe</button>
            </div>
            <div id="iframe-container" class="iframe-container"></div>
          </section>

          <!-- Utilities Section -->
          <section class="section">
            <h2 class="section-title">Utilities</h2>
            <div class="button-grid">
              <button @click="logDeduped('This is a deduped log', 200)" class="btn">Deduped Log</button>
              <button @click="logAllTypes('Test message')" class="btn">All Types</button>
            </div>
          </section>

          <!-- XSS Test Cases Section -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">XSS Test Cases</h2>
              <button @click="toggleAllXssSections" class="btn btn-toggle">
                {{ allXssSectionsExpanded ? 'Collapse All' : 'Show All' }}
              </button>
            </div>
            
            <!-- Basic XSS -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.basic = !xssSections.basic">
                <span class="toggle-icon">{{ xssSections.basic ? '▼' : '▶' }}</span>
                Basic XSS (HTML/Script Tags, Event Handlers, URL Schemes)
              </h3>
              <div class="button-grid" v-show="xssSections.basic">
                <button @click="logXSSScriptTag()" class="btn btn-error">Script Tag</button>
                <button @click="logXSSImgOnError()" class="btn btn-error">Img onerror</button>
                <button @click="logXSSSvgOnLoad()" class="btn btn-error">SVG onload</button>
                <button @click="logXSSJavaScriptUrl()" class="btn btn-error">JS URL</button>
                <button @click="logXSSOnClick()" class="btn btn-error">onclick</button>
                <button @click="logXSSOnLoad()" class="btn btn-error">onload</button>
                <button @click="logXSSOnFocus()" class="btn btn-error">onfocus</button>
                <button @click="logXSSDataUrl()" class="btn btn-error">Data URL</button>
                <button @click="logXSSVBScript()" class="btn btn-error">VBScript</button>
                <button @click="logXSSObjectMalicious()" class="btn btn-error">Malicious Object</button>
                <button @click="logXSSObjectHtml()" class="btn btn-error">HTML Object</button>
                <button @click="logXSSDOMElement()" class="btn btn-error">DOM Element</button>
                <button @click="logXSSLongPayload()" class="btn btn-error">Long Payload</button>
                <button @click="logXSSUnicode()" class="btn btn-error">Unicode</button>
                <button @click="logXSSHtmlEntities()" class="btn btn-error">HTML Entities</button>
                <button @click="logXSSWithPII()" class="btn btn-error">XSS + PII</button>
                <button @click="logXSSInUrl()" class="btn btn-error">XSS in URL</button>
                <button @click="logXSSError()" class="btn btn-error">XSS Error</button>
              </div>
            </div>

            <!-- CSS-based XSS -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.css = !xssSections.css">
                <span class="toggle-icon">{{ xssSections.css ? '▼' : '▶' }}</span>
                CSS-based XSS
              </h3>
              <div class="button-grid" v-show="xssSections.css">
                <button @click="logXSSCssExpression()" class="btn btn-error">CSS Expression</button>
                <button @click="logXSSCssUrl()" class="btn btn-error">CSS URL</button>
                <button @click="logXSSCssImport()" class="btn btn-error">CSS Import</button>
              </div>
            </div>

            <!-- Advanced Event Handlers -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.events = !xssSections.events">
                <span class="toggle-icon">{{ xssSections.events ? '▼' : '▶' }}</span>
                Advanced Event Handlers
              </h3>
              <div class="button-grid" v-show="xssSections.events">
                <button @click="logXSSOnMouseOver()" class="btn btn-error">onmouseover</button>
                <button @click="logXSSOnKeyPress()" class="btn btn-error">onkeypress</button>
                <button @click="logXSSOnBlur()" class="btn btn-error">onblur</button>
                <button @click="logXSSOnContextMenu()" class="btn btn-error">oncontextmenu</button>
                <button @click="logXSSOnDoubleClick()" class="btn btn-error">ondblclick</button>
              </div>
            </div>

            <!-- Frame/Iframe XSS -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.frames = !xssSections.frames">
                <span class="toggle-icon">{{ xssSections.frames ? '▼' : '▶' }}</span>
                Frame/Iframe XSS
              </h3>
              <div class="button-grid" v-show="xssSections.frames">
                <button @click="logXSSIframeSrc()" class="btn btn-error">Iframe src</button>
                <button @click="logXSSFrameSrc()" class="btn btn-error">Frame src</button>
                <button @click="logXSSEmbedSrc()" class="btn btn-error">Embed src</button>
                <button @click="logXSSObjectData()" class="btn btn-error">Object data</button>
              </div>
            </div>

            <!-- Meta/Link XSS -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.meta = !xssSections.meta">
                <span class="toggle-icon">{{ xssSections.meta ? '▼' : '▶' }}</span>
                Meta/Link XSS
              </h3>
              <div class="button-grid" v-show="xssSections.meta">
                <button @click="logXSSMetaRefresh()" class="btn btn-error">Meta refresh</button>
                <button @click="logXSSLinkHref()" class="btn btn-error">Link href</button>
                <button @click="logXSSAnchorHref()" class="btn btn-error">Anchor href</button>
              </div>
            </div>

            <!-- Form XSS -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.forms = !xssSections.forms">
                <span class="toggle-icon">{{ xssSections.forms ? '▼' : '▶' }}</span>
                Form XSS
              </h3>
              <div class="button-grid" v-show="xssSections.forms">
                <button @click="logXSSFormAction()" class="btn btn-error">Form action</button>
                <button @click="logXSSInputFormaction()" class="btn btn-error">Input formaction</button>
              </div>
            </div>

            <!-- Advanced URL Schemes -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.urls = !xssSections.urls">
                <span class="toggle-icon">{{ xssSections.urls ? '▼' : '▶' }}</span>
                Advanced URL Schemes
              </h3>
              <div class="button-grid" v-show="xssSections.urls">
                <button @click="logXSSDataUrlWithBase64()" class="btn btn-error">Data URL Base64</button>
                <button @click="logXSSDataUrlWithCharset()" class="btn btn-error">Data URL Charset</button>
                <button @click="logXSSFileUrl()" class="btn btn-error">File URL</button>
                <button @click="logXSSFtpUrl()" class="btn btn-error">FTP URL</button>
              </div>
            </div>

            <!-- Unicode and Encoding -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.encoding = !xssSections.encoding">
                <span class="toggle-icon">{{ xssSections.encoding ? '▼' : '▶' }}</span>
                Unicode and Encoding Variations
              </h3>
              <div class="button-grid" v-show="xssSections.encoding">
                <button @click="logXSSUnicodeHex()" class="btn btn-error">Unicode Hex</button>
                <button @click="logXSSUnicodeDecimal()" class="btn btn-error">Unicode Decimal</button>
                <button @click="logXSSUnicodeMixed()" class="btn btn-error">Unicode Mixed</button>
                <button @click="logXSSUrlEncoded()" class="btn btn-error">URL Encoded</button>
                <button @click="logXSSDoubleEncoded()" class="btn btn-error">Double Encoded</button>
              </div>
            </div>

            <!-- Template Literals -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.templates = !xssSections.templates">
                <span class="toggle-icon">{{ xssSections.templates ? '▼' : '▶' }}</span>
                Template Literals and String Interpolation
              </h3>
              <div class="button-grid" v-show="xssSections.templates">
                <button @click="logXSSTemplateLiteral()" class="btn btn-error">Template Literal</button>
                <button @click="logXSSStringInterpolation()" class="btn btn-error">String Interpolation</button>
              </div>
            </div>

            <!-- Complex Objects -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.objects = !xssSections.objects">
                <span class="toggle-icon">{{ xssSections.objects ? '▼' : '▶' }}</span>
                Complex Objects and Nesting
              </h3>
              <div class="button-grid" v-show="xssSections.objects">
                <button @click="logXSSNestedArray()" class="btn btn-error">Nested Array</button>
                <button @click="logXSSNestedObject()" class="btn btn-error">Nested Object</button>
                <button @click="logXSSMixedData()" class="btn btn-error">Mixed Data</button>
              </div>
            </div>

            <!-- Functions and Classes -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.functions = !xssSections.functions">
                <span class="toggle-icon">{{ xssSections.functions ? '▼' : '▶' }}</span>
                Functions and Classes
              </h3>
              <div class="button-grid" v-show="xssSections.functions">
                <button @click="logXSSFunctionName()" class="btn btn-error">Function Name</button>
                <button @click="logXSSSymbolKey()" class="btn btn-error">Symbol Key</button>
                <button @click="logXSSProxyObject()" class="btn btn-error">Proxy Object</button>
                <button @click="logXSSGeneratorFunction()" class="btn btn-error">Generator Function</button>
                <button @click="logXSSAsyncFunction()" class="btn btn-error">Async Function</button>
                <button @click="logXSSMaliciousClass()" class="btn btn-error">Malicious Class</button>
              </div>
            </div>

            <!-- Collections -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.collections = !xssSections.collections">
                <span class="toggle-icon">{{ xssSections.collections ? '▼' : '▶' }}</span>
                Collections (Map, Set, TypedArray)
              </h3>
              <div class="button-grid" v-show="xssSections.collections">
                <button @click="logXSSMaliciousMap()" class="btn btn-error">Malicious Map</button>
                <button @click="logXSSMaliciousSet()" class="btn btn-error">Malicious Set</button>
                <button @click="logXSSMaliciousTypedArray()" class="btn btn-error">Malicious TypedArray</button>
              </div>
            </div>

            <!-- Built-in Objects -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.builtins = !xssSections.builtins">
                <span class="toggle-icon">{{ xssSections.builtins ? '▼' : '▶' }}</span>
                Built-in Objects
              </h3>
              <div class="button-grid" v-show="xssSections.builtins">
                <button @click="logXSSMaliciousDate()" class="btn btn-error">Malicious Date</button>
                <button @click="logXSSMaliciousRegExp()" class="btn btn-error">Malicious RegExp</button>
                <button @click="logXSSMaliciousErrorStack()" class="btn btn-error">Malicious Error Stack</button>
              </div>
            </div>

            <!-- Advanced Patterns -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="xssSections.patterns = !xssSections.patterns">
                <span class="toggle-icon">{{ xssSections.patterns ? '▼' : '▶' }}</span>
                Advanced Patterns
              </h3>
              <div class="button-grid" v-show="xssSections.patterns">
                <button @click="logXSSCircularXSS()" class="btn btn-error">Circular XSS</button>
                <button @click="logXSSDeepNestedXSS()" class="btn btn-error">Deep Nested XSS</button>
                <button @click="logXSSMaliciousArrayMethods()" class="btn btn-error">Malicious Array Methods</button>
                <button @click="logXSSMaliciousPrototype()" class="btn btn-error">Malicious Prototype</button>
              </div>
            </div>
          </section>

          <!-- IP Address Test Cases Section -->
          <section class="section">
            <h2 class="section-title">IP Address Test Cases</h2>
            <div class="button-grid">
              <button @click="console[this.selectedMethod]('192.168.1.1')" class="btn">IP: 192.168.1.1</button>
              <button @click="console[this.selectedMethod]('192.168.001.001')" class="btn">IP: 192.168.001.001</button>
              <button @click="console[this.selectedMethod]('192 . 168 . 1 . 1')" class="btn">IP: 192 . 168 . 1 . 1</button>
              <button @click="console[this.selectedMethod]('[192.168.1.1]')" class="btn">IP: [192.168.1.1]</button>
              <button @click="console[this.selectedMethod]('2001:0db8:85a3:0000:0000:8a2e:0370:7334')" class="btn">IPv6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334</button>
              <button @click="console[this.selectedMethod]('The user connected from 192.168.1.1 and accessed the system.')" class="btn">IP in text</button>
            </div>
          </section>

          <!-- SSN Test Cases Section -->
          <section class="section">
            <h2 class="section-title">SSN Test Cases</h2>
            <div class="button-grid">
              <button @click="console[this.selectedMethod]('123-45-6789')" class="btn">SSN: 123-45-6789</button>
              <button @click="console[this.selectedMethod]('12345678')" class="btn">SSN: 12345678</button>
              <button @click="console[this.selectedMethod]('123 45 6789')" class="btn">SSN: 123 45 6789</button>
              <button @click="console[this.selectedMethod]('123.45.6789')" class="btn">SSN: 123.45.6789</button>
              <button @click="console[this.selectedMethod]('123/45/6789')" class="btn">SSN: 123/45/6789</button>
              <button @click="console[this.selectedMethod]('(123) 45-6789')" class="btn">SSN: (123) 45-6789</button>
              <button @click="console[this.selectedMethod]('The provided SSN is 123-45-6789 and should be scrubbed.')" class="btn">SSN in text</button>
            </div>
          </section>

          <!-- Credit Card Test Cases Section -->
          <section class="section">
            <h2 class="section-title">Credit Card Test Cases</h2>
            <div class="button-grid">
              <button @click="console[this.selectedMethod]('4111 1111 1111 1111')" class="btn">Visa: 4111 1111 1111 1111</button>
              <button @click="console[this.selectedMethod]('5500 0000 0000 0000')" class="btn">Mastercard: 5500 0000 0000 0000</button>
              <button @click="console[this.selectedMethod]('3400 000000 00009')" class="btn">Amex: 3400 000000 00009</button>
              <button @click="console[this.selectedMethod]('6011 0000 0000 0004')" class="btn">Discover: 6011 0000 0000 0004</button>
              <button @click="console[this.selectedMethod]('4111-1111-1111-1111')" class="btn">Visa (dashes): 4111-1111-1111-1111</button>
              <button @click="console[this.selectedMethod]('4111.1111.1111.1111')" class="btn">Visa (dots): 4111.1111.1111.1111</button>
              <button @click="console[this.selectedMethod]('4111/1111/1111/1111')" class="btn">Visa (slashes): 4111/1111/1111/1111</button>
              <button @click="console[this.selectedMethod]('4111111111111111')" class="btn">Visa (no spaces): 4111111111111111</button>
              <button @click="console[this.selectedMethod]('The card number 4111 1111 1111 1111 was used for the transaction.')" class="btn">Credit Card in text</button>
            </div>
          </section>

          <!-- HTTPS URL Test Cases Section -->
          <section class="section">
            <h2 class="section-title">HTTPS URL Test Cases</h2>
            <div class="button-grid">
              <button @click="console[this.selectedMethod]('https://example.com')" class="btn">URL: beginning</button>
              <button @click="console[this.selectedMethod]('foo https://example.com bar')" class="btn">URL: middle</button>
              <button @click="console[this.selectedMethod]('foo bar https://example.com')" class="btn">URL: end</button>
              <button @click="console[this.selectedMethod]('https://example.com/path/to/resource')" class="btn">URL: with path</button>
              <button @click="console[this.selectedMethod]('https://example.com?foo=bar&baz=qux')" class="btn">URL: with query</button>
              <button @click="console[this.selectedMethod]('https://example.com:8080')" class="btn">URL: with port</button>
              <button @click="console[this.selectedMethod]('https://example.com#fragment')" class="btn">URL: with fragment</button>
              <button @click="console[this.selectedMethod]('https://sub.example.com')" class="btn">URL: with subdomain</button>
              <button @click="console[this.selectedMethod]('https://user:pass@example.com')" class="btn">URL: with credentials</button>
              <button @click="console[this.selectedMethod]('The user visited https://example.com while browsing the site.')" class="btn">URL in text</button>
            </div>
          </section>

          <!-- Dedupe Test Cases Section -->
          <section class="section">
            <h2 class="section-title">Dedupe Test Cases</h2>
            <div class="button-grid">
              <button @click="dedupeSameMethodMessageStack" class="btn">Same method, message, stack (x5)</button>
              <button @click="dedupeSameMethodMessageDiffStack" class="btn">Same method+message, diff stack (x5)</button>
              <button @click="dedupeSameMethodStackDiffMessage" class="btn">Same method+stack, diff message (x5)</button>
              <button @click="dedupeDiffMethodSameMessageStack" class="btn">Diff method, same message+stack (x5)</button>
              <button @click="dedupeDiffMethodMessageStack" class="btn">Diff method, message, stack (x5)</button>
            </div>
          </section>

          <!-- Continuous Logging Section -->
          <section class="section" v-if="!isProduction">
            <h2 class="section-title">Continuous Logging</h2>
            <div class="button-grid">
              <button @click="startContinuousLogging" class="btn btn-error" :disabled="isLogging">Start 2min Continuous Logging</button>
              <button @click="startConsoleSpam" class="btn btn-error" :disabled="isLogging">Start 2min Console Spam</button>
            </div>
            <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6c757d;">
              Left: Random intervals (0-2s) | Right: Maximum spam for rate limiting tests
            </p>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { faker } from '@faker-js/faker';
import { xssTestCases } from './xssTestCases.js';

export default {
  name: 'ConsoleSandbox',
  data() {
    return {
      selectedMethod: 'debug',
      iframe: null,
      isLogging: false,
      isHeaderSticky: false,
      scrollTicking: false,
      // XSS section collapse states
      xssSections: {
        basic: false,
        css: false,
        events: false,
        frames: false,
        meta: false,
        forms: false,
        urls: false,
        encoding: false,
        templates: false,
        objects: false,
        functions: false,
        collections: false,
        builtins: false,
        patterns: false
      }
    };
  },
  computed: {
    isProduction() {
      return process.env.NODE_ENV === 'production';
    },
    allXssSectionsExpanded() {
      return Object.values(this.xssSections).every(expanded => expanded);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Use requestAnimationFrame for smoother performance
      if (!this.scrollTicking) {
        this.scrollTicking = true;
        requestAnimationFrame(() => {
          this.updateHeaderState();
          this.scrollTicking = false;
        });
      }
    },
    
    updateHeaderState() {
      // Use a more gradual threshold with a larger buffer for smoother transitions
      const scrollThreshold = 60;
      const buffer = 30;
      const scrollY = window.scrollY;
      
      if (scrollY > scrollThreshold + buffer) {
        this.isHeaderSticky = true;
      } else if (scrollY < scrollThreshold - buffer) {
        this.isHeaderSticky = false;
      }
      // Keep current state if in buffer zone to prevent flickering
    },
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
      console.log(message);
      console.info(message);
      console.warn(message);
      console.error(message);
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
        console[this.selectedMethod]('Large Object:', largeObject);
      }
    },
    // Faker methods
    logFakerUser() {
      const user = {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        avatar: faker.image.avatar(),
        birthDate: faker.date.birthdate(),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country()
        },
        company: faker.company.name(),
        jobTitle: faker.person.jobTitle(),
        bio: faker.lorem.paragraph(),
        website: faker.internet.url(),
        socialMedia: {
          twitter: faker.internet.username(),
          linkedin: faker.internet.username(),
          github: faker.internet.username()
        }
      };
      console[this.selectedMethod]('Faker User:', user);
    },
    logFakerCompany() {
      const company = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        catchPhrase: faker.company.catchPhrase(),
        bs: faker.company.buzzPhrase(),
        founded: faker.date.past(),
        industry: faker.company.buzzNoun(),
        size: faker.helpers.arrayElement(['startup', 'small', 'medium', 'large', 'enterprise']),
        revenue: faker.finance.amount({ min: 1000000, max: 1000000000, dec: 0 }),
        employees: faker.number.int({ min: 10, max: 10000 }),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country()
        },
        contact: {
          email: faker.internet.email(),
          phone: faker.phone.number(),
          website: faker.internet.url()
        },
        departments: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => ({
          name: faker.commerce.department(),
          manager: faker.person.fullName(),
          employees: faker.number.int({ min: 5, max: 50 })
        }))
      };
      console[this.selectedMethod]('Faker Company:', company);
    },
    logFakerAddress() {
      const address = {
        id: faker.string.uuid(),
        street: faker.location.streetAddress(),
        secondaryAddress: faker.location.secondaryAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
        countryCode: faker.location.countryCode(),
        timeZone: faker.location.timeZone(),
        coordinates: {
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude()
        },
        nearbyPlaces: Array.from({ length: 5 }, () => ({
          name: faker.company.name(),
          type: faker.helpers.arrayElement(['restaurant', 'store', 'bank', 'gas station', 'pharmacy']),
          distance: faker.number.float({ min: 0.1, max: 5.0, fractionDigits: 1 })
        }))
      };
      console[this.selectedMethod]('Faker Address:', address);
    },
    logFakerProduct() {
      const product = {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        brand: faker.company.name(),
        sku: faker.string.alphanumeric(8).toUpperCase(),
        inStock: faker.datatype.boolean(),
        stockQuantity: faker.number.int({ min: 0, max: 1000 }),
        images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.image.url()),
        specifications: {
          color: faker.color.human(),
          size: faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
          weight: faker.number.float({ min: 0.1, max: 10.0, fractionDigits: 2 }),
          material: faker.commerce.productMaterial(),
          dimensions: {
            length: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
            width: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
            height: faker.number.float({ min: 1, max: 100, fractionDigits: 1 })
          }
        },
        reviews: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => ({
          id: faker.string.uuid(),
          rating: faker.number.int({ min: 1, max: 5 }),
          comment: faker.lorem.sentence(),
          author: faker.person.fullName(),
          date: faker.date.recent()
        }))
      };
      console[this.selectedMethod]('Faker Product:', product);
    },
    logFakerOrder() {
      const order = {
        id: faker.string.uuid(),
        orderNumber: faker.string.alphanumeric(10).toUpperCase(),
        customer: {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number()
        },
        items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          quantity: faker.number.int({ min: 1, max: 10 }),
          total: faker.commerce.price()
        })),
        subtotal: faker.commerce.price(),
        tax: faker.commerce.price({ min: 10, max: 100 }),
        shipping: faker.commerce.price({ min: 5, max: 50 }),
        total: faker.commerce.price({ min: 100, max: 1000 }),
        status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
        paymentMethod: faker.helpers.arrayElement(['credit_card', 'paypal', 'bank_transfer', 'cash']),
        shippingAddress: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country()
        },
        billingAddress: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country()
        },
        orderDate: faker.date.recent(),
        estimatedDelivery: faker.date.future(),
        trackingNumber: faker.string.alphanumeric(12).toUpperCase()
      };
      console[this.selectedMethod]('Faker Order:', order);
    },
    logFakerUsers() {
      const users = Array.from({ length: faker.number.int({ min: 5, max: 15 }) }, () => ({
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        jobTitle: faker.person.jobTitle(),
        department: faker.commerce.department(),
        salary: faker.number.int({ min: 30000, max: 150000 }),
        hireDate: faker.date.past(),
        isActive: faker.datatype.boolean()
      }));
      console[this.selectedMethod]('Faker Users Array:', users);
    },
    logFakerProducts() {
      const products = Array.from({ length: faker.number.int({ min: 8, max: 20 }) }, () => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        brand: faker.company.name(),
        inStock: faker.datatype.boolean(),
        stockQuantity: faker.number.int({ min: 0, max: 500 }),
        rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        reviewCount: faker.number.int({ min: 0, max: 1000 }),
        image: faker.image.url(),
        description: faker.commerce.productDescription()
      }));
      console[this.selectedMethod]('Faker Products Array:', products);
    },
    logFakerMixed() {
      const mixedData = {
        users: Array.from({ length: 3 }, () => ({
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          avatar: faker.image.avatar()
        })),
        products: Array.from({ length: 5 }, () => ({
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          category: faker.commerce.department()
        })),
        orders: Array.from({ length: 2 }, () => ({
          id: faker.string.uuid(),
          orderNumber: faker.string.alphanumeric(8).toUpperCase(),
          total: faker.commerce.price(),
          status: faker.helpers.arrayElement(['pending', 'completed', 'cancelled'])
        })),
        analytics: {
          totalRevenue: faker.number.int({ min: 100000, max: 1000000 }),
          totalOrders: faker.number.int({ min: 1000, max: 10000 }),
          averageOrderValue: faker.number.float({ min: 50, max: 200, fractionDigits: 2 }),
          topCategories: Array.from({ length: 5 }, () => ({
            name: faker.commerce.department(),
            sales: faker.number.int({ min: 10000, max: 100000 })
          }))
        },
        settings: {
          theme: faker.helpers.arrayElement(['light', 'dark']),
          language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
          notifications: faker.datatype.boolean(),
          currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP', 'CAD'])
        }
      };
      console[this.selectedMethod]('Faker Mixed Data:', mixedData);
    },
    // HTML/Script Tags
    logXSSScriptTag() {
      console[this.selectedMethod](xssTestCases.scriptTag());
    },
    logXSSImgOnError() {
      console[this.selectedMethod](xssTestCases.imgOnError());
    },
    logXSSSvgOnLoad() {
      console[this.selectedMethod](xssTestCases.svgOnLoad());
    },
    logXSSJavaScriptUrl() {
      console[this.selectedMethod](xssTestCases.javascriptUrl());
    },
    
    // Event Handlers
    logXSSOnClick() {
      console[this.selectedMethod](xssTestCases.onClick());
    },
    logXSSOnLoad() {
      console[this.selectedMethod](xssTestCases.onLoad());
    },
    logXSSOnFocus() {
      console[this.selectedMethod](xssTestCases.onFocus());
    },
    
    // URL Schemes
    logXSSDataUrl() {
      console[this.selectedMethod](xssTestCases.dataUrl());
    },
    logXSSVBScript() {
      console[this.selectedMethod](xssTestCases.vbScript());
    },
    
    // Object Properties
    logXSSObjectMalicious() {
      console[this.selectedMethod](xssTestCases.maliciousObject());
    },
    logXSSObjectHtml() {
      console[this.selectedMethod](xssTestCases.htmlObject());
    },
    logXSSDOMElement() {
      console[this.selectedMethod](xssTestCases.createMaliciousElement());
    },
    
    // Length & Encoding
    logXSSLongPayload() {
      console[this.selectedMethod](xssTestCases.longPayload());
    },
    logXSSUnicode() {
      console[this.selectedMethod](xssTestCases.unicode());
    },
    logXSSHtmlEntities() {
      console[this.selectedMethod](xssTestCases.htmlEntities());
    },
    
    // PII & Errors
    logXSSWithPII() {
      console[this.selectedMethod](xssTestCases.withPii());
    },
    logXSSInUrl() {
      console[this.selectedMethod](xssTestCases.inUrl());
    },
    logXSSError() {
      console.error(xssTestCases.createMaliciousError());
    },
    
    // Additional XSS Test Cases - CSS-based
    logXSSCssExpression() {
      console[this.selectedMethod](xssTestCases.cssExpression());
    },
    logXSSCssUrl() {
      console[this.selectedMethod](xssTestCases.cssUrl());
    },
    logXSSCssImport() {
      console[this.selectedMethod](xssTestCases.cssImport());
    },
    
    // Additional XSS Test Cases - Advanced Event Handlers
    logXSSOnMouseOver() {
      console[this.selectedMethod](xssTestCases.onMouseOver());
    },
    logXSSOnKeyPress() {
      console[this.selectedMethod](xssTestCases.onKeyPress());
    },
    logXSSOnBlur() {
      console[this.selectedMethod](xssTestCases.onBlur());
    },
    logXSSOnContextMenu() {
      console[this.selectedMethod](xssTestCases.onContextMenu());
    },
    logXSSOnDoubleClick() {
      console[this.selectedMethod](xssTestCases.onDoubleClick());
    },
    
    // Additional XSS Test Cases - Frame/Iframe
    logXSSIframeSrc() {
      console[this.selectedMethod](xssTestCases.iframeSrc());
    },
    logXSSFrameSrc() {
      console[this.selectedMethod](xssTestCases.frameSrc());
    },
    logXSSEmbedSrc() {
      console[this.selectedMethod](xssTestCases.embedSrc());
    },
    logXSSObjectData() {
      console[this.selectedMethod](xssTestCases.objectData());
    },
    
    // Additional XSS Test Cases - Meta/Link
    logXSSMetaRefresh() {
      console[this.selectedMethod](xssTestCases.metaRefresh());
    },
    logXSSLinkHref() {
      console[this.selectedMethod](xssTestCases.linkHref());
    },
    logXSSAnchorHref() {
      console[this.selectedMethod](xssTestCases.anchorHref());
    },
    
    // Additional XSS Test Cases - Form
    logXSSFormAction() {
      console[this.selectedMethod](xssTestCases.formAction());
    },
    logXSSInputFormaction() {
      console[this.selectedMethod](xssTestCases.inputFormaction());
    },
    
    // Additional XSS Test Cases - Advanced URL Schemes
    logXSSDataUrlWithBase64() {
      console[this.selectedMethod](xssTestCases.dataUrlWithBase64());
    },
    logXSSDataUrlWithCharset() {
      console[this.selectedMethod](xssTestCases.dataUrlWithCharset());
    },
    logXSSFileUrl() {
      console[this.selectedMethod](xssTestCases.fileUrl());
    },
    logXSSFtpUrl() {
      console[this.selectedMethod](xssTestCases.ftpUrl());
    },
    
    // Additional XSS Test Cases - Unicode and Encoding
    logXSSUnicodeHex() {
      console[this.selectedMethod](xssTestCases.unicodeHex());
    },
    logXSSUnicodeDecimal() {
      console[this.selectedMethod](xssTestCases.unicodeDecimal());
    },
    logXSSUnicodeMixed() {
      console[this.selectedMethod](xssTestCases.unicodeMixed());
    },
    logXSSUrlEncoded() {
      console[this.selectedMethod](xssTestCases.urlEncoded());
    },
    logXSSDoubleEncoded() {
      console[this.selectedMethod](xssTestCases.doubleEncoded());
    },
    
    // Additional XSS Test Cases - Template Literals
    logXSSTemplateLiteral() {
      console[this.selectedMethod](xssTestCases.templateLiteral());
    },
    logXSSStringInterpolation() {
      console[this.selectedMethod](xssTestCases.stringInterpolation());
    },
    
    // Additional XSS Test Cases - Complex Objects
    logXSSNestedArray() {
      console[this.selectedMethod](xssTestCases.nestedArray());
    },
    logXSSNestedObject() {
      console[this.selectedMethod](xssTestCases.nestedObject());
    },
    logXSSMixedData() {
      console[this.selectedMethod](xssTestCases.mixedData());
    },
    
    // Additional XSS Test Cases - Functions and Classes
    logXSSFunctionName() {
      console[this.selectedMethod](xssTestCases.functionName());
    },
    logXSSSymbolKey() {
      console[this.selectedMethod](xssTestCases.symbolKey());
    },
    logXSSProxyObject() {
      console[this.selectedMethod](xssTestCases.proxyObject());
    },
    logXSSGeneratorFunction() {
      console[this.selectedMethod](xssTestCases.generatorFunction());
    },
    logXSSAsyncFunction() {
      console[this.selectedMethod](xssTestCases.asyncFunction());
    },
    logXSSMaliciousClass() {
      console[this.selectedMethod](xssTestCases.maliciousClass());
    },
    
    // Additional XSS Test Cases - Collections
    logXSSMaliciousMap() {
      console[this.selectedMethod](xssTestCases.maliciousMap());
    },
    logXSSMaliciousSet() {
      console[this.selectedMethod](xssTestCases.maliciousSet());
    },
    logXSSMaliciousTypedArray() {
      console[this.selectedMethod](xssTestCases.maliciousTypedArray());
    },
    
    // Additional XSS Test Cases - Built-in Objects
    logXSSMaliciousDate() {
      console[this.selectedMethod](xssTestCases.maliciousDate());
    },
    logXSSMaliciousRegExp() {
      console[this.selectedMethod](xssTestCases.maliciousRegExp());
    },
    logXSSMaliciousErrorStack() {
      console[this.selectedMethod](xssTestCases.maliciousErrorStack());
    },
    
    // Additional XSS Test Cases - Advanced Patterns
    logXSSCircularXSS() {
      console[this.selectedMethod](xssTestCases.circularXSS());
    },
    logXSSDeepNestedXSS() {
      console[this.selectedMethod](xssTestCases.deepNestedXSS());
    },
    logXSSMaliciousArrayMethods() {
      const maliciousArray = xssTestCases.maliciousArrayMethods();
      console[this.selectedMethod](maliciousArray.toString());
      console[this.selectedMethod](maliciousArray.join(''));
    },
    logXSSMaliciousPrototype() {
      console[this.selectedMethod](xssTestCases.maliciousPrototype());
    },
    
    // Toggle all XSS sections
    toggleAllXssSections() {
      const shouldExpand = !this.allXssSectionsExpanded;
      Object.keys(this.xssSections).forEach(key => {
        this.xssSections[key] = shouldExpand;
      });
    },
    
    dedupeSameMethodMessageStack() {
      // Same method, message, and stack - log from same function multiple times
      const logSameStack = () => {
        const err = new Error('dedupe');
        console[this.selectedMethod]('dedupe message', err);
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
        console[this.selectedMethod](message, err);
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
    },
    startContinuousLogging() {
      const startTime = Date.now();
      const duration = 2 * 60 * 1000; // 2 minutes in milliseconds
      let logCount = 0;
      this.isLogging = true;
      
      const methods = ['log', 'info', 'warn', 'error'];
      const messages = [
        'Application started successfully',
        'Processing user request',
        'Database connection established',
        'API call completed',
        'Cache miss - fetching from database',
        'User authentication successful',
        'File upload completed',
        'Background task finished',
        'Memory usage: 45%',
        'Network request timeout',
        'Configuration loaded',
        'Session created',
        'Data validation passed',
        'External service unavailable',
        'Task queue processed'
      ];
      
      const logRandomMessage = () => {
        const now = Date.now();
        if (now - startTime >= duration) {
          console.log(`Continuous logging completed. Total logs: ${logCount}`);
          this.isLogging = false;
          return;
        }
        
        const method = methods[Math.floor(Math.random() * methods.length)];
        const message = messages[Math.floor(Math.random() * messages.length)];
        const timestamp = new Date().toISOString();
        
        console[method](`[${timestamp}] ${message} (Log #${++logCount})`);
        
        // Schedule next log with random interval (0-2 seconds, including sub-second)
        const nextInterval = Math.random() * 2000; // 0-2000ms (0-2 seconds)
        setTimeout(logRandomMessage, nextInterval);
      };
      
      console.log('Starting continuous logging for 2 minutes...');
      logRandomMessage();
    },
    startConsoleSpam() {
      const startTime = Date.now();
      const duration = 2 * 60 * 1000; // 2 minutes in milliseconds
      let logCount = 0;
      this.isLogging = true;
      
      const methods = ['log', 'info', 'warn', 'error'];
      const spamMessages = [
        'SPAM: Rate limit test message',
        'SPAM: High volume logging test',
        'SPAM: Console flood detection',
        'SPAM: Log aggregation stress test',
        'SPAM: Performance monitoring test',
        'SPAM: System load simulation',
        'SPAM: Network traffic simulation',
        'SPAM: Database query spam',
        'SPAM: API endpoint hammering',
        'SPAM: Memory pressure test',
        'SPAM: CPU intensive logging',
        'SPAM: I/O bound operation test',
        'SPAM: Concurrent request simulation',
        'SPAM: Buffer overflow test',
        'SPAM: Queue saturation test'
      ];
      
      const spamConsole = () => {
        const now = Date.now();
        if (now - startTime >= duration) {
          console.log(`Console spam completed. Total logs: ${logCount}`);
          this.isLogging = false;
          return;
        }
        
        const maxSpam = 100;
        const minSpam = 40;
        const spamPerBurst = Math.floor(Math.random() * (maxSpam - minSpam + 1)) + minSpam;
        // Log multiple messages per iteration for maximum spam
        for (let i = 0; i < spamPerBurst; i++) {
          const method = methods[Math.floor(Math.random() * methods.length)];
          const message = spamMessages[Math.floor(Math.random() * spamMessages.length)];
          const timestamp = new Date().toISOString();
          
          console[method](`[${timestamp}] ${message} (Spam #${++logCount})`);
        }
        
        // Schedule next spam burst immediately (no delay for maximum spam)
        setTimeout(spamConsole, 0);
      };
      
      console.log('Starting console spam for 2 minutes...');
      spamConsole();
    }
  }
};
</script>

<style scoped>
.console-sandbox {
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  background-color: white;
  border-bottom: 1px solid #e9ecef;
  padding: 2rem 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(0);
  will-change: transform, padding, box-shadow;
}

.header-placeholder {
  height: 8rem;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

.header-sticky .title {
  font-size: 1.5rem;
  margin: 0 0 0.25rem 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-sticky .subtitle {
  font-size: 0.875rem;
  margin: 0 0 0.75rem 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-sticky .method-selector {
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-sticky .method-selector label {
  font-size: 0.8rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-sticky .method-select {
  padding: 0.375rem 0.5rem;
  font-size: 0.8rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.title {
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #212529;
}

.subtitle {
  font-size: 1rem;
  color: #6c757d;
  margin: 0 0 1.5rem 0;
}

.method-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.method-selector label {
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
}

.method-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: white;
  font-size: 0.9rem;
  color: #495057;
  cursor: pointer;
}

.method-select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.main {
  padding: 2rem 0;
}

.sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.section {
  background-color: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #212529;
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 0.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 0.5rem;
}

.section-header .section-title {
  margin: 0;
  border-bottom: none;
  padding-bottom: 0;
}

.btn-toggle {
  background-color: #e9ecef;
  border-color: #ced4da;
  color: #495057;
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem;
  min-width: 100px;
}

.btn-toggle:hover {
  background-color: #dee2e6;
  border-color: #adb5bd;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
}

.btn {
  padding: 0.75rem 1rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  color: #495057;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
}

.btn:hover {
  background-color: #e9ecef;
  border-color: #adb5bd;
}

.btn:active {
  background-color: #dee2e6;
}

.btn:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.btn-error {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.btn-error:hover {
  background-color: #f1b0b7;
  border-color: #ed969e;
}

.iframe-container {
  margin-top: 1rem;
  height: 100px;
  border: 1px dashed #dee2e6;
  border-radius: 4px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 0.875rem;
}

/* XSS Collapsible Sections */
.xss-subsection {
  margin-bottom: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  overflow: hidden;
}

.xss-subsection:last-child {
  margin-bottom: 0;
}

.subsection-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  padding: 0.75rem 1rem;
  background-color: #f8f9fa;
  color: #495057;
  cursor: pointer;
  border-bottom: 1px solid #e9ecef;
  transition: background-color 0.15s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.subsection-title:hover {
  background-color: #e9ecef;
}

.toggle-icon {
  font-size: 0.75rem;
  color: #6c757d;
  transition: transform 0.15s ease;
}

.xss-subsection .button-grid {
  padding: 1rem;
  margin: 0;
  background-color: white;
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  .title {
    font-size: 1.75rem;
  }
  
  .sections {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .section {
    padding: 1.25rem;
  }
  
  .button-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.375rem;
  }
  
  .btn {
    padding: 0.625rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .method-selector {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .button-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
  
  .btn {
    padding: 0.5rem 0.625rem;
    font-size: 0.75rem;
  }
}
</style> 