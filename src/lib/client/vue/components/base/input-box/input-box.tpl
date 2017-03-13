<div
    class="input-box-stage {{theme | themeClass}} {{isTextarea ? 'textarea-stage' : ''}} {{ focusCls? 'editing-box': '' }}"
    v-show="!hidden">
  <div v-if="isText && addon" class="addon-stage">{{ addon }}</div>
  <div
      class="input-box-wrap"
      :class="{ editting: focusInput, 'error-border': errorBorderDisplay }">
    <div class="edit-box-left">
      <slot></slot>
    </div>
    <div class="edit-box">      
      <input
          :placeholder="placeholder"
          :type="type"
          @focus="focus"
          @blur="blur"
          @keyup.enter="keyup"
          :readonly="readOnly"
          :maxlength = "maxLength"
          v-if="isText"
          v-model="value"
          v-focus="focusInput" />

      <textarea
          :placeholder="placeholder"
          :readonly="readOnly"
          :maxlength = "maxLength"
          rows="{{ row }}"
          @focus="focus"
          @blur="blur"
          @keyup.enter="keyup"
          v-if="isTextarea"
          v-model="value"
          v-focus="focusInput"></textarea>
    </div>
    <div class="auto-completion" v-show="completionDisplay">
      <ul>
        <li
            v-for="item in completionItems"
            @click.stop="_clickCompletion(item, $index)">{{ item.text }}</li>
      </ul>
    </div>
  </div>
  <div class="danger-tip" transition="fade" v-show="dangerTipDisplay">{{ dangerTip }}</div>
  <div class="limit-txt" v-if="maxLength && showLimit"><em>{{limitLen}}</em> / <em>{{maxLength}}</em></div>
</div>