<div :class="[cPrefix]">
  <div v-xclass="xclass(['stage', themeClass])">
    <div v-xclass="xclass('read-only')" v-show="readOnly"></div>
    <ul class="z-ul" v-xclass="xclass('opt-ul')">
      <li class="z-li" v-if="checkAll">
        <div @click="checkAllOption" v-xclass="xclass('opt-check-all')">
          <icon size="m" :kind="checkedAll ? 'check-square' : 'square-o'"></icon>
          <span v-xclass="xclass('lable')">全选</span>
        </div>
      </li>
      <li
          class="z-li"
          v-for="item in option"
          v-xclass="xclass('opt-li')">
        <div
            @click="check($event, item[valName])"
            v-xclass="xclass('box')">
          <icon size="m" :kind="iconName(item[valName])"></icon>
          <span v-if="item[txtName]" v-xclass="xclass('lable')">{{ item[txtName] }}</span>
        </div>
      </li>
    </ul>
    <div class="z-hide" v-xclass="xclass('opt-slot')">
      <slot></slot>
    </div>
  </div>
</div>