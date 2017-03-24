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
              <icon kind="close"></icon>
            </span>
          </li>
        </ul>
      </template>
      <template v-else>
        <span :class="[defaultValClassName(value), xclass('init-text')]">
          {{ text }}
        </span>
      </template>

      <icon :class="[xclass('caret-down-icon')]" kind="spread"></icon>
    </div>

    <div
        :class="[xclass('menu')]"
        :style="selectMenuStyle"
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
          ref="selectOption"
          v-if="isCustomOption && Array.isArray(option)"
          :multiple="multiple"
          :val-name="valName"
          :txt-name="txtName"
          :option="searchOptionDisplay ? searchOptionItem : option"
          :opt-root="me"
          :class="[xclass('opt-comp')]">
        <template :slot="1" scope="props">
          <slot
              v-for="(item, index) in option"
              name="custom"
              :item="{
                index: index,
                data: item}">
          </slot>
        </template>
        <template :slot="2" scope="props">
          <div>{{props.item.index}}--custom</div>
        </template>
      </select-opt>

      <div
          v-else
          :class="[xclass('custom-option-slot')]">
        <scroller>
          <slot
              v-for="(item, index) in option"
              name="custom"
              :item="{
                index: index,
                data: item}">
          </slot>
        </scroller>
      </div>

      <div :class="[xclass('option-slot'), 'z-hide']">
        <slot></slot>
      </div>
    </div>
  </div>
</div>