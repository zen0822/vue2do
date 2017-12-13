<div class="component-page">
  <article class="example-article">
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('basic')">
        <span @click="goAnchor">基本用法</span>
      </router-link>

      <p class="section-description">默认是点击数字的分页形式</p>

      <z-page :data="{
        length: 24,
        size: 5,
        total: 5,
        current: 2
      }"></z-page>

      <z-code v-pre>&ltz-page :data="{
  length: 24,
  size: 5,
  total: 5,
  current: 2
}">&lt/z-page&gt</z-code>
    </section>
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('more')">
        <span @click="goAnchor">加载更多的分页形式</span>
      </router-link>

      <z-page auto :data="pageData" type="more"></z-page>

      <z-code v-pre>&ltz-page auto :data="pageData" type="more"&gt&lt/z-page&gt</z-code>
    </section>
    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :to="anchorLink('auto')">
        <span @click="goAnchor">自动计算分页数据</span>
      </router-link>

      <z-page auto :data="{
        length: 24,
        size: 5
      }"></z-page>

      <z-code v-pre>&ltz-page auto :data="{
  length: 24,
  size: 5
}"&gt&lt/z-page&gt</z-code>
    </section>

    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :list="false"
          :to="anchorLink('props')">
        <span @click="goAnchor">props 数据类型</span>
      </router-link>

      <z-table
          border="row"
          auto
          :pageSize="10">
        <template slot="thead" v-for="item in ['名字', '类型', '可选值', '说明']">
          <z-table-col>{{ item }}</z-table-col>
        </template>

        <z-table-row slot="1">
          <z-table-col>auto</z-table-col>
          <z-table-col>Boolean</z-table-col>
          <z-table-col>(*false | true)</z-table-col>
          <z-table-col>分页的显示状态</z-table-col>
        </z-table-row>
        <z-table-row slot="2">
          <z-table-col>display</z-table-col>
          <z-table-col>Boolean</z-table-col>
          <z-table-col>(*false | true)</z-table-col>
          <z-table-col>分页的显示状态</z-table-col>
        </z-table-row>
        <z-table-row slot="3">
          <z-table-col>data</z-table-col>
          <z-table-col>Object</z-table-col>
          <z-table-col>——</z-table-col>
          <z-table-col>
            <p>分页数据</p>
            <ul>
              <li>length：一共有几条数据</li>
              <li>total：一共有多少页</li>
              <li>size：每页几条数据</li>
              <li>current：当前的页码</li>
            </ul>
          </z-table-col>
        </z-table-row>
        <z-table-row slot="4">
          <z-table-col>onePageDisplay</z-table-col>
          <z-table-col>布尔值</z-table-col>
          <z-table-col>(*false | true)</z-table-col>
          <z-table-col>分页总页数为 1 时是否显示</z-table-col>
        </z-table-row>
        <z-table-row slot="5">
          <z-table-col>size</z-table-col>
          <z-table-col>Boolean</z-table-col>
          <z-table-col>（s | *m | l）</z-table-col>
          <z-table-col>分页外观尺寸大小</z-table-col>
        </z-table-row>
        <z-table-row slot="6">
          <z-table-col>type</z-table-col>
          <z-table-col>Boolean</z-table-col>
          <z-table-col>（more | *num）</z-table-col>
          <z-table-col>
            <p>分页类型</p>
            <ul>
              <li>more：加载更多</li>
              <li>num：数字标注（默认）</li>
            </ul>
          </z-table-col>
        </z-table-row>
        <z-table-row slot="7">
          <z-table-col>loadMoreText</z-table-col>
          <z-table-col>String</z-table-col>
          <z-table-col>——</z-table-col>
          <z-table-col>
            加载更多的提示文字
          </z-table-col>
        </z-table-row>
      </z-table>
    </section>

    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :list="false"
          :to="anchorLink('events')">
        <span @click="goAnchor">events 事件</span>
      </router-link>

      <z-table
          border="row"
          auto
          :pageSize="10">
        <template slot="thead" v-for="item in ['名字', '返回值类型', '说明']">
          <z-table-col>{{ item }}</z-table-col>
        </template>

        <z-table-row slot="1">
          <z-table-col>switch</z-table-col>
          <z-table-col>Number</z-table-col>
          <z-table-col>切换页码触发的事件</z-table-col>
        </z-table-row>
      </z-table>
    </section>

    <section>
      <router-link
          class="anchor-title"
          tag="h1"
          :list="false"
          :to="anchorLink('slots')">
        <span @click="goAnchor">slots 内容分发</span>
      </router-link>

      <z-table
          border="row"
          auto
          :pageSize="10">
        <template slot="thead" v-for="item in ['名字', '返回值类型', '说明']">
          <z-table-col>{{ item }}</z-table-col>
        </template>

        <z-table-row slot="1">
          <z-table-col>loadMore</z-table-col>
          <z-table-col>分页类型为加载更多时的，在按钮处的内容分发</z-table-col>
        </z-table-row>
      </z-table>
    </section>
  </article>
</div>