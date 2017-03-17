<div class="welcome">
  <row>
    <column :span="3">
      <menu></menu>
    </column>
    <column :span="9">
      <article class="example-article">
        <section>
          <h1 class="anchor-title" id="btn-component">
            <a href="#btn-component">按钮组件</a>
          </h1>
          <btn>提交</btn>
          <btn kind="success">成功</btn>
          <btn kind="warning">提交</btn>
        </section>

        <section>
          <h1 class="anchor-title" id="select-component">
            <a href="#select-component">下拉框组件</a>
          </h1>
          <drop-menu
              :multiple="true"
              :search="true"
              :select-all="true"
              :init-val="initVal">
            <drop-menu-ele value="1">{{ testName }}</drop-menu-ele>
            <drop-menu-ele value="2">测试2</drop-menu-ele>
            <drop-menu-ele value="3">测试222</drop-menu-ele>
            <drop-menu-ele value="4">测试3</drop-menu-ele>
            <drop-menu-ele value="5">测试4</drop-menu-ele>
          </drop-menu>

          <drop-menu
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
              :classify-opt="classifyOpt"></drop-menu>
        </section>

        <section>
          <h1 class="anchor-title" id="form-component">
            <a href="#form-component">表单组件</a>
          </h1>

          <form-area slot="1" ref="formArea">
              <row :gap="10">
                <column :span="6">test2: </column>
                <column :span="6">
                  <drop-menu
                      :init-opt="dropMenuOpt"
                      :init-val="2"
                      :opt-processor="optProcessor"
                      query-name="test3"></drop-menu>
                </column>
              </row>

              <row :gap="10">
                <column :span="6">name: </column>
                <column :span="6">
                  <input-box
                      number
                      init-val="test-input"
                      query-name="name">
                  </input-box>
                </column>
              </row>

              <row>
                <column :offset="6">
                  <btn ref="submit" @click="submit">提交</btn>
                </column>
              </row>
            </form-area>
        </section>

        <section>
          <h1 class="anchor-title" id="list-component">
            <a href="#list-component">列表组件</a>
          </h1>
          <list
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
          </list>
        </section>

        <section>
          <h1 class="anchor-title" id="table-component">
            <a href="#table-component">表格组件</a>
          </h1>
          <table-data
              auto
              :thead="['test', 'name', 'en']"
              :tbody="dropMenuOpt">
            <template slot="thead" v-for="item in ['test', 'name', 'en']">
              <table-col>{{ item }}</table-col>
            </template>

            <template slot="tbody" scope="props">
              <table-col>{{ props.item.text }}</table-col>
              <table-col>{{ props.item.name }}</table-col>
              <table-col>{{ props.item.en }}</table-col>
            </template>
          </table-data>
        </section>

        <section>
          <h1 class="anchor-title" id="layout-component">
            <a href="#layout-component">布局组件</a>
          </h1>
          <row :gap="10">
            <column :span="6" :m=4 :xs="12">name: </column>
            <column :span="4" :m="4" :s="8">
              <input-box
                  number
                  init-val="test-input"
                  query-name="test">
              </input-box>
            </column>
            <column :span="2" :m="4" :s="4">
              <input-box init-val="test-input" query-name="test"></input-box>
            </column>
          </row>
          <row :gap="10">
            <column :grid="{xs: 10, s: 8}" :m="4" :xs="12" :span="6">test1: </column>
            <column :span="6">
              <drop-menu
                  @click="clickIcon"
                  query-name="test2"
                  init-val="2">
                <drop-menu-ele value="1">{{ testName }}</drop-menu-ele>
                <drop-menu-ele value="2">测试2</drop-menu-ele>
              </drop-menu>
            </column>
          </row>

          <row :gap="10">
            <column :push="6" :span="6">test3: </column>
            <column :pull="6" :span="6">test3: </column>
          </row>
          <row :gap="10">
            <column :span="12" :offset="6">
              <btn ref="submit" @click="submit">提交</btn>
            </column>
          </row>
        </section>

        <section>
          <h1 class="anchor-title" id="shift-component">
            <a href="#shift-component">切换组件</a>
          </h1>

          <shift ref="shift" :index="1">


          </shift>

          <pop ref="pop">sadf</pop>
          <btn @click="next">next</btn>
        </section>

        <section>
          <h1 class="anchor-title" id="tab-component">
            <a href="#tab-component">选项卡组件</a>
          </h1>

          <article>
            <h3>可以嵌套自定义组件</h3>
            <tab slot="2">
              <tab-ele slot="1" value="1" text="tab1">
                <btn @click="next">tab1</btn>
              </tab-ele>
              <tab-ele slot="2" value="2" text="tab2">
                <btn @click="next">tab2</btn>
              </tab-ele>
            </tab>
          </article>

          <article>
            <h3>传入初始化数据</h3>
            <tab
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
                }]"></tab>
          </article>
        </section>
      </article>
    </column>
  </row>






</div>