<div class="welcome">
  <scroller :height="400">
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

    <shift ref="shift" :index="1">
      <form-area slot="1" ref="formArea">
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
          <column :span="6">test3: </column>
          <column :span="6">
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
          </column>
        </row>

        <row :gap="10">
          <column :push="6" :span="6">test3: </column>
          <column :pull="6" :span="6">
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
          </column>
        </row>
        <row :gap="10">
          <column :span="12" :offset="6">
            <btn ref="submit" @click="submit">提交</btn>
          </column>
        </row>
      </form-area>

      <tab slot="2">
        <tab-ele slot="1" value="1" text="tab1">
          <btn @click="next">tab1</btn>
        </tab-ele>
        <tab-ele slot="2" value="2" text="tab2">
          <btn @click="next">tab2</btn>
        </tab-ele>
      </tab>

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
    </shift>

    <pop ref="pop">sadf</pop>
    <btn @click="next">next</btn>
  </scroller>
</div>