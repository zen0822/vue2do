<div class="component-list">
  <article class="example-article">
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
        <span @click="goAnchor">基本用法</span>
      </router-link>

      <!--<z-list
          page-type="more"
          page-trigger="click"
          auto
          pager
          class="z-m-t"
          :page-size="7"
          :item="testOpt">
        <template scope="props">
          <div>{{ props.item.text }}asdfkj 打发士大夫 asdfasdi  sdf 士大夫 asdf dafdf打发士大夫asdsf sadf</div>
        </template>
      </z-list>-->

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
  </article>
</div>