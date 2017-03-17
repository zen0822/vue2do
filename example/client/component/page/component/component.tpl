<div class="welcome">
  <z-row :gap="30" align="start">
    <z-col :span="3">
      <z-fold>
        <z-fold-title slot="title-1">
          fold-title-1
        </z-fold-title>
        <z-fold-content slot="content-1">
          <z-btn kind="success">{{ testName }}</z-btn>
        </z-fold-content>

        <z-fold-content slot="content-2" title="test-fold-2">
          <z-btn kind="success">{{ testName }}</z-btn>
        </z-fold-content>

        <z-fold-title slot="title-3">
          fold-title-1
        </z-fold-title>
        <z-fold-content slot="content-3">
          <z-btn kind="success">{{ testName }}</z-btn>
        </z-fold-content>
      </z-fold>
    </z-col>
    <z-col :span="9">
      <router-view></router-view>
    </z-col>
  </z-row>
</div>