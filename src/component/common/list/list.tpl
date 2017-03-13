<div :class="[themeClass, xclass('stage')]">
  <loading :bg-display="true" v-ref:loading></loading>

  <ul>
    <li v-for="item in listItems">
      <slot></slot>
    </li>
  </ul>
</div>
