<div class="component-tip">
  <article class="example-article">
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('alert')">
        <span @click="goAnchor">弹窗提示</span>
      </router-link>

      <z-btn @click="tip">提示</z-btn>
    </section>
  </article>
</div>