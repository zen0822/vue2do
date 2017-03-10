<div class="list-data-stage {{theme | themeClass}}">
  <loading :bg-display="true" v-ref:loading></loading>

  <ul>
    <li v-for="item in listItems">
      <slot></slot>
    </li>
  </ul>

  <pagination :display="pageItems.pages > 1" :page-data="pageItems"></pagination>
</div>
