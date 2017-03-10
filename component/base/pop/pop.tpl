<div :class="[cPrefix]">
  <div
      :class="stageClass"
      @mousemove="mouseMove"
      transition="fade"
      v-show="popDisplay"
      v-xclass="xclass([themeClass, 'stage'])">
    <div v-xclass="xclass('bg')" @click="hide"></div>
    <div v-xclass="xclass('container')">
      <header
          :class="headerClass"
          @mousedown='mouseDown'
          @mouseup.prevent='mouseUp'
          v-if="!isTip && headerDisplay">
        <span>{{ popHeaderName }}</span>
        <span @click='hide'>
          <icon
            kind="times"
            size="L"
            v-if="headerNoBtnDisplay"
            v-show="!popHeaderName"
            v-xclass="xclass('close-pop')"></icon>
        </span>
      </header>
      <article>
        <slot>
          <div v-xclass="xclass('alert-message')">{{ popMessage }}</div>
        </slot>
      </article>
      <footer v-if="!isTip && footerDisplay">
        <btn
            :value="noBtnName"
            @click="cancel"
            kind="default"
            v-if="!isAlert && noBtnDisplay"></btn>
        <btn
            :value="okBtnName"
            @click="ok"
            class="z-m-l"
            kind="primary"></btn>
      </footer>
    </div>
  </div>
</div>