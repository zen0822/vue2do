<div class="table-data-stage {{theme | themeClass}}">
  <loading v-ref:loading></loading>

  <div class="table-wrap-stage">
    <table class="table-wrap js-table-wrap">
      <!-- render thead items -->
      <template v-if="thItems.length === 0">
        <tbody class="row-group js-header-group-slot hide"></tbody>
      </template>
      <template v-else>
        <thead class="header-group">
          <tr class="table-row">
            <td class="table-cell" v-for="item in thItems">{{ item }}</td>
          </tr>
        </thead>
      </template>
      <!-- / render thead items -->
      <!-- render tbody items -->
      <template v-if="displayItems.length === 0">
        <tbody v-show="trItems.length !== 0" class="row-group js-row-group-slot hide"></tbody>
      </template>
      <template v-else>
        <tbody class="row-group" v-show="trItems.length > 0">
          <tr class="table-row" v-for="trItem in trItems">
            <td class="table-cell" v-for="displayItem in displayItems">
              {{ trItem[displayItem] }}
            </td>
          </tr>
        </tbody>
      </template>
      <!-- / render tbody items -->
      <tbody v-show="trItems.length === 0&&emptyShow">
        <tr>
          <td :colspan="thLength || thItems.length">
            <div class="empty-data">{{ emptyDataText }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <pagination :display="pageItems.pages > 1" :page-data="pageItems"></pagination>
</div>
