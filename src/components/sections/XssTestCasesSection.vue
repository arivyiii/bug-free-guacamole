<template>
  <ConsoleSandboxSection 
    title="XSS Test Cases" 
    :selectedMethod="selectedMethod" 
    :collapsible="true"
    :initiallyExpanded="false"
    :grid="false"
  >
    <template #header-actions>
      <button @click="toggleAllXssSections" class="console-sandbox__btn console-sandbox__btn--toggle">
        {{ allXssSectionsExpanded ? 'Collapse All' : 'Show All' }}
      </button>
    </template>
    
    <!-- Basic XSS -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.basic = !xssSections.basic">
        <span class="console-sandbox__toggle-icon">{{ xssSections.basic ? '▼' : '▶' }}</span>
        Basic XSS
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.basic">
        <button @click="logXSSScriptTag()" class="console-sandbox__btn console-sandbox__btn--error">Script Tag</button>
        <button @click="logXSSImgOnError()" class="console-sandbox__btn console-sandbox__btn--error">Img onerror</button>
        <button @click="logXSSSvgOnLoad()" class="console-sandbox__btn console-sandbox__btn--error">SVG onload</button>
        <button @click="logXSSJavaScriptUrl()" class="console-sandbox__btn console-sandbox__btn--error">JS URL</button>
        <button @click="logXSSOnClick()" class="console-sandbox__btn console-sandbox__btn--error">onclick</button>
        <button @click="logXSSOnLoad()" class="console-sandbox__btn console-sandbox__btn--error">onload</button>
        <button @click="logXSSOnFocus()" class="console-sandbox__btn console-sandbox__btn--error">onfocus</button>
        <button @click="logXSSDataUrl()" class="console-sandbox__btn console-sandbox__btn--error">Data URL</button>
        <button @click="logXSSVBScript()" class="console-sandbox__btn console-sandbox__btn--error">VBScript</button>
        <button @click="logXSSObjectMalicious()" class="console-sandbox__btn console-sandbox__btn--error">Malicious Object</button>
        <button @click="logXSSObjectHtml()" class="console-sandbox__btn console-sandbox__btn--error">HTML Object</button>
        <button @click="logXSSDOMElement()" class="console-sandbox__btn console-sandbox__btn--error">DOM Element</button>
        <button @click="logXSSLongPayload()" class="console-sandbox__btn console-sandbox__btn--error">Long Payload</button>
        <button @click="logXSSUnicode()" class="console-sandbox__btn console-sandbox__btn--error">Unicode</button>
        <button @click="logXSSHtmlEntities()" class="console-sandbox__btn console-sandbox__btn--error">HTML Entities</button>
        <button @click="logXSSWithPII()" class="console-sandbox__btn console-sandbox__btn--error">XSS + PII</button>
        <button @click="logXSSInUrl()" class="console-sandbox__btn console-sandbox__btn--error">XSS in URL</button>
        <button @click="logXSSError()" class="console-sandbox__btn console-sandbox__btn--error">XSS Error</button>
      </div>
    </div>

    <!-- CSS-based XSS -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.css = !xssSections.css">
        <span class="console-sandbox__toggle-icon">{{ xssSections.css ? '▼' : '▶' }}</span>
        CSS-based XSS
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.css">
        <button @click="logXSSCssExpression()" class="console-sandbox__btn console-sandbox__btn--error">CSS Expression</button>
        <button @click="logXSSCssUrl()" class="console-sandbox__btn console-sandbox__btn--error">CSS URL</button>
        <button @click="logXSSCssImport()" class="console-sandbox__btn console-sandbox__btn--error">CSS Import</button>
      </div>
    </div>

    <!-- Advanced Event Handlers -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.events = !xssSections.events">
        <span class="console-sandbox__toggle-icon">{{ xssSections.events ? '▼' : '▶' }}</span>
        Advanced Event Handlers
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.events">
        <button @click="logXSSOnMouseOver()" class="console-sandbox__btn console-sandbox__btn--error">onmouseover</button>
        <button @click="logXSSOnKeyPress()" class="console-sandbox__btn console-sandbox__btn--error">onkeypress</button>
        <button @click="logXSSOnBlur()" class="console-sandbox__btn console-sandbox__btn--error">onblur</button>
        <button @click="logXSSOnContextMenu()" class="console-sandbox__btn console-sandbox__btn--error">oncontextmenu</button>
        <button @click="logXSSOnDoubleClick()" class="console-sandbox__btn console-sandbox__btn--error">ondblclick</button>
      </div>
    </div>

    <!-- Frame/Iframe XSS -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.frames = !xssSections.frames">
        <span class="console-sandbox__toggle-icon">{{ xssSections.frames ? '▼' : '▶' }}</span>
        Frame/Iframe XSS
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.frames">
        <button @click="logXSSIframeSrc()" class="console-sandbox__btn console-sandbox__btn--error">Iframe src</button>
        <button @click="logXSSFrameSrc()" class="console-sandbox__btn console-sandbox__btn--error">Frame src</button>
        <button @click="logXSSEmbedSrc()" class="console-sandbox__btn console-sandbox__btn--error">Embed src</button>
        <button @click="logXSSObjectData()" class="console-sandbox__btn console-sandbox__btn--error">Object data</button>
      </div>
    </div>

    <!-- Meta/Link XSS -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.meta = !xssSections.meta">
        <span class="console-sandbox__toggle-icon">{{ xssSections.meta ? '▼' : '▶' }}</span>
        Meta/Link XSS
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.meta">
        <button @click="logXSSMetaRefresh()" class="console-sandbox__btn console-sandbox__btn--error">Meta refresh</button>
        <button @click="logXSSLinkHref()" class="console-sandbox__btn console-sandbox__btn--error">Link href</button>
        <button @click="logXSSAnchorHref()" class="console-sandbox__btn console-sandbox__btn--error">Anchor href</button>
      </div>
    </div>

    <!-- Form XSS -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.forms = !xssSections.forms">
        <span class="console-sandbox__toggle-icon">{{ xssSections.forms ? '▼' : '▶' }}</span>
        Form XSS
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.forms">
        <button @click="logXSSFormAction()" class="console-sandbox__btn console-sandbox__btn--error">Form action</button>
        <button @click="logXSSInputFormaction()" class="console-sandbox__btn console-sandbox__btn--error">Input formaction</button>
      </div>
    </div>

    <!-- Advanced URL Schemes -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.urls = !xssSections.urls">
        <span class="console-sandbox__toggle-icon">{{ xssSections.urls ? '▼' : '▶' }}</span>
        Advanced URL Schemes
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.urls">
        <button @click="logXSSDataUrlWithBase64()" class="console-sandbox__btn console-sandbox__btn--error">Data URL Base64</button>
        <button @click="logXSSDataUrlWithCharset()" class="console-sandbox__btn console-sandbox__btn--error">Data URL Charset</button>
        <button @click="logXSSFileUrl()" class="console-sandbox__btn console-sandbox__btn--error">File URL</button>
        <button @click="logXSSFtpUrl()" class="console-sandbox__btn console-sandbox__btn--error">FTP URL</button>
      </div>
    </div>

    <!-- Unicode and Encoding -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.encoding = !xssSections.encoding">
        <span class="console-sandbox__toggle-icon">{{ xssSections.encoding ? '▼' : '▶' }}</span>
        Unicode and Encoding Variations
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.encoding">
        <button @click="logXSSUnicodeHex()" class="console-sandbox__btn console-sandbox__btn--error">Unicode Hex</button>
        <button @click="logXSSUnicodeDecimal()" class="console-sandbox__btn console-sandbox__btn--error">Unicode Decimal</button>
        <button @click="logXSSUnicodeMixed()" class="console-sandbox__btn console-sandbox__btn--error">Unicode Mixed</button>
        <button @click="logXSSUrlEncoded()" class="console-sandbox__btn console-sandbox__btn--error">URL Encoded</button>
        <button @click="logXSSDoubleEncoded()" class="console-sandbox__btn console-sandbox__btn--error">Double Encoded</button>
      </div>
    </div>

    <!-- Template Literals -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.templates = !xssSections.templates">
        <span class="console-sandbox__toggle-icon">{{ xssSections.templates ? '▼' : '▶' }}</span>
        Template Literals and String Interpolation
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.templates">
        <button @click="logXSSTemplateLiteral()" class="console-sandbox__btn console-sandbox__btn--error">Template Literal</button>
        <button @click="logXSSStringInterpolation()" class="console-sandbox__btn console-sandbox__btn--error">String Interpolation</button>
      </div>
    </div>

    <!-- Complex Objects -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.objects = !xssSections.objects">
        <span class="console-sandbox__toggle-icon">{{ xssSections.objects ? '▼' : '▶' }}</span>
        Complex Objects and Nesting
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.objects">
        <button @click="logXSSNestedArray()" class="console-sandbox__btn console-sandbox__btn--error">Nested Array</button>
        <button @click="logXSSNestedObject()" class="console-sandbox__btn console-sandbox__btn--error">Nested Object</button>
        <button @click="logXSSMixedData()" class="console-sandbox__btn console-sandbox__btn--error">Mixed Data</button>
      </div>
    </div>

    <!-- Functions and Classes -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.functions = !xssSections.functions">
        <span class="console-sandbox__toggle-icon">{{ xssSections.functions ? '▼' : '▶' }}</span>
        Functions and Classes
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.functions">
        <button @click="logXSSFunctionName()" class="console-sandbox__btn console-sandbox__btn--error">Function Name</button>
        <button @click="logXSSSymbolKey()" class="console-sandbox__btn console-sandbox__btn--error">Symbol Key</button>
        <button @click="logXSSProxyObject()" class="console-sandbox__btn console-sandbox__btn--error">Proxy Object</button>
        <button @click="logXSSGeneratorFunction()" class="console-sandbox__btn console-sandbox__btn--error">Generator Function</button>
        <button @click="logXSSAsyncFunction()" class="console-sandbox__btn console-sandbox__btn--error">Async Function</button>
        <button @click="logXSSMaliciousClass()" class="console-sandbox__btn console-sandbox__btn--error">Malicious Class</button>
      </div>
    </div>

    <!-- Collections -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.collections = !xssSections.collections">
        <span class="console-sandbox__toggle-icon">{{ xssSections.collections ? '▼' : '▶' }}</span>
        Collections (Map, Set, TypedArray)
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.collections">
        <button @click="logXSSMaliciousMap()" class="console-sandbox__btn console-sandbox__btn--error">Malicious Map</button>
        <button @click="logXSSMaliciousSet()" class="console-sandbox__btn console-sandbox__btn--error">Malicious Set</button>
        <button @click="logXSSMaliciousTypedArray()" class="console-sandbox__btn console-sandbox__btn--error">Malicious TypedArray</button>
      </div>
    </div>

    <!-- Built-in Objects -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.builtins = !xssSections.builtins">
        <span class="console-sandbox__toggle-icon">{{ xssSections.builtins ? '▼' : '▶' }}</span>
        Built-in Objects
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.builtins">
        <button @click="logXSSMaliciousDate()" class="console-sandbox__btn console-sandbox__btn--error">Malicious Date</button>
        <button @click="logXSSMaliciousRegExp()" class="console-sandbox__btn console-sandbox__btn--error">Malicious RegExp</button>
        <button @click="logXSSMaliciousErrorStack()" class="console-sandbox__btn console-sandbox__btn--error">Malicious Error Stack</button>
      </div>
    </div>

    <!-- Advanced Patterns -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="xssSections.patterns = !xssSections.patterns">
        <span class="console-sandbox__toggle-icon">{{ xssSections.patterns ? '▼' : '▶' }}</span>
        Advanced Patterns
      </h3>
      <div class="console-sandbox__button-grid" v-show="xssSections.patterns">
        <button @click="logXSSCircularXSS()" class="console-sandbox__btn console-sandbox__btn--error">Circular XSS</button>
        <button @click="logXSSDeepNestedXSS()" class="console-sandbox__btn console-sandbox__btn--error">Deep Nested XSS</button>
        <button @click="logXSSMaliciousArrayMethods()" class="console-sandbox__btn console-sandbox__btn--error">Malicious Array Methods</button>
        <button @click="logXSSMaliciousPrototype()" class="console-sandbox__btn console-sandbox__btn--error">Malicious Prototype</button>
      </div>
    </div>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';
import { xssTestCases } from '../xssTestCases.js';

export default {
  name: 'XssTestCasesSection',
  components: {
    ConsoleSandboxSection
  },
  props: {
    selectedMethod: {
      type: String,
      required: true
    }
  },
  data() {
    return {
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
    allXssSectionsExpanded() {
      return Object.values(this.xssSections).every(section => section);
    }
  },
  methods: {
    // HTML/Script Tags
    logXSSScriptTag() {
      logWithMethod(this.selectedMethod, xssTestCases.scriptTag());
    },
    logXSSImgOnError() {
      logWithMethod(this.selectedMethod, xssTestCases.imgOnError());
    },
    logXSSSvgOnLoad() {
      logWithMethod(this.selectedMethod, xssTestCases.svgOnLoad());
    },
    logXSSJavaScriptUrl() {
      logWithMethod(this.selectedMethod, xssTestCases.javascriptUrl());
    },
    
    // Event Handlers
    logXSSOnClick() {
      logWithMethod(this.selectedMethod, xssTestCases.onClick());
    },
    logXSSOnLoad() {
      logWithMethod(this.selectedMethod, xssTestCases.onLoad());
    },
    logXSSOnFocus() {
      logWithMethod(this.selectedMethod, xssTestCases.onFocus());
    },
    
    // URL Schemes
    logXSSDataUrl() {
      logWithMethod(this.selectedMethod, xssTestCases.dataUrl());
    },
    logXSSVBScript() {
      logWithMethod(this.selectedMethod, xssTestCases.vbScript());
    },
    
    // Object Properties
    logXSSObjectMalicious() {
      logWithMethod(this.selectedMethod, xssTestCases.maliciousObject());
    },
    logXSSObjectHtml() {
      logWithMethod(this.selectedMethod, xssTestCases.htmlObject());
    },
    logXSSDOMElement() {
      logWithMethod(this.selectedMethod, xssTestCases.createMaliciousElement());
    },
    
    // Length & Encoding
    logXSSLongPayload() {
      logWithMethod(this.selectedMethod, xssTestCases.longPayload());
    },
    logXSSUnicode() {
      logWithMethod(this.selectedMethod, xssTestCases.unicode());
    },
    logXSSHtmlEntities() {
      logWithMethod(this.selectedMethod, xssTestCases.htmlEntities());
    },
    
    // PII & Errors
    logXSSWithPII() {
      logWithMethod(this.selectedMethod, xssTestCases.withPii());
    },
    logXSSInUrl() {
      logWithMethod(this.selectedMethod, xssTestCases.inUrl());
    },
    logXSSError() {
      logWithMethod(this.selectedMethod, xssTestCases.createMaliciousError());
    },
    
    // Additional XSS Test Cases - CSS-based
    logXSSCssExpression() {
      logWithMethod(this.selectedMethod, xssTestCases.cssExpression());
    },
    logXSSCssUrl() {
      logWithMethod(this.selectedMethod, xssTestCases.cssUrl());
    },
    logXSSCssImport() {
      logWithMethod(this.selectedMethod, xssTestCases.cssImport());
    },
    
    // Additional XSS Test Cases - Advanced Event Handlers
    logXSSOnMouseOver() {
      logWithMethod(this.selectedMethod, xssTestCases.onMouseOver());
    },
    logXSSOnKeyPress() {
      logWithMethod(this.selectedMethod, xssTestCases.onKeyPress());
    },
    logXSSOnBlur() {
      logWithMethod(this.selectedMethod, xssTestCases.onBlur());
    },
    logXSSOnContextMenu() {
      logWithMethod(this.selectedMethod, xssTestCases.onContextMenu());
    },
    logXSSOnDoubleClick() {
      logWithMethod(this.selectedMethod, xssTestCases.onDoubleClick());
    },
    
    // Additional XSS Test Cases - Frame/Iframe
    logXSSIframeSrc() {
      logWithMethod(this.selectedMethod, xssTestCases.iframeSrc());
    },
    logXSSFrameSrc() {
      logWithMethod(this.selectedMethod, xssTestCases.frameSrc());
    },
    logXSSEmbedSrc() {
      logWithMethod(this.selectedMethod, xssTestCases.embedSrc());
    },
    logXSSObjectData() {
      logWithMethod(this.selectedMethod, xssTestCases.objectData());
    },
    
    // Additional XSS Test Cases - Meta/Link
    logXSSMetaRefresh() {
      logWithMethod(this.selectedMethod, xssTestCases.metaRefresh());
    },
    logXSSLinkHref() {
      logWithMethod(this.selectedMethod, xssTestCases.linkHref());
    },
    logXSSAnchorHref() {
      logWithMethod(this.selectedMethod, xssTestCases.anchorHref());
    },
    
    // Additional XSS Test Cases - Form
    logXSSFormAction() {
      logWithMethod(this.selectedMethod, xssTestCases.formAction());
    },
    logXSSInputFormaction() {
      logWithMethod(this.selectedMethod, xssTestCases.inputFormaction());
    },
    
    // Additional XSS Test Cases - Advanced URL Schemes
    logXSSDataUrlWithBase64() {
      logWithMethod(this.selectedMethod, xssTestCases.dataUrlWithBase64());
    },
    logXSSDataUrlWithCharset() {
      logWithMethod(this.selectedMethod, xssTestCases.dataUrlWithCharset());
    },
    logXSSFileUrl() {
      logWithMethod(this.selectedMethod, xssTestCases.fileUrl());
    },
    logXSSFtpUrl() {
      logWithMethod(this.selectedMethod, xssTestCases.ftpUrl());
    },
    
    // Additional XSS Test Cases - Unicode and Encoding
    logXSSUnicodeHex() {
      logWithMethod(this.selectedMethod, xssTestCases.unicodeHex());
    },
    logXSSUnicodeDecimal() {
      logWithMethod(this.selectedMethod, xssTestCases.unicodeDecimal());
    },
    logXSSUnicodeMixed() {
      logWithMethod(this.selectedMethod, xssTestCases.unicodeMixed());
    },
    logXSSUrlEncoded() {
      logWithMethod(this.selectedMethod, xssTestCases.urlEncoded());
    },
    logXSSDoubleEncoded() {
      logWithMethod(this.selectedMethod, xssTestCases.doubleEncoded());
    },
    
    // Additional XSS Test Cases - Template Literals
    logXSSTemplateLiteral() {
      logWithMethod(this.selectedMethod, xssTestCases.templateLiteral());
    },
    logXSSStringInterpolation() {
      logWithMethod(this.selectedMethod, xssTestCases.stringInterpolation());
    },
    
    // Additional XSS Test Cases - Complex Objects
    logXSSNestedArray() {
      logWithMethod(this.selectedMethod, xssTestCases.nestedArray());
    },
    logXSSNestedObject() {
      logWithMethod(this.selectedMethod, xssTestCases.nestedObject());
    },
    logXSSMixedData() {
      logWithMethod(this.selectedMethod, xssTestCases.mixedData());
    },
    
    // Additional XSS Test Cases - Functions and Classes
    logXSSFunctionName() {
      logWithMethod(this.selectedMethod, xssTestCases.functionName());
    },
    logXSSSymbolKey() {
      logWithMethod(this.selectedMethod, xssTestCases.symbolKey());
    },
    logXSSProxyObject() {
      logWithMethod(this.selectedMethod, xssTestCases.proxyObject());
    },
    logXSSGeneratorFunction() {
      logWithMethod(this.selectedMethod, xssTestCases.generatorFunction());
    },
    logXSSAsyncFunction() {
      logWithMethod(this.selectedMethod, xssTestCases.asyncFunction());
    },
    logXSSMaliciousClass() {
      logWithMethod(this.selectedMethod, xssTestCases.maliciousClass());
    },
    
    // Additional XSS Test Cases - Collections
    logXSSMaliciousMap() {
      logWithMethod(this.selectedMethod, xssTestCases.maliciousMap());
    },
    logXSSMaliciousSet() {
      logWithMethod(this.selectedMethod, xssTestCases.maliciousSet());
    },
    logXSSMaliciousTypedArray() {
      logWithMethod(this.selectedMethod, xssTestCases.maliciousTypedArray());
    },
    
    // Additional XSS Test Cases - Built-in Objects
    logXSSMaliciousDate() {
      logWithMethod(this.selectedMethod, xssTestCases.maliciousDate());
    },
    logXSSMaliciousRegExp() {
      logWithMethod(this.selectedMethod, xssTestCases.maliciousRegExp());
    },
    logXSSMaliciousErrorStack() {
      logWithMethod(this.selectedMethod, xssTestCases.maliciousErrorStack());
    },
    
    // Additional XSS Test Cases - Advanced Patterns
    logXSSCircularXSS() {
      logWithMethod(this.selectedMethod, xssTestCases.circularXSS());
    },
    logXSSDeepNestedXSS() {
      logWithMethod(this.selectedMethod, xssTestCases.deepNestedXSS());
    },
    logXSSMaliciousArrayMethods() {
      const maliciousArray = xssTestCases.maliciousArrayMethods();
      logWithMethod(this.selectedMethod, maliciousArray.toString());
      logWithMethod(this.selectedMethod, maliciousArray.join(''));
    },
    logXSSMaliciousPrototype() {
      logWithMethod(this.selectedMethod, xssTestCases.maliciousPrototype());
    },
    
    // Toggle all XSS sections
    toggleAllXssSections() {
      const shouldExpand = !this.allXssSectionsExpanded;
      Object.keys(this.xssSections).forEach(key => {
        this.xssSections[key] = shouldExpand;
      });
    }
  }
};
</script>