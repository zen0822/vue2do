<div class="search-menu-input {{ theme | themeClass }}">
  <div class="input-stage clearfix">
    <drop-menu
      theme="s-drop-menu"
    	:option-items="menuData"
    	v-ref:sourcemenukey
    	:query-name="queryName">
		</drop-menu>
    <input-box
    	:placeholder="placeholder"
    	v-ref:sourcemenuval>
    </input-box>
    
    <div class="icon-warp">
      <icon name="search"></icon>
    </div>
  </div>
</div>