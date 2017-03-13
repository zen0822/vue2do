<div
    :class="[cPrefix, xclass(themeClass)]"
    v-show="pageDisplay">
  <div class="cursor-pointer page-count">
    共{{pageData.total}}条
  </div>
  <div
      class="cursor-pointer"
      :class="{ 'visible': hidePretPage }"
      v-on:click="clickPage(parseInt(pageData.current) - 1)">
    <icon kind="caret-left"></icon>上一页
  </div>
  <ul class="pagination-page-box">
    <li
        class="page-item"
        v-for="index in indexs"
        :class="{ 'active': parseInt(pageData.current) === index }"
        @click="clickPage(index)">
      {{ index }}
    </li>
  </ul>
  <div
      class="cursor-pointer"
      :class="{ 'invisible': hideNextPage }"
      @click="clickPage(parseInt(pageData.current) + 1)">
    下一页 <icon kind="caret-right"></icon>
  </div>

  <div class="page-search">
    <span class="page-count">共 {{ pageData.pages }} 页</span>
    第
    <input-box class="page-current" :value.sync="jump"></input-box>
    页
    <btn class="go-btn" kind="default" @click="jumpCurrent(jump)" value="GO"></btn>
  </div>
</div>