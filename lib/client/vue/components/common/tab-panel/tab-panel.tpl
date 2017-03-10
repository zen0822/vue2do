<div class="tab-panel-stage {{themeClass}}">
  <tab
      theme="secondary"
      :current-index="switchingIndex"
      :items="tabItems"></tab>

  <switching
      class="panel-wrap"
      :switch-num="tabItems.length"
      :compile-vm="compileVm"
      :current-index="switchingIndex"
      v-ref:switching>
  </switching>
</div>