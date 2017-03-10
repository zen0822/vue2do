<div
    class="bubble-stage {{ theme | themeClass }} {{ message ? '' : 'customize-bubble' }}"
    v-show="bubbleDisplay"
    @mouseover="mouseOver"
    @mouseleave ="mouseLeave"
    @click.stop>
  <div class="arrow">
    <icon class="arrow-border" kind="caret-up"></icon>
    <icon class="arrow-body" kind="caret-up"></icon>
  </div>

  <div
      class="bubble-slot"
      :style="{'max-width': width ? width+'px' : 'none'}">
    <slot>
      <div class="bubble-text">{{ message }}</div>
    </slot>
  </div>
</div>