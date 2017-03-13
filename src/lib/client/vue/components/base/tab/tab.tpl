<div class="tab-stage {{themeClass}}">
  <ul class="tab-item-ul">
    <li
        v-for="item in items"
        @click="select($index)"
        class="item"
        :class="{active: isActive($index)}">
      {{item.text}}
    </li>
  </ul>

  <div class="hide tab-items-slot"></div>
</div>