<div class="page-layout">
  <aside-layout :menus="menus"></aside-layout>

  <div class="page-layout-wrap">
	  <bread-crumb v-ref:bread-crumb></bread-crumb>
    <div class="page-layout-content">
      <div class="page-layout-bg">
        <router-view></router-view>
      </div>
    </div>
  </div>
</div>