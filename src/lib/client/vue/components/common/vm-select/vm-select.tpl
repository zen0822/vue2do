<div class="btn-group btn-group-justified vm-select">
	<div class="select-box">
		<button class="form-control dropdown-toggle slect-toggle" 
		@click.stop="isOpen($event)" 
		data-value="{{selectedVal}}"
		:class="{'gray': (selectedVal == grayValue) || !selectedVal}">
			<span class="btn-content">{{selectedName ? selectedName : '请选择'}}</span>
			<span class="caret"></span>
		</button>
		<div class="dropdown-menu slect-toggle-menu">
			<div class="bs-searchbox" v-if="searchShow">
				<input type="text" v-model="search" class="form-control"/>
				<span class="close"></span>
			</div>
			<div class="v-select">				
				<template v-if="optionGroup">
					<div v-for="option in optionArr"  
						track-by="$index" 
						v-show="optionArr && optionArr.length > 0" 
						class="flag">
						<h4 data-value="{{option[optionGroupKey.pid]}}">{{option[optionGroupKey.pkey]}}</h4>
						<p v-for="subOption in option[optionGroupKey.subArrKey]" 
						data-value="{{subOption[optionGroupKey.subValKey]}}" 
						@click.stop="addVal($event, subOption[optionGroupKey.subValKey], subOption[optionGroupKey.subNameKey])">
							<span class="sel-txt">{{subOption[optionGroupKey.subNameKey]}}</span>
							<span 
								class="glyphicon glyphicon-ok check-mark" 
								:class="{'hide': !initSelect(subOption[optionGroupKey.subValKey])}"
								>
							</span>
						</p>
					</div>
					<div v-show="!optionArr || optionArr.length == 0">
						<p @click="clearVal">暂无数据</p>
					</div>
				</template>

				<template v-if="!optionGroup">
					<template v-if="ajax">
						<div v-for="option in optionArr" 
							track-by="$index" 
							v-show="optionArr && optionArr.length > 0"
							class="flag">
							<p data-value="{{option[ajaxKey.key]}}" 
								@click.stop="addVal($event, option[ajaxKey.key],  option[ajaxKey.text])">
								<span class="sel-txt">{{option[ajaxKey.text]}}</span>
								<span class="glyphicon glyphicon-ok check-mark" 
									:class="{'hide': !initSelect(option[ajaxKey.key])}"
									></span>
							</p>
						</div>
						<div v-show="!optionArr || optionArr.length == 0">
							<p @click="clearVal">暂无数据</p>
						</div>
					</template>
					<template v-if="!ajax">
						<div v-for="option in backSearch" 
							track-by="$index" 
							v-show="backSearch && backSearch.length > 0"
							class="flag">
							<p data-value="{{option.key}}" 
								@click.stop="addVal($event, option.key, option.text)">
								<span class="sel-txt">{{option.text}}</span>
								<span class="glyphicon glyphicon-ok check-mark" 
									:class="{'hide': !initSelect(option.key)}"
									></span>
							</p>
						</div>
						<div v-show="!backSearch || backSearch.length == 0">
							<p @click="clearVal">暂无数据</p>
						</div>
					</template>				
				</template>		
				</div>

			</div>
		</div>
  </div>
</div>