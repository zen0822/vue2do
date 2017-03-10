<div :class="[cPrefix, this.xclass(themeClass)]">
  <loading ref="loading"></loading>

  <div class="table-wrap-stage">
    <table class="table-wrap js-table-wrap">
      <!-- thead -->
      <thead v-if="thead.length === 0" class="header-group">
        <tr class="table-row">
          <slot name="thead"></slot>
        </tr>
      </thead>
      <thead v-else class="header-group">
        <tr class="table-row">
          <th v-for="item in theadItem">{{ item }}</th>
        </tr>
      </thead>
      <!-- / thead -->

      <tbody>
        <tr class="table-row" v-for="(item, index) in tbodyItem">
          <slot
              name="tbody"
              :index="index"
              :item="item">
          </slot>
        </tr>
      </tbody>
    </table>
  </div>

  <page :data="pageData"></page>
</div>