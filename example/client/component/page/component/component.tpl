<div class="p-component">
  <z-row :gap="30" align="start">
    <z-col :xs="12" :s="12" :l="3">
      <z-nav
          type="vertical"
          class="p-component-menu"
          title="组件导航"
          trigger="show"
          spread-all
          :init-opt="menuOpt"></z-nav>
    </z-col>
    <z-col :xs="12" :s="12" :l="9" class="p-component-stage">
      <router-view></router-view>
    </z-col>
  </z-row>
</div>