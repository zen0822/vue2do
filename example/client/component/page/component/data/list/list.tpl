<div class="component-list">
  <article class="example-article">
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
        <span @click="goAnchor">基本用法</span>
      </router-link>

      <z-list
          page-type="more"
          page-trigger="click"
          scroller-auto-hide
          auto
          pager
          class="z-m-t"
          :page-size="7"
          :item="testOpt">
        <template scope="props">
          <div>{{ props.item.text }}</div>
        </template>
      </z-list>
    </section>
  </article>
</div>