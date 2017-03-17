<div class="welcome">
  <article class="example-article">
    <section>
      <h1 class="anchor-title" id="z-btn-component">
        <a href="#z-btn-component">按钮组件</a>
      </h1>
      <z-btn>提交</z-btn>
      <z-btn kind="success">成功</z-btn>
      <z-btn kind="warning">提交</z-btn>
    </section>

    <section>
      <h1 class="anchor-title" id="select-component">
        <a href="#select-component">下拉框组件</a>
      </h1>
      <z-select
          :multiple="true"
          :search="true"
          :select-all="true"
          :init-val="initVal">
        <z-select-ele value="1">{{ testName }}</z-select-ele>
        <z-select-ele value="2">测试2</z-select-ele>
        <z-select-ele value="3">测试222</z-select-ele>
        <z-select-ele value="4">测试3</z-select-ele>
        <z-select-ele value="5">测试4</z-select-ele>
      </z-select>

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
      <h1 class="anchor-title" id="form-component">
        <a href="#form-component">表单组件</a>
      </h1>

      <z-form slot="1" ref="formArea">
          <z-row :gap="10">
            <z-col :span="6">test2: </z-col>
            <z-col :span="6">
              <z-select
                  :init-opt="dropMenuOpt"
                  :init-val="2"
                  :opt-processor="optProcessor"
                  query-name="test3"></z-select>
            </z-col>
          </z-row>

          <z-row :gap="10">
            <z-col :span="6">name: </z-col>
            <z-col :span="6">
              <z-input
                  number
                  init-val="test-input"
                  query-name="name">
              </z-input>
            </z-col>
          </z-row>

          <z-row :gap="10">
            <z-col :offset="6">
              <z-btn ref="submit" @click="submit">提交</z-btn>
            </z-col>
          </z-row>
        </z-form>
    </section>

    <section>
      <h1 class="anchor-title" id="list-component">
        <a href="#list-component">列表组件</a>
      </h1>
      <z-list
          page-type="more"
          page-trigger="click"
          scroller-auto-hide
          auto
          pager
          :page-size="7"
          :item="dropMenuOpt"
          class="z-m-t">
        <template scope="props">
          <div>{{ props.item.text }}</div>
        </template>
      </z-list>
    </section>

    <section>
      <h1 class="anchor-title" id="table-component">
        <a href="#table-component">表格组件</a>
      </h1>
      <z-table
          auto
          :thead="['test', 'name', 'en']"
          :tbody="dropMenuOpt">
        <template slot="thead" v-for="item in ['test', 'name', 'en']">
          <z-table-col>{{ item }}</z-table-col>
        </template>

        <template slot="tbody" scope="props">
          <z-table-col>{{ props.item.text }}</z-table-col>
          <z-table-col>{{ props.item.name }}</z-table-col>
          <z-table-col>{{ props.item.en }}</z-table-col>
        </template>
      </z-table>
    </section>

    <section>
      <h1 class="anchor-title" id="layout-component">
        <a href="#layout-component">布局组件</a>
      </h1>
      <z-row :gap="10">
        <z-col :span="6" :m=4 :xs="12">name: </z-col>
        <z-col :span="4" :m="4" :s="8">
          <z-input
              number
              init-val="test-input"
              query-name="test">
          </z-input>
        </z-col>
        <z-col :span="2" :m="4" :s="4">
          <z-input init-val="test-input" query-name="test"></z-input>
        </z-col>
      </z-row>
      <z-row :gap="10">
        <z-col :grid="{xs: 10, s: 8}" :m="4" :xs="12" :span="6">test1: </z-col>
        <z-col :span="6">
          <z-select
              @click="clickIcon"
              query-name="test2"
              init-val="2">
            <z-select-ele value="1">{{ testName }}</z-select-ele>
            <z-select-ele value="2">测试2</z-select-ele>
          </z-select>
        </z-col>
      </z-row>

      <z-row :gap="10">
        <z-col :push="6" :span="6">test3: </z-col>
        <z-col :pull="6" :span="6">test3: </z-col>
      </z-row>
      <z-row :gap="10">
        <z-col :span="12" :offset="6">
          <z-btn ref="submit" @click="submit">提交</z-btn>
        </z-col>
      </z-row>
    </section>

    <section>
      <h1 class="anchor-title" id="shift-component">
        <a href="#shift-component">切换组件</a>
      </h1>

      <z-shift ref="shift" :index="1">


      </z-shift>

      <z-pop ref="pop">sadf</z-pop>
      <z-btn @click="next">next</z-btn>
    </section>

    <section>
      <h1 class="anchor-title" id="tab-component">
        <a href="#tab-component">选项卡组件</a>
      </h1>

      <article>
        <h3>可以嵌套自定义组件</h3>
        <z-tab slot="2">
          <z-tab-ele slot="1" value="1" text="tab1">
            <z-btn @click="next">tab1</z-btn>
          </z-tab-ele>
          <z-tab-ele slot="2" value="2" text="tab2">
            <z-btn @click="next">tab2</z-btn>
          </z-tab-ele>
        </z-tab>
      </article>

      <article>
        <h3>传入初始化数据</h3>
        <z-tab
            slot="3"
            :init-opt="[{
              value: 1,
              text: 'tab-1-1'
            }, {
              value: 2,
              text: 'tab-1-2'
            }, {
              value: 3,
              text: 'tab-1-3'
            }]"></z-tab>
      </article>
    </section>
  </article>
</div>