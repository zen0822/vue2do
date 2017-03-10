<div class="search-tool-stage {{ theme | themeClass }}">
  <slot></slot>
  <div v-if="inputDisplay" class="input-stage">
    <icon name="search"></icon>
    <input-box :placeholder="placeholder" :query-name="queryName" @keyup.enter="search"></input-box>
  </div>
  <a v-if="searchBtnDisplay" class="btn btn-danger search-btn" @click="search">搜索</a>
</div>