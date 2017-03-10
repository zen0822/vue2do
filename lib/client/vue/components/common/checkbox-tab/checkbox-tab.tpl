<div class="select-list clearfix {{theme}}">
					<div class="left pull-left">
						<h3>{{ leftTitle }}</h3>
						<div class="origin">
							<div class="search clearfix">
								<div class="check-all pull-left">
									<input type="checkbox" :checked="isLeftAllChecked()" @change="checkLeftAll($event)">全选
								</div>
								<div class="search-input pull-left">
									<icon name="search" class="pull-left"></icon>
    							<input-box :placeholder="placeholder"  class="pull-left"></input-box>
								</div>
							</div>
							<div class="checkbox-list">
								<p v-for="item in datas.list">
									<label><input type="checkbox" v-model="datas.selected" :value="item.value"><span>{{ item.text }}</span></label>
								</p>
								<div class="empty" v-if="datas.list.length == 0">
									暂无数据
								</div>
							</div>
						</div>
					</div>
					<div class="mid pull-left">
						<a href="javascript:void(0);" @click="moveLeft" class="left-angle">
							<icon name="angle-double-left"></icon>	
						</a>
						<a href="javascript:void(0);" @click="moveRight" class="right-angle">
							<icon name="angle-double-right"></icon>	
						</a>
					</div>
					<div class="right  pull-left">
						<h3>{{rightTitle}}</h3>
						<div class="seleted clearfix">
							<div class="check-all">
								<input type="checkbox" :checked="isRightAllChecked()" @change="checkRightAll($event)">全选
							</div>
							<div class="checkbox-list" >
								<p v-for="item in rightCheckData.list">
									<label><input type="checkbox" v-model="rightCheckData.selected" :value="item.value"><span>{{ item.text }}</span></label>
								</p>
								<div class="empty" v-if="rightCheckData.list.length == 0">
									暂无选择数据
								</div>
							</div>
						</div>
					</div>
				</div>