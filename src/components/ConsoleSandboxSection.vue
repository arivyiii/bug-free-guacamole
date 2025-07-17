<template>
  <section class="console-sandbox__section">
    <div v-if="collapsible" class="console-sandbox__section-header">
      <h2 class="console-sandbox__section-title" @click="toggleExpanded">
        {{ title }}
      </h2>
      <slot name="header-actions"></slot>
    </div>
    <h2 v-else class="console-sandbox__section-title">{{ title }}</h2>
    
    <div class="console-sandbox__content">
      <div :class="contentClass">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ConsoleSandboxSection',
  props: {
    title: {
      type: String,
      required: true
    },
    grid: {
      type: Boolean,
      default: true
    },
    selectedMethod: {
      type: String,
      default: 'log'
    },
    collapsible: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    contentClass() {
      return this.grid ? 'console-sandbox__button-grid' : '';
    }
  },
  methods: {
    toggleExpanded() {
      if (this.collapsible) {
        this.isExpanded = !this.isExpanded;
      }
    }
  }
};
</script> 