<div
    :class="[themeClass, {'loading-mark': bgDisplay}]"
    class="loading-stage"
    v-show="dispaly">
  <div class="loading-warp">
    <div
        v-if="isRotate"
        class="rotate">
      <icon size="l" name="spinner"></icon>
    </div>

    <div v-if="isSpot" class="spot">
      <span class="loading-text">{{ loadingText }}</span>
      <span class="spot-1">.</span>
      <span class="spot-2">.</span>
      <span class="spot-3">.</span>
    </div>
  </div>

  <div class="bg" v-if="bgDisplay"></div>
</div>
