<div class="p-component">
  <z-row :gap="30" align="start">
    <z-col :span="3" :s="12" :xs="12">
      <z-menu class="p-component-menu" :init-opt="menuOpt"></z-menu>
    </z-col>
    <z-col :span="9" :s="12" :xs="12">
      <router-view></router-view>
    </z-col>
  </z-row>
</div>