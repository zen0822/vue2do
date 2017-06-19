<div class="header-layout-stage">
  <z-row class="nav-box">
    <z-col :span="8">
      <router-link to="/">
        <img class="logo-box" :src="logoUrl" />
      </router-link>
    </z-col>
    <z-col :span="4">
      <z-row class="nav-menu-box">
        <z-col>
          <router-link to="/component">组件</router-link>
        </z-col>
        <z-col>
          <router-link to="/build">构建</router-link>
        </z-col>
        <z-col>
          <router-link to="/about">关于</router-link>
        </z-col>
      </z-row>
    </z-col>
  </z-row>

  <z-row class="nav-box nav-box-mobile">
    <z-col :span="4">
      <div @click.stop="showMenu">
        <z-icon kind="sort" v-show="sortIconDisplay"></z-icon>
      </div>
    </z-col>
    <z-col class="z-text-center" :span="4">
      <img class="logo-box" :src="logoUrl" />
    </z-col>
    <z-col :span="4" class="z-text-right">
      <div @click.stop="showMenu">
        <z-icon kind="search"></z-icon>
      </div>
    </z-col>
  </z-row>

  <z-menu
      class="mobile-menu"
      ref="mobileMenu"
      @hide="hideMenu"
      :autoSwitch="false"
      :init-opt="menuOpt">
    <div class="menu-search" slot="end">
      <z-input placeholder="search in vue2do">
        <z-icon slot="head" kind="search"></z-icon>
      </z-input>
    </div>
  </z-menu>
</div>