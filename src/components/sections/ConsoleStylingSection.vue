<template>
  <ConsoleSandboxSection 
    title="Console Styling" 
    :selectedMethod="selectedMethod" 
    :collapsible="true"
    :initiallyExpanded="false"
    :grid="false"
  >
    <template #header-actions>
      <button @click="toggleAllStylingSections" class="console-sandbox__btn console-sandbox__btn--toggle">
        {{ allStylingSectionsExpanded ? 'Collapse All' : 'Show All' }}
      </button>
    </template>
    
    <!-- Text Styling -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="stylingSections.text = !stylingSections.text">
        <span class="console-sandbox__toggle-icon">{{ stylingSections.text ? '▼' : '▶' }}</span>
        Text Styling (Font, Weight, Style, Transform)
      </h3>
      <div class="console-sandbox__button-grid" v-show="stylingSections.text">
        <button @click="logStyledBold()" class="console-sandbox__btn">Bold Text</button>
        <button @click="logStyledItalic()" class="console-sandbox__btn">Italic Text</button>
        <button @click="logStyledUnderline()" class="console-sandbox__btn">Underlined Text</button>
        <button @click="logStyledStrikethrough()" class="console-sandbox__btn">Strikethrough</button>
        <button @click="logStyledUppercase()" class="console-sandbox__btn">Uppercase</button>
        <button @click="logStyledMonospace()" class="console-sandbox__btn">Monospace</button>
      </div>
    </div>

    <!-- Text Colors -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="stylingSections.colors = !stylingSections.colors">
        <span class="console-sandbox__toggle-icon">{{ stylingSections.colors ? '▼' : '▶' }}</span>
        Text Colors
      </h3>
      <div class="console-sandbox__button-grid" v-show="stylingSections.colors">
        <button @click="logColorNormal()" class="console-sandbox__btn">Normal Color</button>
        <button @click="logColorSuccess()" class="console-sandbox__btn">Success Color</button>
        <button @click="logColorWarning()" class="console-sandbox__btn">Warning Color</button>
        <button @click="logColorError()" class="console-sandbox__btn">Error Color</button>
        <button @click="logColorInfo()" class="console-sandbox__btn">Info Color</button>
        <button @click="logColorDebug()" class="console-sandbox__btn">Debug Color</button>
      </div>
    </div>

    <!-- Font Sizes -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="stylingSections.fontSizes = !stylingSections.fontSizes">
        <span class="console-sandbox__toggle-icon">{{ stylingSections.fontSizes ? '▼' : '▶' }}</span>
        Font Sizes
      </h3>
      <div class="console-sandbox__button-grid" v-show="stylingSections.fontSizes">
        <button @click="logFontSmall()" class="console-sandbox__btn">Small Text</button>
        <button @click="logFontNormal()" class="console-sandbox__btn">Normal Text</button>
        <button @click="logFontLarge()" class="console-sandbox__btn">Large Text</button>
        <button @click="logFontExtraLarge()" class="console-sandbox__btn">Extra Large</button>
        <button @click="logFontHuge()" class="console-sandbox__btn">Huge Text</button>
        <button @click="logFontMassive()" class="console-sandbox__btn">Massive Text</button>
      </div>
    </div>

    <!-- Borders -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="stylingSections.borders = !stylingSections.borders">
        <span class="console-sandbox__toggle-icon">{{ stylingSections.borders ? '▼' : '▶' }}</span>
        Borders
      </h3>
      <div class="console-sandbox__button-grid" v-show="stylingSections.borders">
        <button @click="logBorderSolid()" class="console-sandbox__btn">Solid Border</button>
        <button @click="logBorderDashed()" class="console-sandbox__btn">Dashed Border</button>
        <button @click="logBorderDotted()" class="console-sandbox__btn">Dotted Border</button>
        <button @click="logBorderDouble()" class="console-sandbox__btn">Double Border</button>
        <button @click="logBorderRounded()" class="console-sandbox__btn">Rounded Border</button>
        <button @click="logBorderThick()" class="console-sandbox__btn">Thick Border</button>
      </div>
    </div>

    <!-- Shadows -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="stylingSections.shadows = !stylingSections.shadows">
        <span class="console-sandbox__toggle-icon">{{ stylingSections.shadows ? '▼' : '▶' }}</span>
        Text Shadows
      </h3>
      <div class="console-sandbox__button-grid" v-show="stylingSections.shadows">
        <button @click="logShadowBasic()" class="console-sandbox__btn">Shadow Text</button>
        <button @click="logShadowGlow()" class="console-sandbox__btn">Glow Effect</button>
        <button @click="logShadowMultiple()" class="console-sandbox__btn">Multiple Shadows</button>
        <button @click="logShadowOutlined()" class="console-sandbox__btn">Outlined Text</button>
        <button @click="logShadowNeon()" class="console-sandbox__btn">Neon Effect</button>
        <button @click="logShadowDrop()" class="console-sandbox__btn">Drop Shadow</button>
      </div>
    </div>

    <!-- Background Colors -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="stylingSections.backgrounds = !stylingSections.backgrounds">
        <span class="console-sandbox__toggle-icon">{{ stylingSections.backgrounds ? '▼' : '▶' }}</span>
        Background Colors
      </h3>
      <div class="console-sandbox__button-grid" v-show="stylingSections.backgrounds">
        <button @click="logBgNormal()" class="console-sandbox__btn">Normal Background</button>
        <button @click="logBgSuccess()" class="console-sandbox__btn">Success Background</button>
        <button @click="logBgWarning()" class="console-sandbox__btn">Warning Background</button>
        <button @click="logBgError()" class="console-sandbox__btn">Error Background</button>
        <button @click="logBgInfo()" class="console-sandbox__btn">Info Background</button>
        <button @click="logBgDebug()" class="console-sandbox__btn">Debug Background</button>
      </div>
    </div>

    <!-- Gradients -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="stylingSections.gradients = !stylingSections.gradients">
        <span class="console-sandbox__toggle-icon">{{ stylingSections.gradients ? '▼' : '▶' }}</span>
        Gradients
      </h3>
      <div class="console-sandbox__button-grid" v-show="stylingSections.gradients">
        <button @click="logGradientText()" class="console-sandbox__btn">Gradient Text</button>
        <button @click="logGradientRainbow()" class="console-sandbox__btn">Rainbow Text</button>
        <button @click="logGradientBlue()" class="console-sandbox__btn">Blue Gradient</button>
        <button @click="logGradientGreen()" class="console-sandbox__btn">Green Gradient</button>
        <button @click="logGradientOrange()" class="console-sandbox__btn">Orange Gradient</button>
        <button @click="logGradientRed()" class="console-sandbox__btn">Red Gradient</button>
      </div>
    </div>

    <!-- Animations -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="stylingSections.animations = !stylingSections.animations">
        <span class="console-sandbox__toggle-icon">{{ stylingSections.animations ? '▼' : '▶' }}</span>
        Animations
      </h3>
      <div class="console-sandbox__button-grid" v-show="stylingSections.animations">
        <button @click="logAnimationPulse()" class="console-sandbox__btn">Pulse Animation</button>
        <button @click="logAnimationBounce()" class="console-sandbox__btn">Bounce Animation</button>
        <button @click="logAnimationFade()" class="console-sandbox__btn">Fade Animation</button>
        <button @click="logAnimationRotate()" class="console-sandbox__btn">Rotate Animation</button>
        <button @click="logAnimationSlide()" class="console-sandbox__btn">Slide Animation</button>
        <button @click="logAnimationScale()" class="console-sandbox__btn">Scale Animation</button>
      </div>
    </div>

    <!-- Emojis -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="stylingSections.emojis = !stylingSections.emojis">
        <span class="console-sandbox__toggle-icon">{{ stylingSections.emojis ? '▼' : '▶' }}</span>
        Emojis
      </h3>
      <div class="console-sandbox__button-grid" v-show="stylingSections.emojis">
        <button @click="logEmojiLaunch()" class="console-sandbox__btn">🚀 Launch</button>
        <button @click="logEmojiSuccess()" class="console-sandbox__btn">✨ Success</button>
        <button @click="logEmojiWarning()" class="console-sandbox__btn">⚠️ Warning</button>
        <button @click="logEmojiError()" class="console-sandbox__btn">💥 Error</button>
        <button @click="logEmojiInfo()" class="console-sandbox__btn">ℹ️ Info</button>
        <button @click="logEmojiDebug()" class="console-sandbox__btn">🐞 Debug</button>
      </div>
    </div>

    <!-- Icons -->
    <div class="console-sandbox__xss-subsection">
      <h3 class="console-sandbox__subsection-title" @click="stylingSections.icons = !stylingSections.icons">
        <span class="console-sandbox__toggle-icon">{{ stylingSections.icons ? '▼' : '▶' }}</span>
        Icons
      </h3>
      <div class="console-sandbox__button-grid" v-show="stylingSections.icons">
        <button @click="logIconSettings()" class="console-sandbox__btn">🔧 Settings</button>
        <button @click="logIconSuccess()" class="console-sandbox__btn">✅ Success</button>
        <button @click="logIconWarning()" class="console-sandbox__btn">⚠️ Warning</button>
        <button @click="logIconError()" class="console-sandbox__btn">❌ Error</button>
        <button @click="logIconInfo()" class="console-sandbox__btn">ℹ️ Information</button>
        <button @click="logIconBug()" class="console-sandbox__btn">🐛 Bug Report</button>
      </div>
    </div>
  </ConsoleSandboxSection>
</template>

<script>
import ConsoleSandboxSection from '../ConsoleSandboxSection.vue';
import { logWithMethod } from '../../utils/consoleUtils.js';

export default {
  name: 'ConsoleStylingSection',
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
      allStylingSectionsExpanded: false,
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
  methods: {
    logWithAllMethods(message, style) {
      logWithMethod(this.selectedMethod, message, style);
    },

    // Individual Text Styling Methods
    logStyledBold() {
      logWithMethod(this.selectedMethods, '%cStyled Text', 'color: #ff0000; font-weight: bold; font-size: 18px;');
    },
    logStyledItalic() {
      logWithMethod(this.selectedMethods, '%cBold and Italic', 'color: #007bff; font-weight: bold; font-style: italic;');
    },
    logStyledUnderline() {
      logWithMethod(this.selectedMethods, '%cUnderlined Text', 'color: #28a745; text-decoration: underline; font-size: 16px;');
    },
    logStyledStrikethrough() {
      logWithMethod(this.selectedMethods, '%cStrikethrough', 'color: #dc3545; text-decoration: line-through;');
    },
    logStyledUppercase() {
      logWithMethod(this.selectedMethods, '%cUppercase', 'color: #ffc107; text-transform: uppercase; font-weight: bold;');
    },
    logStyledMonospace() {
      logWithMethod(this.selectedMethods, '%cMonospace', 'color: #6c757d; font-family: monospace; font-size: 14px;');
    },
    
    // Individual Color Methods
    logColorNormal() {
      logWithMethod(this.selectedMethods, '%cNormal Log', 'color: #333; font-weight: normal;');
    },
    logColorSuccess() {
      logWithMethod(this.selectedMethods, '%cSuccess Log', 'color: #28a745; font-weight: bold;');
    },
    logColorWarning() {
      logWithMethod(this.selectedMethods, '%cWarning Log', 'color: #ffc107; font-weight: bold;');
    },
    logColorError() {
      logWithMethod(this.selectedMethods, '%cError Log', 'color: #dc3545; font-weight: bold;');
    },
    logColorInfo() {
      logWithMethod(this.selectedMethods, '%cInfo Log', 'color: #17a2b8; font-weight: bold;');
    },
    logColorDebug() {
      logWithMethod(this.selectedMethods, '%cDebug Log', 'color: #6c757d; font-weight: normal;');
    },
    
    // Individual Font Size Methods
    logFontSmall() {
      logWithMethod(this.selectedMethods, '%cSmall Text', 'font-size: 12px; color: #333;');
    },
    logFontNormal() {
      logWithMethod(this.selectedMethods, '%cNormal Text', 'font-size: 14px; color: #333;');
    },
    logFontLarge() {
      logWithMethod(this.selectedMethods, '%cLarge Text', 'font-size: 18px; color: #333; font-weight: bold;');
    },
    logFontExtraLarge() {
      logWithMethod(this.selectedMethods, '%cExtra Large', 'font-size: 24px; color: #007bff; font-weight: bold;');
    },
    logFontHuge() {
      logWithMethod(this.selectedMethods, '%cHuge Text', 'font-size: 32px; color: #28a745; font-weight: bold;');
    },
    logFontMassive() {
      logWithMethod(this.selectedMethods, '%cMassive Text', 'font-size: 48px; color: #dc3545; font-weight: bold;');
    },
    
    // Individual Border Methods
    logBorderSolid() {
      logWithMethod(this.selectedMethods, '%cBordered Text', 'border: 2px solid #007bff; padding: 8px; border-radius: 5px; color: #007bff;');
    },
    logBorderDashed() {
      logWithMethod(this.selectedMethods, '%cDashed Border', 'border: 2px dashed #28a745; padding: 8px; border-radius: 5px; color: #28a745;');
    },
    logBorderDotted() {
      logWithMethod(this.selectedMethods, '%cDotted Border', 'border: 2px dotted #ffc107; padding: 8px; border-radius: 5px; color: #856404;');
    },
    logBorderDouble() {
      logWithMethod(this.selectedMethods, '%cDouble Border', 'border: 4px double #dc3545; padding: 8px; border-radius: 5px; color: #dc3545;');
    },
    logBorderRounded() {
      logWithMethod(this.selectedMethods, '%cRounded Border', 'border: 3px solid #17a2b8; padding: 10px; border-radius: 15px; color: #17a2b8;');
    },
    logBorderThick() {
      logWithMethod(this.selectedMethods, '%cThick Border', 'border: 5px solid #6c757d; padding: 12px; border-radius: 8px; color: #6c757d;');
    },
    
    // Individual Shadow Methods
    logShadowBasic() {
      logWithMethod(this.selectedMethods, '%cShadow Text', 'text-shadow: 2px 2px 4px rgba(0,0,0,0.3); color: #007bff; font-size: 18px; font-weight: bold;');
    },
    logShadowGlow() {
      logWithMethod(this.selectedMethods, '%cGlow Effect', 'text-shadow: 0 0 10px #28a745; color: #28a745; font-size: 18px; font-weight: bold;');
    },
    logShadowMultiple() {
      logWithMethod(this.selectedMethods, '%cMultiple Shadows', 'text-shadow: 2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,193,7,0.8); color: #ffc107; font-size: 18px; font-weight: bold;');
    },
    logShadowOutlined() {
      logWithMethod(this.selectedMethods, '%cOutlined Text', 'text-shadow: -1px -1px 0 #dc3545, 1px -1px 0 #dc3545, -1px 1px 0 #dc3545, 1px 1px 0 #dc3545; color: #dc3545; font-size: 18px; font-weight: bold;');
    },
    logShadowNeon() {
      logWithMethod(this.selectedMethods, '%cNeon Effect', 'text-shadow: 0 0 5px #17a2b8, 0 0 10px #17a2b8, 0 0 15px #17a2b8; color: #17a2b8; font-size: 18px; font-weight: bold;');
    },
    logShadowDrop() {
      logWithMethod(this.selectedMethods, '%cDrop Shadow', 'text-shadow: 3px 3px 6px rgba(108,117,125,0.8); color: #6c757d; font-size: 18px; font-weight: bold;');
    },
    
    // Individual Background Methods
    logBgNormal() {
      logWithMethod(this.selectedMethods, '%cNormal Log', 'background-color: #f8f9fa; color: #333; padding: 5px; border-radius: 3px;');
    },
    logBgSuccess() {
      logWithMethod(this.selectedMethods, '%cSuccess Log', 'background-color: #d4edda; color: #155724; padding: 5px; border-radius: 3px;');
    },
    logBgWarning() {
      logWithMethod(this.selectedMethods, '%cWarning Log', 'background-color: #fff3cd; color: #856404; padding: 5px; border-radius: 3px;');
    },
    logBgError() {
      logWithMethod(this.selectedMethods, '%cError Log', 'background-color: #f8d7da; color: #721c24; padding: 5px; border-radius: 3px;');
    },
    logBgInfo() {
      logWithMethod(this.selectedMethods, '%cInfo Log', 'background-color: #d1ecf1; color: #0c5460; padding: 5px; border-radius: 3px;');
    },
    logBgDebug() {
      logWithMethod(this.selectedMethods, '%cDebug Log', 'background-color: #e2e3e5; color: #383d41; padding: 5px; border-radius: 3px;');
    },
    
    // Individual Gradient Methods
    logGradientText() {
      logWithMethod(this.selectedMethods, '%cGradient Text', 'background: linear-gradient(45deg, #007bff, #28a745); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 18px; font-weight: bold;');
    },
    logGradientRainbow() {
      logWithMethod(this.selectedMethods, '%cRainbow Text', 'background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 18px; font-weight: bold;');
    },
    logGradientBlue() {
      logWithMethod(this.selectedMethods, '%cBlue Gradient', 'background: linear-gradient(to right, #007bff, #0056b3); color: white; padding: 8px; border-radius: 5px; font-weight: bold;');
    },
    logGradientGreen() {
      logWithMethod(this.selectedMethods, '%cGreen Gradient', 'background: linear-gradient(to right, #28a745, #1e7e34); color: white; padding: 8px; border-radius: 5px; font-weight: bold;');
    },
    logGradientOrange() {
      logWithMethod(this.selectedMethods, '%cOrange Gradient', 'background: linear-gradient(to right, #ffc107, #e0a800); color: #856404; padding: 8px; border-radius: 5px; font-weight: bold;');
    },
    logGradientRed() {
      logWithMethod(this.selectedMethods, '%cRed Gradient', 'background: linear-gradient(to right, #dc3545, #c82333); color: white; padding: 8px; border-radius: 5px; font-weight: bold;');
    },
    
    // Individual Animation Methods
    logAnimationPulse() {
      logWithMethod(this.selectedMethods, '%cAnimated Text', 'color: #007bff; font-weight: bold; animation: pulse 2s infinite;');
    },
    logAnimationBounce() {
      logWithMethod(this.selectedMethods, '%cBouncing Text', 'color: #28a745; font-weight: bold; animation: bounce 1s infinite;');
    },
    logAnimationFade() {
      logWithMethod(this.selectedMethods, '%cFading Text', 'color: #ffc107; font-weight: bold; animation: fade 3s infinite;');
    },
    logAnimationRotate() {
      logWithMethod(this.selectedMethods, '%cRotating Text', 'color: #dc3545; font-weight: bold; animation: rotate 2s linear infinite;');
    },
    logAnimationSlide() {
      logWithMethod(this.selectedMethods, '%cSliding Text', 'color: #17a2b8; font-weight: bold; animation: slide 2s ease-in-out infinite;');
    },
    logAnimationScale() {
      logWithMethod(this.selectedMethods, '%cScaling Text', 'color: #6c757d; font-weight: bold; animation: scale 1.5s ease-in-out infinite;');
    },
    
    // Individual Emoji Methods
    logEmojiLaunch() {
      logWithMethod(this.selectedMethods, '%c🚀 Launch', 'color: #007bff; font-size: 16px; font-weight: bold;');
    },
    logEmojiSuccess() {
      logWithMethod(this.selectedMethods, '%c✨ Success', 'color: #28a745; font-size: 16px; font-weight: bold;');
    },
    logEmojiWarning() {
      logWithMethod(this.selectedMethods, '%c⚠️ Warning', 'color: #ffc107; font-size: 16px; font-weight: bold;');
    },
    logEmojiError() {
      logWithMethod(this.selectedMethods, '%c💥 Error', 'color: #dc3545; font-size: 16px; font-weight: bold;');
    },
    logEmojiInfo() {
      logWithMethod(this.selectedMethods, '%cℹ️ Info', 'color: #17a2b8; font-size: 16px; font-weight: bold;');
    },
    logEmojiDebug() {
      logWithMethod(this.selectedMethods, '%c🐞 Debug', 'color: #6c757d; font-size: 16px; font-weight: bold;');
    },
    
    // Individual Icon Methods
    logIconSettings() {
      logWithMethod(this.selectedMethods, '%c🔧 Settings', 'color: #007bff; font-weight: bold');
    },
    logIconSuccess() {
      logWithMethod(this.selectedMethods, '%c✅ Success', 'color: #28a745; font-weight: bold');
    },
    logIconWarning() {
      logWithMethod(this.selectedMethods, '%c⚠️ Warning', 'color: #ffc107; font-weight: bold');
    },
    logIconError() {
      logWithMethod(this.selectedMethods, '%c❌ Error', 'color: #dc3545; font-weight: bold');
    },
    logIconInfo() {
      logWithMethod(this.selectedMethods, '%cℹ️ Information', 'color: #17a2b8; font-weight: bold');
    },
    logIconBug() {
      logWithMethod(this.selectedMethods, '%c🐛 Bug Report', 'color: #6c757d; font-weight: bold');
    },
    
    // Toggle all styling sections
    toggleAllStylingSections() {
      const shouldExpand = !this.allStylingSectionsExpanded;
      Object.keys(this.stylingSections).forEach(key => {
        this.stylingSections[key] = shouldExpand;
      });
      this.allStylingSectionsExpanded = shouldExpand;
    }
  }
};
</script>