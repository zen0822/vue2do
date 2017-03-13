<div
    class="bubble-stage {{ theme | themeClass }}"
    v-show="bubbleDisplay"
    @mouseover="mouseOver"
    @mouseleave ="mouseLeave"
    @click.stop>
  <div class="arrow">
    <icon class="arrow-border" name="caret-up"></icon>
    <icon class="arrow-body" name="caret-up"></icon>
  </div>

  <slot>{{ message }}</slot>
</div>