<div class="component-btn">
  <article class="example-article">
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
        <span @click="goAnchor">基本用法</span>
      </router-link>
      <z-btn>提交</z-btn>
    </section>
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('kind')">
        <span @click="goAnchor">按钮种类</span>
      </router-link>
      <z-btn>提交</z-btn>
      <z-btn kind="success">成功</z-btn>
      <z-btn kind="warning">提交</z-btn>
    </section>
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('custom')">
        <span @click="goAnchor">自定义按钮内容</span>
      </router-link>
      <z-btn>
        <div>custom</div>
      </z-btn>
    </section>
  </article>
</div>