<div class="component-input">
  <article class="component-example-article">
    <section>
      <router-link
          class="component-anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
        <span @click="goAnchor">基本用法</span>
      </router-link>
      <z-input>提交</z-input>
    </section>
    <section>
      <router-link
          class="component-anchor-title"
          tag="h1"
          :to="anchorLink('kind')">
        <span @click="goAnchor">按钮种类</span>
      </router-link>
      <z-input>提交</z-input>
      <z-input kind="success">成功</z-input>
      <z-input kind="warning">提交</z-input>
    </section>
    <section>
      <router-link
          class="component-anchor-title"
          tag="h1"
          :to="anchorLink('custom')">
        <span @click="goAnchor">自定义按钮内容</span>
      </router-link>
      <z-input>
        <div>custom</div>
      </z-input>
    </section>
  </article>
</div>