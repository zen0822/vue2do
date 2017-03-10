<div class="btn-stage {{ theme | themeClass }} {{ sizeClass }}" v-show="show">
  <div v-if="ban" class="read-only-shadow" @click.stop></div>
  <div v-if="btnValueDisplay" class="btn-value-show">
    <slot>{{ value }}</slot>
  </div>

  <a
      v-if="isLink"
      v-link="link"
      @click="click">
    <slot>{{ value }}</slot>
  </a>
  <button
      v-if="isButton"
      @click="click"
      class="btn"
      :class="[btnClass]">
    <loading
        v-if="!btnValueDisplay"
        v-ref:loading
        :bg-display="false"
        type="rotate"></loading>
    {{ value }}
  </button>
  <input
      v-if="isInput"
      @click="click"
      type="button"
      class="btn"
      :class="[btnClass]"
      value="{{ value }}" />
</div>