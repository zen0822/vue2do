<div :class="[cPrefix]">
  <div :class="stageClass">
    <div :class="[xclass('read-only')]" v-show="readOnly"></div>
    <div :class="[xclass('selected-box')]" @click.stop="select">
      <template v-if="multiple">
        <span
            :class="[defaultValClassName(value), xclass('init-text')]"
            v-show="value.length === 0">
          {{ defaultTxt }}
        </span>
        <ul
            class="z-ul"
            :class="[xclass('multiple')]"
            v-show="value.length !== 0">
          <li v-for="(txt, index) in text" :value="value[index]">
            <span>{{ txt }}</span>
            <span @click.stop="removeMultiSelected(value[index])">
              <icon kind="times"></icon>
            </span>
          </li>
        </ul>
      </template>
      <template v-else>
        <span :class="[defaultValClassName(value), xclass('init-text')]">
          {{ text }}
        </span>
      </template>

      <icon :class="[xclass('caret-down-icon')]" kind="caret-down"></icon>
    </div>

    <div
        :class="[xclass('menu')]"
        :style="selectMenuStyle"
        v-if="Array.isArray(option)"
        v-show="!selectMenuDisplay">
      <div
          @click.stop
          :class="[xclass('search-input')]"
          v-if="search">
        <icon kind="search"></icon>
        <input
            @input="_searchKeyup($event)"
            placeholder="请输入搜索值"
            type="text" />
      </div>

      <select-opt
          :multiple="multiple"
          :val-name="valName"
          :txt-name="txtName"
          :option="searchOptionDisplay ? searchOptionItem : option"
          :opt-root="me"
          :class="[xclass('opt-comp')]"
          ref="selectOption"></select-opt>
    </div>
    <div class="z-hide" :class="[xclass('option-slot')]">
      <slot></slot>
    </div>
  </div>
</div>