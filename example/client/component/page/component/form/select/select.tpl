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

      <z-select :init-opt="dropMenuOpt"></z-select>
    </section>

    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
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
    </section>

    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
        <span @click="goAnchor">自定义下拉框内容</span>
      </router-link>

      <p class="section-description">
        用自定义标签声明下拉框的数据
      </p>

      <z-select :init-opt="dropMenuOpt">
        <template slot="custom" scope="props">
          <z-select-ele>{{ props.item.text }}-custom</z-select-ele>
        </template>
      </z-select>
    </section>

    <!--<section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('classify')">
        <span @click="goAnchor">分类下拉选择</span>
      </router-link>

      <z-select
          :multiple="true"
          :search="true"
          :select-all="true"
          :init-val="[1, 3]"
          :classify="[{
            key: 'recent',
            text: '最近'
          }, {
            key: 'hot',
            text: '热门'
          }]"
          :classify-opt="classifyOpt"></z-select>
    </section>
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('custom')">
        <span @click="goAnchor">自定义按钮内容</span>
      </router-link>
      <z-select>
        <div>custom</div>
      </z-select>
    </section>-->
  </article>
</div>