<div class="welcome">
  <z-row :gap="30" align="start">
    <z-col :span="3">
      <z-menu :init-opt="menuOpt"></z-menu>
    </z-col>
    <z-col :span="9">
      <router-view></router-view>
    </z-col>
  </z-row>
</div>