<script setup>
import ConsoleSandbox from './components/ConsoleSandbox.vue'

pendo.initialize({
        visitor: {
            id: 'VISITOR-UNIQUE-ID'
        },
        account: {
            id: 'MyAccount'
        }
});
</script>

<template>
  <main>
    <ConsoleSandbox />
  </main>
</template>

