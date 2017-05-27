<div class="component-table">
  <article class="example-article">
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
        <span @click="goAnchor">基本用法</span>
      </router-link>

      <z-table>
        <template slot="thead" v-for="item in ['名字', '类型', '可选值', '说明']">
          <z-table-col>{{ item }}</z-table-col>
        </template>

        <z-table-row slot="1">
          <z-table-col>display</z-table-col>
          <z-table-col>布尔值</z-table-col>
          <z-table-col>true</z-table-col>
          <z-table-col>分页的显示状态</z-table-col>
        </z-table-row>
        <z-table-row slot="2">
          <z-table-col>display2</z-table-col>
          <z-table-col>布尔值</z-table-col>
          <z-table-col>false</z-table-col>
          <z-table-col></z-table-col>
        </z-table-row>
        <z-table-row slot="3">
          <z-table-col>display3</z-table-col>
          <z-table-col>布尔值</z-table-col>
          <z-table-col>true</z-table-col>
          <z-table-col>显示</z-table-col>
        </z-table-row>
      </z-table>

      <z-code v-pre>&ltz-table
    auto
    list
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

    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('list')">
        <span @click="goAnchor">展示列表化的表格数据</span>
      </router-link>

      <z-table
          auto
          list
          :pageSize="10"
          :thead="['test', 'name', 'en']"
          :tbody="testOpt">
        <template slot="thead">
          <z-table-col max-width="33px">test</z-table-col>
          <z-table-col max-width="33px">name</z-table-col>
          <z-table-col max-width="33px">en</z-table-col>
        </template>

        <template slot="tbody" scope="props">
          <z-table-col>{{ props.item.text }}</z-table-col>
          <z-table-col>{{ props.item.name }}</z-table-col>
          <z-table-col>{{ props.item.en }}</z-table-col>
        </template>
      </z-table>

      <z-code v-pre>&ltz-table
    auto
    list
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