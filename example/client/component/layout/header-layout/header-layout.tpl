<div class="header-layout-stage">
  <row class="nav-box">
    <column :span="8">
      <img class="logo-box" :src="logoUrl" />
    </column>
    <column :span="4">
    <row class="nav-menu-box">
      <column>
        <router-link to="/component">组件</router-link>
      </column>
      <column>
        <router-link to="/build">构建</router-link>
      </column>
      <column>
        <router-link to="/about">关于</router-link>
      </column>
    </row>
  </column>
  </row>
</div>