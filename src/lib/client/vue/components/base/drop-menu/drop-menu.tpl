<div class="drop-menu-stage {{theme | themeClass}} {{!hideMenuItem ? 'selected' : ''}} {{multiple ? 'multiple-select-stage' : ''}}">
  <div class="read-only" v-show="readOnly"></div>
  <div class="selected-box" @click.stop="select">
    <template v-if="_isArray(text)">
      <span class="init-text" :class="{'gray': grayValue == value}" v-show="text.length === 0">{{ defaultText || '请选择'}}</span>
      <ul class="multiple-select" v-show="text.length !== 0">
        <li v-for="txt in text" track-by="$index" :value="value[$index]">
          <span>{{ txt }}</span>
          <icon @click.stop="_removeMultiSelected(value[$index])" name="times"></icon>
        </li>
      </ul>
    </template>
    <template v-else>
      <span class="init-text" :class="{'gray': grayValue == value}">{{ text }}</span>
    </template>

    <icon class="caret-down-icon" name="caret-down"></icon>
  </div>

  <div
      class="drop-menu-items"
      v-show="!hideMenuItem"
      :style="dropMenuItemStyle"
      v-if="optionItems && optionItems.length !== 0">

    <div class="search-input" v-if="searchFilter" @click.stop>
      <icon name="search"></icon>
      <input
          placeholder="请输入搜索值"
          type="text"
          @input="_searchKeyup($event)" />
    </div>

    <drop-option
        :val-name="valName"
        :txt-name="txtName"
        :search-filter = "searchFilter"
        :option-items="searchOptionDisplay ? searchOptionItems : optionItems"></drop-option>
  </div>
  <div class="hide drop-menu-items-slot">
    <slot></slot>
  </div>
</div>