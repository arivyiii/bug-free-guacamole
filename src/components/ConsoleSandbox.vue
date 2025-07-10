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
            <option value="all">All Types</option>
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

                    <!-- Console Styling Section -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">Console Styling</h2>
              <button @click="toggleAllStylingSections" class="btn btn-toggle">
                {{ allStylingSectionsExpanded ? 'Collapse All' : 'Show All' }}
              </button>
            </div>
            
            <!-- Text Styling -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="stylingSections.text = !stylingSections.text">
                <span class="toggle-icon">{{ stylingSections.text ? '▼' : '▶' }}</span>
                Text Styling (Font, Weight, Style, Transform)
              </h3>
              <div class="button-grid" v-show="stylingSections.text">
                <button @click="logStyledBold()" class="btn">Bold Text</button>
                <button @click="logStyledItalic()" class="btn">Italic Text</button>
                <button @click="logStyledUnderline()" class="btn">Underlined Text</button>
                <button @click="logStyledStrikethrough()" class="btn">Strikethrough</button>
                <button @click="logStyledUppercase()" class="btn">Uppercase</button>
                <button @click="logStyledMonospace()" class="btn">Monospace</button>
              </div>
            </div>

            <!-- Text Colors -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="stylingSections.colors = !stylingSections.colors">
                <span class="toggle-icon">{{ stylingSections.colors ? '▼' : '▶' }}</span>
                Text Colors
              </h3>
              <div class="button-grid" v-show="stylingSections.colors">
                <button @click="logColorNormal()" class="btn">Normal Color</button>
                <button @click="logColorSuccess()" class="btn">Success Color</button>
                <button @click="logColorWarning()" class="btn">Warning Color</button>
                <button @click="logColorError()" class="btn">Error Color</button>
                <button @click="logColorInfo()" class="btn">Info Color</button>
                <button @click="logColorDebug()" class="btn">Debug Color</button>
              </div>
            </div>

            <!-- Font Sizes -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="stylingSections.fontSizes = !stylingSections.fontSizes">
                <span class="toggle-icon">{{ stylingSections.fontSizes ? '▼' : '▶' }}</span>
                Font Sizes
              </h3>
              <div class="button-grid" v-show="stylingSections.fontSizes">
                <button @click="logFontSmall()" class="btn">Small Text</button>
                <button @click="logFontNormal()" class="btn">Normal Text</button>
                <button @click="logFontLarge()" class="btn">Large Text</button>
                <button @click="logFontExtraLarge()" class="btn">Extra Large</button>
                <button @click="logFontHuge()" class="btn">Huge Text</button>
                <button @click="logFontMassive()" class="btn">Massive Text</button>
              </div>
            </div>

            <!-- Borders -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="stylingSections.borders = !stylingSections.borders">
                <span class="toggle-icon">{{ stylingSections.borders ? '▼' : '▶' }}</span>
                Borders
              </h3>
              <div class="button-grid" v-show="stylingSections.borders">
                <button @click="logBorderSolid()" class="btn">Solid Border</button>
                <button @click="logBorderDashed()" class="btn">Dashed Border</button>
                <button @click="logBorderDotted()" class="btn">Dotted Border</button>
                <button @click="logBorderDouble()" class="btn">Double Border</button>
                <button @click="logBorderRounded()" class="btn">Rounded Border</button>
                <button @click="logBorderThick()" class="btn">Thick Border</button>
              </div>
            </div>

            <!-- Shadows -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="stylingSections.shadows = !stylingSections.shadows">
                <span class="toggle-icon">{{ stylingSections.shadows ? '▼' : '▶' }}</span>
                Text Shadows
              </h3>
              <div class="button-grid" v-show="stylingSections.shadows">
                <button @click="logShadowBasic()" class="btn">Shadow Text</button>
                <button @click="logShadowGlow()" class="btn">Glow Effect</button>
                <button @click="logShadowMultiple()" class="btn">Multiple Shadows</button>
                <button @click="logShadowOutlined()" class="btn">Outlined Text</button>
                <button @click="logShadowNeon()" class="btn">Neon Effect</button>
                <button @click="logShadowDrop()" class="btn">Drop Shadow</button>
              </div>
            </div>

            <!-- Background Colors -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="stylingSections.backgrounds = !stylingSections.backgrounds">
                <span class="toggle-icon">{{ stylingSections.backgrounds ? '▼' : '▶' }}</span>
                Background Colors
              </h3>
              <div class="button-grid" v-show="stylingSections.backgrounds">
                <button @click="logBgNormal()" class="btn">Normal Background</button>
                <button @click="logBgSuccess()" class="btn">Success Background</button>
                <button @click="logBgWarning()" class="btn">Warning Background</button>
                <button @click="logBgError()" class="btn">Error Background</button>
                <button @click="logBgInfo()" class="btn">Info Background</button>
                <button @click="logBgDebug()" class="btn">Debug Background</button>
              </div>
            </div>

            <!-- Gradients -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="stylingSections.gradients = !stylingSections.gradients">
                <span class="toggle-icon">{{ stylingSections.gradients ? '▼' : '▶' }}</span>
                Gradients
              </h3>
              <div class="button-grid" v-show="stylingSections.gradients">
                <button @click="logGradientText()" class="btn">Gradient Text</button>
                <button @click="logGradientRainbow()" class="btn">Rainbow Text</button>
                <button @click="logGradientBlue()" class="btn">Blue Gradient</button>
                <button @click="logGradientGreen()" class="btn">Green Gradient</button>
                <button @click="logGradientOrange()" class="btn">Orange Gradient</button>
                <button @click="logGradientRed()" class="btn">Red Gradient</button>
              </div>
            </div>

            <!-- Animations -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="stylingSections.animations = !stylingSections.animations">
                <span class="toggle-icon">{{ stylingSections.animations ? '▼' : '▶' }}</span>
                Animations
              </h3>
              <div class="button-grid" v-show="stylingSections.animations">
                <button @click="logAnimationPulse()" class="btn">Pulse Animation</button>
                <button @click="logAnimationBounce()" class="btn">Bounce Animation</button>
                <button @click="logAnimationFade()" class="btn">Fade Animation</button>
                <button @click="logAnimationRotate()" class="btn">Rotate Animation</button>
                <button @click="logAnimationSlide()" class="btn">Slide Animation</button>
                <button @click="logAnimationScale()" class="btn">Scale Animation</button>
              </div>
            </div>

            <!-- Emojis -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="stylingSections.emojis = !stylingSections.emojis">
                <span class="toggle-icon">{{ stylingSections.emojis ? '▼' : '▶' }}</span>
                Emojis
              </h3>
              <div class="button-grid" v-show="stylingSections.emojis">
                <button @click="logEmojiLaunch()" class="btn">🚀 Launch</button>
                <button @click="logEmojiSuccess()" class="btn">✨ Success</button>
                <button @click="logEmojiWarning()" class="btn">⚠️ Warning</button>
                <button @click="logEmojiError()" class="btn">💥 Error</button>
                <button @click="logEmojiInfo()" class="btn">ℹ️ Info</button>
                <button @click="logEmojiDebug()" class="btn">🐞 Debug</button>
              </div>
            </div>

            <!-- Icons -->
            <div class="xss-subsection">
              <h3 class="subsection-title" @click="stylingSections.icons = !stylingSections.icons">
                <span class="toggle-icon">{{ stylingSections.icons ? '▼' : '▶' }}</span>
                Icons
              </h3>
              <div class="button-grid" v-show="stylingSections.icons">
                <button @click="logIconSettings()" class="btn">🔧 Settings</button>
                <button @click="logIconSuccess()" class="btn">✅ Success</button>
                <button @click="logIconWarning()" class="btn">⚠️ Warning</button>
                <button @click="logIconError()" class="btn">❌ Error</button>
                <button @click="logIconInfo()" class="btn">ℹ️ Information</button>
                <button @click="logIconBug()" class="btn">🐛 Bug Report</button>
              </div>
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
      },
      // Styling section collapse states
      stylingSections: {
        text: false,
        colors: false,
        fontSizes: false,
        borders: false,
        shadows: false,
        backgrounds: false,
        gradients: false,
        animations: false,
        emojis: false,
        icons: false
      }
    };
  },
  computed: {
    isProduction() {
      return process.env.NODE_ENV === 'production';
    },
    allXssSectionsExpanded() {
      return Object.values(this.xssSections).every(expanded => expanded);
    },
    allStylingSectionsExpanded() {
      return Object.values(this.stylingSections).every(expanded => expanded);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // Helper function to log with all console methods when 'all' is selected
    logWithAllMethods(...args) {
      if (this.selectedMethod === 'all') {
        console.info(...args);
        console.warn(...args);
        console.error(...args);
      } else {
        console[this.selectedMethod](...args);
      }
    },
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
      if (this.selectedMethod === 'all') {
        console.log(`[${type}]`, value);
        console.info(`[${type}]`, value);
        console.warn(`[${type}]`, value);
        console.error(`[${type}]`, value);
        console.debug(`[${type}]`, value);
      } else {
        console[this.selectedMethod](`[${type}]`, value);
      }
    },
    logObject(obj) {
      if (this.selectedMethod === 'all') {
        console.log('Object:', obj);
        console.info('Object:', obj);
        console.warn('Object:', obj);
        console.error('Object:', obj);
        console.debug('Object:', obj);
      } else {
        console[this.selectedMethod]('Object:', obj);
      }
    },
    logArray(arr) {
      if (this.selectedMethod === 'all') {
        console.log('Array:', arr);
        console.info('Array:', arr);
        console.warn('Array:', arr);
        console.error('Array:', arr);
        console.debug('Array:', arr);
      } else {
        console[this.selectedMethod]('Array:', arr);
      }
    },
    logSet() {
      const set = new Set([1, 2, 3, 4, 5]);
      if (this.selectedMethod === 'all') {
        console.log('Set:', set);
        console.info('Set:', set);
        console.warn('Set:', set);
        console.error('Set:', set);
        console.debug('Set:', set);
      } else {
        console[this.selectedMethod]('Set:', set);
      }
    },
    logWeakSet() {
      const obj1 = {};
      const obj2 = {};
      const weakSet = new WeakSet([obj1, obj2]);
      if (this.selectedMethod === 'all') {
        console.log('WeakSet:', weakSet);
        console.info('WeakSet:', weakSet);
        console.warn('WeakSet:', weakSet);
        console.error('WeakSet:', weakSet);
        console.debug('WeakSet:', weakSet);
      } else {
        console[this.selectedMethod]('WeakSet:', weakSet);
      }
    },
    logMap() {
      const map = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ]);
      if (this.selectedMethod === 'all') {
        console.log('Map:', map);
        console.info('Map:', map);
        console.warn('Map:', map);
        console.error('Map:', map);
        console.debug('Map:', map);
      } else {
        console[this.selectedMethod]('Map:', map);
      }
    },
    logWeakMap() {
      const obj1 = {};
      const obj2 = {};
      const weakMap = new WeakMap([[obj1, 'foo'], [obj2, 'bar']]);
      if (this.selectedMethod === 'all') {
        console.log('WeakMap:', weakMap);
        console.info('WeakMap:', weakMap);
        console.warn('WeakMap:', weakMap);
        console.error('WeakMap:', weakMap);
        console.debug('WeakMap:', weakMap);
      } else {
        console[this.selectedMethod]('WeakMap:', weakMap);
      }
    },
    logRegExp() {
      const regex = /abc/i;
      if (this.selectedMethod === 'all') {
        console.log('RegExp:', regex);
        console.info('RegExp:', regex);
        console.warn('RegExp:', regex);
        console.error('RegExp:', regex);
        console.debug('RegExp:', regex);
      } else {
        console[this.selectedMethod]('RegExp:', regex);
      }
    },
    logArrayBuffer() {
      const buffer = new ArrayBuffer(8);
      if (this.selectedMethod === 'all') {
        console.log('ArrayBuffer:', buffer);
        console.info('ArrayBuffer:', buffer);
        console.warn('ArrayBuffer:', buffer);
        console.error('ArrayBuffer:', buffer);
        console.debug('ArrayBuffer:', buffer);
      } else {
        console[this.selectedMethod]('ArrayBuffer:', buffer);
      }
    },
    logDataView() {
      const buffer = new ArrayBuffer(8);
      const view = new DataView(buffer);
      if (this.selectedMethod === 'all') {
        console.log('DataView:', view);
        console.info('DataView:', view);
        console.warn('DataView:', view);
        console.error('DataView:', view);
        console.debug('DataView:', view);
      } else {
        console[this.selectedMethod]('DataView:', view);
      }
    },
    logTypedArray() {
      const arr = new Uint8Array([1, 2, 3, 4]);
      if (this.selectedMethod === 'all') {
        console.log('Uint8Array:', arr);
        console.info('Uint8Array:', arr);
        console.warn('Uint8Array:', arr);
        console.error('Uint8Array:', arr);
        console.debug('Uint8Array:', arr);
      } else {
        console[this.selectedMethod]('Uint8Array:', arr);
      }
    },
    logResolvedPromise() {
      const promise = Promise.resolve('resolved value');
      if (this.selectedMethod === 'all') {
        console.log('Resolved Promise:', promise);
        console.info('Resolved Promise:', promise);
        console.warn('Resolved Promise:', promise);
        console.error('Resolved Promise:', promise);
        console.debug('Resolved Promise:', promise);
      } else {
        console[this.selectedMethod]('Resolved Promise:', promise);
      }
    },
    logPendingPromise() {
      const promise = new Promise(() => {});
      if (this.selectedMethod === 'all') {
        console.log('Pending Promise:', promise);
        console.info('Pending Promise:', promise);
        console.warn('Pending Promise:', promise);
        console.error('Pending Promise:', promise);
        console.debug('Pending Promise:', promise);
      } else {
        console[this.selectedMethod]('Pending Promise:', promise);
      }
    },
    logRejectedPromise() {
      try {
        const promise = Promise.reject('rejected value');
        if (this.selectedMethod === 'all') {
          console.log('Rejected Promise:', promise);
          console.info('Rejected Promise:', promise);
          console.warn('Rejected Promise:', promise);
          console.error('Rejected Promise:', promise);
          console.debug('Rejected Promise:', promise);
        } else {
          console[this.selectedMethod]('Rejected Promise:', promise);
        }
      } catch (e) {
        console.error('Caught error from rejected promise:', e);
      }
    },
    logFunction(fn) {
      if (this.selectedMethod === 'all') {
        console.log('Function:', fn);
        console.info('Function:', fn);
        console.warn('Function:', fn);
        console.error('Function:', fn);
        console.debug('Function:', fn);
      } else {
        console[this.selectedMethod]('Function:', fn);
      }
    },
    logError(err) {
      if (this.selectedMethod === 'all') {
        console.log('Error:', err);
        console.info('Error:', err);
        console.warn('Error:', err);
        console.error('Error:', err);
        console.debug('Error:', err);
      } else {
        console.error('Error:', err);
      }
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
      if (this.selectedMethod === 'all') {
        console.log('Deeply Nested DOM Element:', container);
        console.info('Deeply Nested DOM Element:', container);
        console.warn('Deeply Nested DOM Element:', container);
        console.error('Deeply Nested DOM Element:', container);
        console.debug('Deeply Nested DOM Element:', container);
      } else {
        console[this.selectedMethod]('Deeply Nested DOM Element:', container);
      }
    },
    logIframe() {
      if (!this.iframe) {
        this.iframe = document.createElement('iframe');
        this.iframe.src = 'about:blank';
        document.getElementById('iframe-container').appendChild(this.iframe);
      }
      if (this.selectedMethod === 'all') {
        console.log('Iframe:', this.iframe);
        console.info('Iframe:', this.iframe);
        console.warn('Iframe:', this.iframe);
        console.error('Iframe:', this.iframe);
        console.debug('Iframe:', this.iframe);
      } else {
        console[this.selectedMethod]('Iframe:', this.iframe);
      }
    },
    logDeduped(message, count) {
      for (let i = 0; i < count; i++) {
        if (this.selectedMethod === 'all') {
          console.log(message);
          console.info(message);
          console.warn(message);
          console.error(message);
          console.debug(message);
        } else {
          console[this.selectedMethod](message);
        }
      }
    },
    logAllTypes(message) {
      if (this.selectedMethod === 'all') {
        console.log(message);
        console.info(message);
        console.warn(message);
        console.error(message);
        console.debug(message);
      } else {
        console.log(message);
        console.info(message);
        console.warn(message);
        console.error(message);
      }
    },
    logCircularReference() {
      const obj = {};
      obj.self = obj;
      if (this.selectedMethod === 'all') {
        console.log('Circular Reference:', obj);
        console.info('Circular Reference:', obj);
        console.warn('Circular Reference:', obj);
        console.error('Circular Reference:', obj);
        console.debug('Circular Reference:', obj);
      } else {
        console[this.selectedMethod]('Circular Reference:', obj);
      }
    },
    logDate() {
      const date = new Date();
      if (this.selectedMethod === 'all') {
        console.log('Date:', date);
        console.info('Date:', date);
        console.warn('Date:', date);
        console.error('Date:', date);
        console.debug('Date:', date);
      } else {
        console[this.selectedMethod]('Date:', date);
      }
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
        if (this.selectedMethod === 'all') {
          console.log('Large Object:', largeObject);
          console.info('Large Object:', largeObject);
          console.warn('Large Object:', largeObject);
          console.error('Large Object:', largeObject);
          console.debug('Large Object:', largeObject);
        } else {
          console[this.selectedMethod]('Large Object:', largeObject);
        }
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
      if (this.selectedMethod === 'all') {
        console.log('Faker User:', user);
        console.info('Faker User:', user);
        console.warn('Faker User:', user);
        console.error('Faker User:', user);
        console.debug('Faker User:', user);
      } else {
        console[this.selectedMethod]('Faker User:', user);
      }
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
      if (this.selectedMethod === 'all') {
        console.log('Faker Company:', company);
        console.info('Faker Company:', company);
        console.warn('Faker Company:', company);
        console.error('Faker Company:', company);
        console.debug('Faker Company:', company);
      } else {
        console[this.selectedMethod]('Faker Company:', company);
      }
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
      if (this.selectedMethod === 'all') {
        console.log('Faker Address:', address);
        console.info('Faker Address:', address);
        console.warn('Faker Address:', address);
        console.error('Faker Address:', address);
        console.debug('Faker Address:', address);
      } else {
        console[this.selectedMethod]('Faker Address:', address);
      }
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
      if (this.selectedMethod === 'all') {
        console.log('Faker Product:', product);
        console.info('Faker Product:', product);
        console.warn('Faker Product:', product);
        console.error('Faker Product:', product);
        console.debug('Faker Product:', product);
      } else {
        console[this.selectedMethod]('Faker Product:', product);
      }
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
      if (this.selectedMethod === 'all') {
        console.log('Faker Order:', order);
        console.info('Faker Order:', order);
        console.warn('Faker Order:', order);
        console.error('Faker Order:', order);
        console.debug('Faker Order:', order);
      } else {
        console[this.selectedMethod]('Faker Order:', order);
      }
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
      if (this.selectedMethod === 'all') {
        console.log('Faker Users Array:', users);
        console.info('Faker Users Array:', users);
        console.warn('Faker Users Array:', users);
        console.error('Faker Users Array:', users);
        console.debug('Faker Users Array:', users);
      } else {
        console[this.selectedMethod]('Faker Users Array:', users);
      }
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
      if (this.selectedMethod === 'all') {
        console.log('Faker Products Array:', products);
        console.info('Faker Products Array:', products);
        console.warn('Faker Products Array:', products);
        console.error('Faker Products Array:', products);
        console.debug('Faker Products Array:', products);
      } else {
        console[this.selectedMethod]('Faker Products Array:', products);
      }
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
      if (this.selectedMethod === 'all') {
        console.log('Faker Mixed Data:', mixedData);
        console.info('Faker Mixed Data:', mixedData);
        console.warn('Faker Mixed Data:', mixedData);
        console.error('Faker Mixed Data:', mixedData);
        console.debug('Faker Mixed Data:', mixedData);
      } else {
        console[this.selectedMethod]('Faker Mixed Data:', mixedData);
      }
    },
    // HTML/Script Tags
    logXSSScriptTag() {
      if (this.selectedMethod === 'all') {
        console.log(xssTestCases.scriptTag());
        console.info(xssTestCases.scriptTag());
        console.warn(xssTestCases.scriptTag());
        console.error(xssTestCases.scriptTag());
        console.debug(xssTestCases.scriptTag());
      } else {
        console[this.selectedMethod](xssTestCases.scriptTag());
      }
    },
    logXSSImgOnError() {
      if (this.selectedMethod === 'all') {
        console.log(xssTestCases.imgOnError());
        console.info(xssTestCases.imgOnError());
        console.warn(xssTestCases.imgOnError());
        console.error(xssTestCases.imgOnError());
        console.debug(xssTestCases.imgOnError());
      } else {
        console[this.selectedMethod](xssTestCases.imgOnError());
      }
    },
    logXSSSvgOnLoad() {
      if (this.selectedMethod === 'all') {
        console.log(xssTestCases.svgOnLoad());
        console.info(xssTestCases.svgOnLoad());
        console.warn(xssTestCases.svgOnLoad());
        console.error(xssTestCases.svgOnLoad());
        console.debug(xssTestCases.svgOnLoad());
      } else {
        console[this.selectedMethod](xssTestCases.svgOnLoad());
      }
    },
    logXSSJavaScriptUrl() {
      if (this.selectedMethod === 'all') {
        console.log(xssTestCases.javascriptUrl());
        console.info(xssTestCases.javascriptUrl());
        console.warn(xssTestCases.javascriptUrl());
        console.error(xssTestCases.javascriptUrl());
        console.debug(xssTestCases.javascriptUrl());
      } else {
        console[this.selectedMethod](xssTestCases.javascriptUrl());
      }
    },
    
    // Event Handlers
    logXSSOnClick() {
      this.logWithAllMethods(xssTestCases.onClick());
    },
    logXSSOnLoad() {
      this.logWithAllMethods(xssTestCases.onLoad());
    },
    logXSSOnFocus() {
      this.logWithAllMethods(xssTestCases.onFocus());
    },
    
    // URL Schemes
    logXSSDataUrl() {
      this.logWithAllMethods(xssTestCases.dataUrl());
    },
    logXSSVBScript() {
      this.logWithAllMethods(xssTestCases.vbScript());
    },
    
    // Object Properties
    logXSSObjectMalicious() {
      this.logWithAllMethods(xssTestCases.maliciousObject());
    },
    logXSSObjectHtml() {
      this.logWithAllMethods(xssTestCases.htmlObject());
    },
    logXSSDOMElement() {
      this.logWithAllMethods(xssTestCases.createMaliciousElement());
    },
    
    // Length & Encoding
    logXSSLongPayload() {
      this.logWithAllMethods(xssTestCases.longPayload());
    },
    logXSSUnicode() {
      this.logWithAllMethods(xssTestCases.unicode());
    },
    logXSSHtmlEntities() {
      this.logWithAllMethods(xssTestCases.htmlEntities());
    },
    
    // PII & Errors
    logXSSWithPII() {
      this.logWithAllMethods(xssTestCases.withPii());
    },
    logXSSInUrl() {
      this.logWithAllMethods(xssTestCases.inUrl());
    },
    logXSSError() {
      if (this.selectedMethod === 'all') {
        console.log(xssTestCases.createMaliciousError());
        console.info(xssTestCases.createMaliciousError());
        console.warn(xssTestCases.createMaliciousError());
        console.error(xssTestCases.createMaliciousError());
        console.debug(xssTestCases.createMaliciousError());
      } else {
        console.error(xssTestCases.createMaliciousError());
      }
    },
    
    // Additional XSS Test Cases - CSS-based
    logXSSCssExpression() {
      this.logWithAllMethods(xssTestCases.cssExpression());
    },
    logXSSCssUrl() {
      this.logWithAllMethods(xssTestCases.cssUrl());
    },
    logXSSCssImport() {
      this.logWithAllMethods(xssTestCases.cssImport());
    },
    
    // Additional XSS Test Cases - Advanced Event Handlers
    logXSSOnMouseOver() {
      this.logWithAllMethods(xssTestCases.onMouseOver());
    },
    logXSSOnKeyPress() {
      this.logWithAllMethods(xssTestCases.onKeyPress());
    },
    logXSSOnBlur() {
      this.logWithAllMethods(xssTestCases.onBlur());
    },
    logXSSOnContextMenu() {
      this.logWithAllMethods(xssTestCases.onContextMenu());
    },
    logXSSOnDoubleClick() {
      this.logWithAllMethods(xssTestCases.onDoubleClick());
    },
    
    // Additional XSS Test Cases - Frame/Iframe
    logXSSIframeSrc() {
      this.logWithAllMethods(xssTestCases.iframeSrc());
    },
    logXSSFrameSrc() {
      this.logWithAllMethods(xssTestCases.frameSrc());
    },
    logXSSEmbedSrc() {
      this.logWithAllMethods(xssTestCases.embedSrc());
    },
    logXSSObjectData() {
      this.logWithAllMethods(xssTestCases.objectData());
    },
    
    // Additional XSS Test Cases - Meta/Link
    logXSSMetaRefresh() {
      this.logWithAllMethods(xssTestCases.metaRefresh());
    },
    logXSSLinkHref() {
      this.logWithAllMethods(xssTestCases.linkHref());
    },
    logXSSAnchorHref() {
      this.logWithAllMethods(xssTestCases.anchorHref());
    },
    
    // Additional XSS Test Cases - Form
    logXSSFormAction() {
      this.logWithAllMethods(xssTestCases.formAction());
    },
    logXSSInputFormaction() {
      this.logWithAllMethods(xssTestCases.inputFormaction());
    },
    
    // Additional XSS Test Cases - Advanced URL Schemes
    logXSSDataUrlWithBase64() {
      this.logWithAllMethods(xssTestCases.dataUrlWithBase64());
    },
    logXSSDataUrlWithCharset() {
      this.logWithAllMethods(xssTestCases.dataUrlWithCharset());
    },
    logXSSFileUrl() {
      this.logWithAllMethods(xssTestCases.fileUrl());
    },
    logXSSFtpUrl() {
      this.logWithAllMethods(xssTestCases.ftpUrl());
    },
    
    // Additional XSS Test Cases - Unicode and Encoding
    logXSSUnicodeHex() {
      this.logWithAllMethods(xssTestCases.unicodeHex());
    },
    logXSSUnicodeDecimal() {
      this.logWithAllMethods(xssTestCases.unicodeDecimal());
    },
    logXSSUnicodeMixed() {
      this.logWithAllMethods(xssTestCases.unicodeMixed());
    },
    logXSSUrlEncoded() {
      this.logWithAllMethods(xssTestCases.urlEncoded());
    },
    logXSSDoubleEncoded() {
      this.logWithAllMethods(xssTestCases.doubleEncoded());
    },
    
    // Additional XSS Test Cases - Template Literals
    logXSSTemplateLiteral() {
      this.logWithAllMethods(xssTestCases.templateLiteral());
    },
    logXSSStringInterpolation() {
      this.logWithAllMethods(xssTestCases.stringInterpolation());
    },
    
    // Additional XSS Test Cases - Complex Objects
    logXSSNestedArray() {
      this.logWithAllMethods(xssTestCases.nestedArray());
    },
    logXSSNestedObject() {
      this.logWithAllMethods(xssTestCases.nestedObject());
    },
    logXSSMixedData() {
      this.logWithAllMethods(xssTestCases.mixedData());
    },
    
    // Additional XSS Test Cases - Functions and Classes
    logXSSFunctionName() {
      this.logWithAllMethods(xssTestCases.functionName());
    },
    logXSSSymbolKey() {
      this.logWithAllMethods(xssTestCases.symbolKey());
    },
    logXSSProxyObject() {
      this.logWithAllMethods(xssTestCases.proxyObject());
    },
    logXSSGeneratorFunction() {
      this.logWithAllMethods(xssTestCases.generatorFunction());
    },
    logXSSAsyncFunction() {
      this.logWithAllMethods(xssTestCases.asyncFunction());
    },
    logXSSMaliciousClass() {
      this.logWithAllMethods(xssTestCases.maliciousClass());
    },
    
    // Additional XSS Test Cases - Collections
    logXSSMaliciousMap() {
      this.logWithAllMethods(xssTestCases.maliciousMap());
    },
    logXSSMaliciousSet() {
      this.logWithAllMethods(xssTestCases.maliciousSet());
    },
    logXSSMaliciousTypedArray() {
      this.logWithAllMethods(xssTestCases.maliciousTypedArray());
    },
    
    // Additional XSS Test Cases - Built-in Objects
    logXSSMaliciousDate() {
      this.logWithAllMethods(xssTestCases.maliciousDate());
    },
    logXSSMaliciousRegExp() {
      this.logWithAllMethods(xssTestCases.maliciousRegExp());
    },
    logXSSMaliciousErrorStack() {
      this.logWithAllMethods(xssTestCases.maliciousErrorStack());
    },
    
    // Additional XSS Test Cases - Advanced Patterns
    logXSSCircularXSS() {
      this.logWithAllMethods(xssTestCases.circularXSS());
    },
    logXSSDeepNestedXSS() {
      this.logWithAllMethods(xssTestCases.deepNestedXSS());
    },
    logXSSMaliciousArrayMethods() {
      const maliciousArray = xssTestCases.maliciousArrayMethods();
      if (this.selectedMethod === 'all') {
        console.log(maliciousArray.toString());
        console.info(maliciousArray.toString());
        console.warn(maliciousArray.toString());
        console.error(maliciousArray.toString());
        console.debug(maliciousArray.toString());
        console.log(maliciousArray.join(''));
        console.info(maliciousArray.join(''));
        console.warn(maliciousArray.join(''));
        console.error(maliciousArray.join(''));
        console.debug(maliciousArray.join(''));
      } else {
        console[this.selectedMethod](maliciousArray.toString());
        console[this.selectedMethod](maliciousArray.join(''));
      }
    },
    logXSSMaliciousPrototype() {
      this.logWithAllMethods(xssTestCases.maliciousPrototype());
    },
    
    // Toggle all XSS sections
    toggleAllXssSections() {
      const shouldExpand = !this.allXssSectionsExpanded;
      Object.keys(this.xssSections).forEach(key => {
        this.xssSections[key] = shouldExpand;
      });
    },
    // Toggle all styling sections
    toggleAllStylingSections() {
      const shouldExpand = !this.allStylingSectionsExpanded;
      Object.keys(this.stylingSections).forEach(key => {
        this.stylingSections[key] = shouldExpand;
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
          console.debug(`Console spam completed. Total logs: ${logCount}`);
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
      
      console.debug('Starting console spam for 2 minutes...');
      spamConsole();
    },
    // Individual Text Styling Methods
    logStyledBold() {
      this.logWithAllMethods('%cStyled Text', 'color: #ff0000; font-weight: bold; font-size: 18px;');
    },
    logStyledItalic() {
      this.logWithAllMethods('%cBold and Italic', 'color: #007bff; font-weight: bold; font-style: italic;');
    },
    logStyledUnderline() {
      this.logWithAllMethods('%cUnderlined Text', 'color: #28a745; text-decoration: underline; font-size: 16px;');
    },
    logStyledStrikethrough() {
      this.logWithAllMethods('%cStrikethrough', 'color: #dc3545; text-decoration: line-through;');
    },
    logStyledUppercase() {
      this.logWithAllMethods('%cUppercase', 'color: #ffc107; text-transform: uppercase; font-weight: bold;');
    },
    logStyledMonospace() {
      this.logWithAllMethods('%cMonospace', 'color: #6c757d; font-family: monospace; font-size: 14px;');
    },
    
    // Individual Color Methods
    logColorNormal() {
      this.logWithAllMethods('%cNormal Log', 'color: #333; font-weight: normal;');
    },
    logColorSuccess() {
      this.logWithAllMethods('%cSuccess Log', 'color: #28a745; font-weight: bold;');
    },
    logColorWarning() {
      this.logWithAllMethods('%cWarning Log', 'color: #ffc107; font-weight: bold;');
    },
    logColorError() {
      this.logWithAllMethods('%cError Log', 'color: #dc3545; font-weight: bold;');
    },
    logColorInfo() {
      this.logWithAllMethods('%cInfo Log', 'color: #17a2b8; font-weight: bold;');
    },
    logColorDebug() {
      this.logWithAllMethods('%cDebug Log', 'color: #6c757d; font-weight: normal;');
    },
    
    // Individual Font Size Methods
    logFontSmall() {
      this.logWithAllMethods('%cSmall Text', 'font-size: 12px; color: #333;');
    },
    logFontNormal() {
      this.logWithAllMethods('%cNormal Text', 'font-size: 14px; color: #333;');
    },
    logFontLarge() {
      this.logWithAllMethods('%cLarge Text', 'font-size: 18px; color: #333; font-weight: bold;');
    },
    logFontExtraLarge() {
      this.logWithAllMethods('%cExtra Large', 'font-size: 24px; color: #007bff; font-weight: bold;');
    },
    logFontHuge() {
      this.logWithAllMethods('%cHuge Text', 'font-size: 32px; color: #28a745; font-weight: bold;');
    },
    logFontMassive() {
      this.logWithAllMethods('%cMassive Text', 'font-size: 48px; color: #dc3545; font-weight: bold;');
    },
    
    // Individual Border Methods
    logBorderSolid() {
      this.logWithAllMethods('%cBordered Text', 'border: 2px solid #007bff; padding: 8px; border-radius: 5px; color: #007bff;');
    },
    logBorderDashed() {
      this.logWithAllMethods('%cDashed Border', 'border: 2px dashed #28a745; padding: 8px; border-radius: 5px; color: #28a745;');
    },
    logBorderDotted() {
      this.logWithAllMethods('%cDotted Border', 'border: 2px dotted #ffc107; padding: 8px; border-radius: 5px; color: #856404;');
    },
    logBorderDouble() {
      this.logWithAllMethods('%cDouble Border', 'border: 4px double #dc3545; padding: 8px; border-radius: 5px; color: #dc3545;');
    },
    logBorderRounded() {
      this.logWithAllMethods('%cRounded Border', 'border: 3px solid #17a2b8; padding: 10px; border-radius: 15px; color: #17a2b8;');
    },
    logBorderThick() {
      this.logWithAllMethods('%cThick Border', 'border: 5px solid #6c757d; padding: 12px; border-radius: 8px; color: #6c757d;');
    },
    
    // Individual Shadow Methods
    logShadowBasic() {
      this.logWithAllMethods('%cShadow Text', 'text-shadow: 2px 2px 4px rgba(0,0,0,0.3); color: #007bff; font-size: 18px; font-weight: bold;');
    },
    logShadowGlow() {
      this.logWithAllMethods('%cGlow Effect', 'text-shadow: 0 0 10px #28a745; color: #28a745; font-size: 18px; font-weight: bold;');
    },
    logShadowMultiple() {
      this.logWithAllMethods('%cMultiple Shadows', 'text-shadow: 2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,193,7,0.8); color: #ffc107; font-size: 18px; font-weight: bold;');
    },
    logShadowOutlined() {
      this.logWithAllMethods('%cOutlined Text', 'text-shadow: -1px -1px 0 #dc3545, 1px -1px 0 #dc3545, -1px 1px 0 #dc3545, 1px 1px 0 #dc3545; color: #dc3545; font-size: 18px; font-weight: bold;');
    },
    logShadowNeon() {
      this.logWithAllMethods('%cNeon Effect', 'text-shadow: 0 0 5px #17a2b8, 0 0 10px #17a2b8, 0 0 15px #17a2b8; color: #17a2b8; font-size: 18px; font-weight: bold;');
    },
    logShadowDrop() {
      this.logWithAllMethods('%cDrop Shadow', 'text-shadow: 3px 3px 6px rgba(108,117,125,0.8); color: #6c757d; font-size: 18px; font-weight: bold;');
    },
    
    // Individual Background Methods
    logBgNormal() {
      this.logWithAllMethods('%cNormal Log', 'background-color: #f8f9fa; color: #333; padding: 5px; border-radius: 3px;');
    },
    logBgSuccess() {
      this.logWithAllMethods('%cSuccess Log', 'background-color: #d4edda; color: #155724; padding: 5px; border-radius: 3px;');
    },
    logBgWarning() {
      this.logWithAllMethods('%cWarning Log', 'background-color: #fff3cd; color: #856404; padding: 5px; border-radius: 3px;');
    },
    logBgError() {
      this.logWithAllMethods('%cError Log', 'background-color: #f8d7da; color: #721c24; padding: 5px; border-radius: 3px;');
    },
    logBgInfo() {
      this.logWithAllMethods('%cInfo Log', 'background-color: #d1ecf1; color: #0c5460; padding: 5px; border-radius: 3px;');
    },
    logBgDebug() {
      this.logWithAllMethods('%cDebug Log', 'background-color: #e2e3e5; color: #383d41; padding: 5px; border-radius: 3px;');
    },
    
    // Individual Gradient Methods
    logGradientText() {
      this.logWithAllMethods('%cGradient Text', 'background: linear-gradient(45deg, #007bff, #28a745); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 18px; font-weight: bold;');
    },
    logGradientRainbow() {
      this.logWithAllMethods('%cRainbow Text', 'background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 18px; font-weight: bold;');
    },
    logGradientBlue() {
      this.logWithAllMethods('%cBlue Gradient', 'background: linear-gradient(to right, #007bff, #0056b3); color: white; padding: 8px; border-radius: 5px; font-weight: bold;');
    },
    logGradientGreen() {
      this.logWithAllMethods('%cGreen Gradient', 'background: linear-gradient(to right, #28a745, #1e7e34); color: white; padding: 8px; border-radius: 5px; font-weight: bold;');
    },
    logGradientOrange() {
      this.logWithAllMethods('%cOrange Gradient', 'background: linear-gradient(to right, #ffc107, #e0a800); color: #856404; padding: 8px; border-radius: 5px; font-weight: bold;');
    },
    logGradientRed() {
      this.logWithAllMethods('%cRed Gradient', 'background: linear-gradient(to right, #dc3545, #c82333); color: white; padding: 8px; border-radius: 5px; font-weight: bold;');
    },
    
    // Individual Animation Methods
    logAnimationPulse() {
      this.logWithAllMethods('%cAnimated Text', 'color: #007bff; font-weight: bold; animation: pulse 2s infinite;');
    },
    logAnimationBounce() {
      this.logWithAllMethods('%cBouncing Text', 'color: #28a745; font-weight: bold; animation: bounce 1s infinite;');
    },
    logAnimationFade() {
      this.logWithAllMethods('%cFading Text', 'color: #ffc107; font-weight: bold; animation: fade 3s infinite;');
    },
    logAnimationRotate() {
      this.logWithAllMethods('%cRotating Text', 'color: #dc3545; font-weight: bold; animation: rotate 2s linear infinite;');
    },
    logAnimationSlide() {
      this.logWithAllMethods('%cSliding Text', 'color: #17a2b8; font-weight: bold; animation: slide 2s ease-in-out infinite;');
    },
    logAnimationScale() {
      this.logWithAllMethods('%cScaling Text', 'color: #6c757d; font-weight: bold; animation: scale 1.5s ease-in-out infinite;');
    },
    
    // Individual Emoji Methods
    logEmojiLaunch() {
      this.logWithAllMethods('%c🚀 Launch', 'color: #007bff; font-size: 16px; font-weight: bold;');
    },
    logEmojiSuccess() {
      this.logWithAllMethods('%c✨ Success', 'color: #28a745; font-size: 16px; font-weight: bold;');
    },
    logEmojiWarning() {
      this.logWithAllMethods('%c⚠️ Warning', 'color: #ffc107; font-size: 16px; font-weight: bold;');
    },
    logEmojiError() {
      this.logWithAllMethods('%c💥 Error', 'color: #dc3545; font-size: 16px; font-weight: bold;');
    },
    logEmojiInfo() {
      this.logWithAllMethods('%cℹ️ Info', 'color: #17a2b8; font-size: 16px; font-weight: bold;');
    },
    logEmojiDebug() {
      this.logWithAllMethods('%c🐞 Debug', 'color: #6c757d; font-size: 16px; font-weight: bold;');
    },
    
    // Individual Icon Methods
    logIconSettings() {
      this.logWithAllMethods('%c🔧 Settings', 'color: #007bff; font-weight: bold');
    },
    logIconSuccess() {
      this.logWithAllMethods('%c✅ Success', 'color: #28a745; font-weight: bold');
    },
    logIconWarning() {
      this.logWithAllMethods('%c⚠️ Warning', 'color: #ffc107; font-weight: bold');
    },
    logIconError() {
      this.logWithAllMethods('%c❌ Error', 'color: #dc3545; font-weight: bold');
    },
    logIconInfo() {
      this.logWithAllMethods('%cℹ️ Information', 'color: #17a2b8; font-weight: bold');
    },
    logIconBug() {
      this.logWithAllMethods('%c🐛 Bug Report', 'color: #6c757d; font-weight: bold');
    },
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