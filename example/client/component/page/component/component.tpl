<div class="p-component">
  <z-row :gap="30" align="start">
    <z-col :span="3" :xs="12">
      <z-menu
          class="p-component-menu"
          title="组件导航"
          trigger="show"
          :init-opt="menuOpt"></z-menu>
    </z-col>
    <z-col :span="9" :xs="12" class="p-component-stage">
      <router-view></router-view>
    </z-col>
  </z-row>
</div>