<div class="component-table">
  <article class="example-article">
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
        <span @click="goAnchor">基本用法</span>
      </router-link>

      <z-table
          auto
          :thead="['test', 'name', 'en']"
          :tbody="testOpt">
        <template slot="thead" v-for="item in ['test', 'name', 'en']">
          <z-table-col>{{ item }}</z-table-col>
        </template>

        <template slot="tbody" scope="props">
          <z-table-col>{{ props.item.text }}</z-table-col>
          <z-table-col>{{ props.item.name }}</z-table-col>
          <z-table-col>{{ props.item.en }}</z-table-col>
        </template>
      </z-table>

      <z-code v-pre>&ltz-table
          auto
          :thead="['test', 'name', 'en']"
          :tbody="testOpt"&gt
        &lttemplate slot="thead" v-for="item in ['test', 'name', 'en']"&gt
          &ltz-table-col&gt{{ item }}&lt/z-table-col&gt
        &lt/template&gt

        &lttemplate slot="tbody" scope="props"&gt
          &ltz-table-col&gt{{ props.item.text }}&lt/z-table-col&gt
          &ltz-table-col&gt{{ props.item.name }}&lt/z-table-col&gt
          &ltz-table-col&gt{{ props.item.en }}&lt/z-table-col&gt
        &lt/template&gt
      &lt/z-table&gt</z-code>
    </section>
  </article>
</div>