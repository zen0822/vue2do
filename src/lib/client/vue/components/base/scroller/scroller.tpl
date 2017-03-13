<div
    class="scroller-stage {{ theme | themeClass }}"
    :style="{'max-height': maxHeight+'px', 'height': boxHeight+'px'}">
  <div v-el:scroller-box class="scroller-box">
    <slot></slot>
  </div>
  <div class="scroller-bar"></div>
</div>