<div class="p-select">
  <article class="example-article">
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
        <span @click="goAnchor">基本用法</span>
      </router-link>

      <p class="section-description">
        直接传入 init-opt
      </p>

      <z-select :init-opt="selectOpt"></z-select>

      <z-code>
&ltz-select :init-opt="selectOpt"&gt&lt/z-select&gt
      </z-code>
    </section>

    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('tag')">
        <span @click="goAnchor">添加子标签</span>
      </router-link>

      <p class="section-description">
        用直观的标签声明下拉框的数据
      </p>

      <z-select>
        <z-select-ele value="1">{{ testName }}</z-select-ele>
        <z-select-ele value="2">测试2</z-select-ele>
        <z-select-ele value="3">测试222</z-select-ele>
        <z-select-ele value="4">测试3</z-select-ele>
        <z-select-ele value="5">测试4</z-select-ele>
      </z-select>

      <z-code>&ltz-select&gt
  &ltz-select-ele value="1"&gt{{ testName }}&lt/z-select-ele&gt
  &ltz-select-ele value="2"&gt测试2&lt/z-select-ele&gt
  &ltz-select-ele value="3"&gt测试222&lt/z-select-ele&gt
  &ltz-select-ele value="4"&gt测试3&lt/z-select-ele&gt
  &ltz-select-ele value="5"&gt测试4&lt/z-select-ele&gt
&lt/z-select&gt</z-code>
    </section>

    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('custom')">
        <span @click="goAnchor">自定义下拉框内容</span>
      </router-link>

      <p class="section-description">
        用自定义标签声明下拉框的数据
      </p>

      <z-select :init-opt="selectOpt">
        <template slot="custom" scope="props">
          <z-select-ele>{{ props.item.text }}-custom</z-select-ele>
        </template>
      </z-select>

      <z-code v-pre>
&ltz-select :init-opt="selectOpt"&gt
  &lttemplate slot="custom" scope="props"&gt
      &ltz-select-ele&gt{{ props.item.text }}-custom&lt/z-select-ele&gt
    &lt/template&gt
&lt/z-select&gt</z-code>
    </section>

    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('classify')">
        <span @click="goAnchor">分类下拉选择</span>
      </router-link>

      <z-select
          :select-all="true"
          :classify="[{
            key: 'recent',
            text: '最近'
          }, {
            key: 'hot',
            text: '热门'
          }]"
          :classify-opt="classifyOpt"></z-select>

      <z-code>
&ltz-select
    :select-all="true"
    :init-val="[1, 3]"
    :classify="[{
      key: 'recent',
      text: '最近'
    }, {
      key: 'hot',
      text: '热门'
    }]"
    :classify-opt="classifyOpt"&gt&lt/z-select&gt
      </z-code>
    </section>

    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('multiple')">
        <span @click="goAnchor">多选下拉框</span>
      </router-link>

      <z-select
          multiple
          :init-opt="selectOpt"></z-select>

      <z-code>
&ltz-select
    :multiple="true"
    :init-opt="selectOpt"&gt&lt/z-select&gt
      </z-code>
    </section>

    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('search')">
        <span @click="goAnchor">搜索功能</span>
      </router-link>

      <z-select search :init-opt="selectOpt"></z-select>

      <z-code>
&ltz-select search :init-opt="selectOpt"&gt&lt/z-select&gt
      </z-code>
    </section>

    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('init')">
        <span @click="goAnchor">指定选定下拉选项</span>
      </router-link>

      <z-select
          :init-val="2"
          :init-opt="selectOpt"></z-select>

      <z-code>
&ltz-select :init-val="1" :init-opt="selectOpt"&gt&lt/z-select&gt
      </z-code>
    </section>
  </article>
</div>