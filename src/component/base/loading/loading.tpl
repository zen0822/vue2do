 <div
    :class="[cPrefix, {[`${cPrefix}-mark`]: bgDisplay}]"
    v-show="display">
  <div v-xclass="xclass(['stage', themeClass])">
    <div v-xclass="xclass('wrap')">
      <div
          v-if="isRotate"
          class="rotate">
        <icon size="l" kind="spinner"></icon>
      </div>

      <div v-if="isSpot" class="spot">
        <span v-xclass="xclass('text')">{{ loadingText }}</span>
        <span class="spot-1">.</span>
        <span class="spot-2">.</span>
        <span class="spot-3">.</span>
      </div>
    </div>

    <div v-xclass="xclass('bg')" v-if="bgDisplay"></div>
  </div>
 </div>