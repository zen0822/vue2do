<div
    class="pop-stage {{ theme | themeClass }} {{ isTip ? 'tip-stage' : '' }} {{ isAlert ? 'alert-stage' : '' }}"
    v-show="popDisplay"
    transition="fade"
    @mousemove="mouseMove">
  <div class="bg" @click="hide"></div>
  <div class="pop">
    <header
        :class="{ 'no-header-title': !headername }"
        v-if="headerDisplay"
        @mousedown='mouseDown'
        @mouseup.prevent='mouseUp'>
      <span>{{headername}}</span>
      <icon
          class="close-pop"
          @click='hide'
          v-if="headerNoBtnDisplay"
          v-show="!headername"
          name="times"
          size="L"></icon>
    </header>
    <article>
      <slot name='body'>
        <div class="alert-message">{{ message }}</div>
      </slot>
    </article>
    <footer v-if="footerDisplay">
      <btn
          kind="default"
          :value="nobtnname"
          v-if="!isAlert && noBtnDisplay"
          @click="cancel"></btn>
      <btn class="m-l" kind="danger" @click='ok' :value="okbtnname"></btn>
    </footer>
  </div>
</div>