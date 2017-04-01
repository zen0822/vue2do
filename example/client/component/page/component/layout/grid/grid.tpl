<div class="component-grid">
  <article class="example-article">
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
        <span @click="goAnchor">基本用法</span>
      </router-link>

      <z-row :gap="10">
        <z-col :l="4" :xs="12">name: </z-col>
        <z-col :l="4" :xs="8">
          <z-input
              number
              init-val="test-input"
              query-name="test">
          </z-input>
        </z-col>
        <z-col :l="4" :xs="4">
          <z-input init-val="test-input" query-name="test"></z-input>
        </z-col>
      </z-row>

      <z-row :gap="10">
        <z-col :l="4" :xs="12">test1: </z-col>
        <z-col :l="8" :xs="12">
          <z-select
              query-name="test2"
              init-val="2">
            <z-select-ele value="1">{{ testName }}</z-select-ele>
            <z-select-ele value="2">测试2</z-select-ele>
          </z-select>
        </z-col>
      </z-row>
    </section>
  </article>
</div>