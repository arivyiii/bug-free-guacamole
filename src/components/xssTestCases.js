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