<div class="component-check">
  <article class="component-example-article">
    <section>
      <router-link
          class="component-anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
        <span @click="goAnchor">基本用法</span>
      </router-link>
      <z-check>提交</z-check>
    </section>
    <section>
      <router-link
          class="component-anchor-title"
          tag="h1"
          :to="anchorLink('kind')">
        <span @click="goAnchor">按钮种类</span>
      </router-link>
      <z-check>提交</z-check>
      <z-check kind="success">成功</z-check>
      <z-check kind="warning">提交</z-check>
    </section>
    <section>
      <router-link
          class="component-anchor-title"
          tag="h1"
          :to="anchorLink('custom')">
        <span @click="goAnchor">自定义按钮内容</span>
      </router-link>
      <z-check>
        <div>custom</div>
      </z-check>
    </section>
  </article>
</div>