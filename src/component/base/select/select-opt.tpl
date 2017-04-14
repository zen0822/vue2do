<div
    :class="{'search-option-wrap': $parent.searchFilter }"
    v-xclass="xclass(['ul', themeClass])">
  <div
      @click.stop="$parent.selectAllOption"
      v-if="$parent.selectAll"
      v-xclass="xclass('li')">
    <check
				type="checkbox"
        :init-val="$parent.selectedAll ? [-1] : []"
        :init-opt="selectedAllCheckOpt">
    </check>
    <span>{{ $parent.selectAllTxt }}</span>
  </div>

  <list
			:class="xclass('list')"
			:item="option"
			:page-size="3"
			auto
			page-type="more"
			pager
			theme="default">
		<template scope="props">
			<div
					:class="liClass(props.item.classify, props.item.value)"
					@click.stop="selectOption(props.item, props.index)">
				<check
						v-if="multiple && !props.item.classify"
						theme="default"
						type="checkbox"
						:init-val="optRoot.checkboxVal(props.item[valName])"
						:init-opt="selectedAllCheckOpt">
				</check>

				<slot :name="props.index" :item="props">
					<span
							v-bubble="{
								text: props.item[txtName] && props.item[txtName].length > 9 ?
								props.item[txtName] :
								''
							}">
						{{ props.item[txtName] }}
					</span>
				</slot>

				<icon v-if="hasSubOption(props.item)" kind="caret-right"></icon>
				<select-opt
						:multiple="multiple"
						:option="props.item.sub"
						:opt-root="optRoot"
						v-if="hasSubOption(props.item)"></select-opt>
			</div>
		</template>
  </list>
</div>