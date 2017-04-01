<div class="component-page">
  <article class="example-article">
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
        <span @click="goAnchor">基本用法</span>
      </router-link>
      <z-page>提交</z-page>
    </section>
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('kind')">
        <span @click="goAnchor">按钮种类</span>
      </router-link>
      <z-page>提交</z-page>
      <z-page kind="success">成功</z-page>
      <z-page kind="warning">提交</z-page>
    </section>
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('custom')">
        <span @click="goAnchor">自定义按钮内容</span>
      </router-link>
      <z-page>
        <div>custom</div>
      </z-page>
    </section>
  </article>
</div>