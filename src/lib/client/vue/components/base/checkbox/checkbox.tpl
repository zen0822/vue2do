<div class="checkbox-group clearfix {{theme | themeClass}}">
  <div class="read-only" v-show="readOnly"></div>
  <ul class="checkbox-item-ul">
    <li v-if="selectAllFunction">
      <div @click="selectAll" class="checkbox-select-all">
        <icon size="m" :name="selectAllCheckbox ? 'check-square' : 'square-o'"></icon>
        <span class="check-lable">全选</span>
      </div>
    </li>
    <li
        class="item"
        v-for="item in checkboxItems">
      <div @click="_click($event, item[valName])" class="checkbox-stage">
        <icon size="m" :name="_iconName(item[valName])"></icon><span class="check-lable">{{ item[txtName] }}</span>
      </div>
    </li>
  </ul>
  <div class="hide checkbox-items-slot"></div>
</div>