<div :class="[cPrefix]">
  <div
      v-show="!hidden"
      :class="stageClass.concat(xclass(['stage', themeClass]))">
    <div v-if="isText && addon" :class="[xclass('addon-stage')]">{{ addon }}</div>
    <div :class="wrapClass">
      <div :class="[xclass('edit-box-left')]">
        <slot></slot>
      </div>
      <div :class="[xclass('edit-box')]">
        <input
            v-model="value"
            v-if="isText"
            v-focus="focusing"
            @focus="focus"
            @blur="blur"
            @keyup="keyup"
            :placeholder="placeholder"
            :readonly="readOnly"
            :maxlength = "maxLength" />

        <textarea
            v-model="value"
            v-if="isTextarea"
            v-focus="focusing"
            @focus="focus"
            @blur="blur"
            @keyup="keyup"
            :placeholder="placeholder"
            :readonly="readOnly"
            :maxlength = "maxLength"
            :rows="row"></textarea>
      </div>
      <div :class="[xclass('auto-completion')]" v-show="completionDisplay">
        <ul>
          <li
              v-for="item in completionItems"
              @click.stop="_clickCompletion(item, $index)">{{ item.text }}</li>
        </ul>
      </div>
    </div>
    <div
        :class="[xclass('danger-tip')]"
        transition="fade"
        v-show="dangerTipDisplay">{{ dangerTip }}</div>
    <div
        :class="[xclass('limit-txt')]"
        v-if="maxLength && textLengthTip">
      <span>{{limitLen}}</span> / <span>{{maxLength}}</span>
    </div>
  </div>
</div>