<div class="switching-stage {{theme | themeClass}}">
  <div class="switching-container">
    <div
      v-for="item in switchNum"
      class="switching-ele"
      :class="{ hide: $index !== currentIndex }"></div>
  </div>
</div>