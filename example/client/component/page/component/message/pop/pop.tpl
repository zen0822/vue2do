<div class="component-pop">
  <article class="example-article">
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('confirm')">
        <span @click="goAnchor">确认弹窗</span>
      </router-link>

      <z-btn @click="confirm">确认</z-btn>
    </section>
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('alert')">
        <span @click="goAnchor">弹窗</span>
      </router-link>

      <z-btn @click="alert">弹窗</z-btn>
    </section>
  </article>
</div>