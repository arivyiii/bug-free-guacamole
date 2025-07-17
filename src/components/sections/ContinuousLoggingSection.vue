<template>
  <ConsoleSandboxSection title="Continuous Logging" :selectedMethod="selectedMethod">
    <button @click="startContinuousLogging" class="console-sandbox__btn console-sandbox__btn--error" :disabled="isLogging">Start 2min Continuous Logging</button>
    <button @click="startConsoleSpam" class="console-sandbox__btn console-sandbox__btn--error" :disabled="isLogging">Start 2min Console Spam</button>
    <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6c757d;">
      Left: Random intervals (0-2s) | Right: Maximum spam for rate limiting tests
    </p>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';

export default {
  name: 'ContinuousLoggingSection',
  components: {
    ConsoleSandboxSection
  },
  props: {
    selectedMethod: {
      type: String,
      required: true
    },
    isLogging: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:isLogging'],
  methods: {
    startContinuousLogging() {
      const startTime = Date.now();
      const duration = 2 * 60 * 1000; // 2 minutes in milliseconds
      let logCount = 0;
      this.$emit('update:isLogging', true);
      
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
          this.$emit('update:isLogging', false);
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
      this.$emit('update:isLogging', true);
      
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
          this.$emit('update:isLogging', false);
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
    }
  }
};
</script>