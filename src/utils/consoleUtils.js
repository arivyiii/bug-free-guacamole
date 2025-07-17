/**
 * Logs with the selected console method or all methods if 'all' is selected
 * @param {string} selectedMethod - The selected console method ('log', 'info', 'warn', 'error', 'debug', 'all')
 * @param {...any} args - Arguments to log
 */
export function logWithMethod(selectedMethod, ...args) {
  if (selectedMethod === 'all') {
    console.info(...args);
    console.warn(...args);
    console.error(...args);
  } else {
    console[selectedMethod](...args);
  }
} 