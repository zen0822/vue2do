<div :class="[cPrefix]">
  <div v-xclass="xclass([themeClass, sizeClass])">
    <div v-if="ban" v-xclass="xclass('read-only-shadow')" @click.stop></div>
    <div v-if="btnValueDisplay" v-xclass="xclass('value-show')">
      <slot>{{ value }}</slot>
    </div>

    <a
        v-if="isLink"
        v-link="link"
        @click="click">
      <slot>{{ value }}</slot>
    </a>
    <button
        :class="[btnClass]"
        @click="click"
        v-if="isButton"
        v-xclass="xclass('ele')">
      <loading
          :bg-display="false"
          ref="loading"
          v-if="createdLoading"></loading>
      <slot>{{ value }}</slot>
    </button>
  </div>
</div>