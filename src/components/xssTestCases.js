// XSS Test Cases for Console Sandbox
// These functions return XSS payloads for testing console logging security

export const xssTestCases = {
  // HTML/Script Tags
  scriptTag: () => '<script>alert("xss")</script>',
  imgOnError: () => '<img src=x onerror=alert("xss")>',
  svgOnLoad: () => '<svg onload=alert("xss")>',
  javascriptUrl: () => 'javascript:alert("xss")',
  
  // Event Handlers
  onClick: () => '<div onclick="alert(\'xss\')">Click me</div>',
  onLoad: () => '<body onload="alert(\'xss\')">',
  onFocus: () => '<input onfocus="alert(\'xss\')" autofocus>',
  
  // URL Schemes
  dataUrl: () => 'data:text/html,<script>alert("xss")</script>',
  vbScript: () => 'vbscript:msgbox("xss")',
  
  // Object Properties
  maliciousObject: () => ({malicious: '<script>alert("xss")</script>'}),
  htmlObject: () => ({html: '<img src=x onerror=alert("xss")>'}),
  
  // Length & Encoding
  longPayload: () => '<script>alert("xss")</script>' + 'A'.repeat(1000),
  unicode: () => '\u003cscript\u003ealert("xss")\u003c/script\u003e',
  htmlEntities: () => '&#60;script&#62;alert("xss")&#60;/script&#62;',
  
  // PII & Errors
  withPii: () => '<script>alert("' + '123-45-6789' + '")</script>',
  inUrl: () => 'https://evil.com/<script>alert("xss")</script>',
  
  // DOM Element
  createMaliciousElement: () => {
    const maliciousElement = document.createElement('div');
    maliciousElement.innerHTML = '<script>alert("xss")</script>';
    return maliciousElement;
  },
  
  // Error with XSS
  createMaliciousError: () => {
    return new Error('<script>alert("xss")</script>');
  },
  
  // CSS-based XSS
  cssExpression: () => '<div style="background:expression(alert(\'xss\'))">CSS XSS</div>',
  cssUrl: () => '<div style="background:url(javascript:alert(\'xss\'))">CSS URL XSS</div>',
  cssImport: () => '<style>@import "javascript:alert(\'xss\')";</style>',
  
  // Advanced Event Handlers
  onMouseOver: () => '<div onmouseover="alert(\'xss\')">Hover me</div>',
  onKeyPress: () => '<input onkeypress="alert(\'xss\')" placeholder="Type here">',
  onBlur: () => '<input onblur="alert(\'xss\')" value="Click then click away">',
  onContextMenu: () => '<div oncontextmenu="alert(\'xss\')">Right click me</div>',
  onDoubleClick: () => '<div ondblclick="alert(\'xss\')">Double click me</div>',
  
  // Frame/Iframe XSS
  iframeSrc: () => '<iframe src="javascript:alert(\'xss\')"></iframe>',
  frameSrc: () => '<frame src="javascript:alert(\'xss\')">',
  embedSrc: () => '<embed src="javascript:alert(\'xss\')">',
  objectData: () => '<object data="javascript:alert(\'xss\')"></object>',
  
  // Meta Refresh XSS
  metaRefresh: () => '<meta http-equiv="refresh" content="0;url=javascript:alert(\'xss\')">',
  
  // Link XSS
  linkHref: () => '<link rel="stylesheet" href="javascript:alert(\'xss\')">',
  anchorHref: () => '<a href="javascript:alert(\'xss\')">Click me</a>',
  
  // Form XSS
  formAction: () => '<form action="javascript:alert(\'xss\')"><input type="submit" value="Submit"></form>',
  inputFormaction: () => '<input type="submit" formaction="javascript:alert(\'xss\')" value="Submit">',
  
  // Advanced URL Schemes
  dataUrlWithBase64: () => 'data:text/html;base64,PHNjcmlwdD5hbGVydCgneHNzJyk8L3NjcmlwdD4=',
  dataUrlWithCharset: () => 'data:text/html;charset=utf-8,<script>alert("xss")</script>',
  fileUrl: () => 'file:///etc/passwd',
  ftpUrl: () => 'ftp://evil.com/script.js',
  
  // Unicode and Encoding Variations
  unicodeHex: () => '&#x3c;script&#x3e;alert("xss")&#x3c;/script&#x3e;',
  unicodeDecimal: () => '&#60;script&#62;alert("xss")&#60;/script&#62;',
  unicodeMixed: () => '&#x3c;script&#62;alert("xss")&#x3c;/script&#62;',
  urlEncoded: () => '%3Cscript%3Ealert%28%22xss%22%29%3C/script%3E',
  doubleEncoded: () => '%253Cscript%253Ealert%2528%2522xss%2522%2529%253C/script%253E',
  
  // Template Literals and String Interpolation
  templateLiteral: () => `<script>alert('${"xss"}')</script>`,
  stringInterpolation: () => '<script>alert("' + 'xss'.toUpperCase() + '")</script>',
  
  // Array and Object Nesting
  nestedArray: () => [['<script>alert("xss")</script>'], ['nested', 'array']],
  nestedObject: () => ({outer: {inner: '<script>alert("xss")</script>'}}),
  mixedData: () => ({strings: ['<script>alert("xss")</script>'], numbers: [1, 2, 3]}),
  
  // Function and Method Names
  functionName: () => {
    const maliciousFunction = function() {};
    maliciousFunction.name = '<script>alert("xss")</script>';
    return maliciousFunction;
  },
  
  // Symbol and WeakMap Keys
  symbolKey: () => {
    const sym = Symbol('<script>alert("xss")</script>');
    return {[sym]: 'malicious value'};
  },
  
  // Proxy Objects
  proxyObject: () => {
    const target = {normal: 'value'};
    return new Proxy(target, {
      get: function(target, prop) {
        return '<script>alert("xss")</script>';
      }
    });
  },
  
  // Generator Functions
  generatorFunction: () => {
    function* maliciousGenerator() {
      yield '<script>alert("xss")</script>';
      yield 'normal value';
    }
    return maliciousGenerator();
  },
  
  // Async Functions and Promises
  asyncFunction: () => {
    const asyncFn = async () => '<script>alert("xss")</script>';
    return asyncFn();
  },
  
  // Class with Malicious Properties
  maliciousClass: () => {
    class MaliciousClass {
      constructor() {
        this.malicious = '<script>alert("xss")</script>';
      }
    }
    return new MaliciousClass();
  },
  
  // Map and Set with Malicious Values
  maliciousMap: () => {
    const map = new Map();
    map.set('normal', 'value');
    map.set('<script>alert("xss")</script>', 'malicious');
    return map;
  },
  
  maliciousSet: () => {
    const set = new Set(['normal', '<script>alert("xss")</script>']);
    return set;
  },
  
  // Typed Arrays with Malicious Strings
  maliciousTypedArray: () => {
    const str = '<script>alert("xss")</script>';
    const encoder = new TextEncoder();
    return encoder.encode(str);
  },
  
  // Date with Malicious toString
  maliciousDate: () => {
    const date = new Date();
    date.toString = () => '<script>alert("xss")</script>';
    return date;
  },
  
  // RegExp with Malicious Source
  maliciousRegExp: () => {
    return new RegExp('<script>alert("xss")</script>');
  },
  
  // Error with Malicious Stack
  maliciousErrorStack: () => {
    const err = new Error('Normal error');
    err.stack = '<script>alert("xss")</script>';
    return err;
  },
  
  // Circular Reference with XSS
  circularXSS: () => {
    const obj = {malicious: '<script>alert("xss")</script>'};
    obj.self = obj;
    return obj;
  },
  
  // Deep Nested Object with XSS
  deepNestedXSS: () => {
    const obj = {};
    let current = obj;
    for (let i = 0; i < 10; i++) {
      current.level = i;
      current.malicious = '<script>alert("xss")</script>';
      current.next = {};
      current = current.next;
    }
    return obj;
  },
  
  // Array with Malicious Methods
  maliciousArrayMethods: () => {
    const arr = ['normal', 'values'];
    arr.toString = () => '<script>alert("xss")</script>';
    arr.join = () => '<script>alert("xss")</script>';
    return arr;
  },
  
  // Object with Malicious Prototype
  maliciousPrototype: () => {
    const obj = {};
    Object.setPrototypeOf(obj, {
      toString: () => '<script>alert("xss")</script>'
    });
    return obj;
  }
};

// Grouped test cases for the original combined methods
export const xssTestGroups = {
  htmlScript: () => [
    xssTestCases.scriptTag(),
    xssTestCases.imgOnError(),
    xssTestCases.svgOnLoad(),
    xssTestCases.javascriptUrl()
  ],
  
  eventHandlers: () => [
    xssTestCases.onClick(),
    xssTestCases.onLoad(),
    xssTestCases.onFocus()
  ],
  
  urlSchemes: () => [
    xssTestCases.javascriptUrl(),
    xssTestCases.dataUrl(),
    xssTestCases.vbScript()
  ],
  
  objectProperties: () => [
    xssTestCases.maliciousObject(),
    xssTestCases.htmlObject(),
    xssTestCases.createMaliciousElement()
  ],
  
  lengthTruncation: () => [
    xssTestCases.longPayload()
  ],
  
  piiScrubbing: () => [
    xssTestCases.withPii(),
    xssTestCases.inUrl()
  ],
  
  encoding: () => [
    xssTestCases.unicode(),
    xssTestCases.htmlEntities()
  ],
  
  errorHandling: () => [
    xssTestCases.createMaliciousError()
  ]
}; 