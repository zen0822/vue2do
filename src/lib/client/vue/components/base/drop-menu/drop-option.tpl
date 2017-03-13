<div class="option-ul" :class="{'search-option-wrap': searchFilter }">
  <div
      class="option-li"
      v-if="$parent.selectAllFunction">
    <div @click.stop="$parent.selectAll" class="option-select-all">
      <checkbox
          type="checkbox"
          :value="$parent.selectAllOption ? [1] : []"
          :checkbox-items="[{
            value: 1,
            text: ''
          }]">
      </checkbox>
      <span>{{ $parent.selectAllOptionTxt }}</span>
    </div>
  </div>

  <div
      class="option-li"
      v-for="item in optionItems"
      :class="[{'gray': item[valName]==-1}, {'classify-title': item.classify}]"
      @click.stop="selectItem(item, $index)">

    <checkbox
        v-if="$parent.$parent.multiple && !item.classify"
        theme="default"
        type="checkbox"
        :value="$parent.$parent._checkboxVal(item[valName])"
        :checkbox-items="[{
          value: -1,
          text: ''
        }]">
    </checkbox>

    <span
        v-bubble="{
          text: item[txtName] && item[txtName].length > 9 ?
                item[txtName] :
                ''
        }">
      {{ item[txtName] }}
    </span>

    <icon v-if="subOptionItem(item)" name="caret-right"></icon>
    <drop-option
        v-if="subOptionItem(item)"
        :option-items="item.optionItems"></drop-option>
  </div>
</div>