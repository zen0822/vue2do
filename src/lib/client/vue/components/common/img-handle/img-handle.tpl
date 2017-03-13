<div class="img-handle-content">
	<div class="img-div" v-if="imgUrl">
		<span>
			<img :src="imgUrl" id="mainImg"
				@mousedown="mousedown($event)"
				@mousemove="mousemove($event)"
				@mouseup="mouseup($event)"
				@mousewheel="mousewheel($event)">
		</span>
	</div>
	<div class="handle-content" v-if="imgUrl">
		<div class="handle-img expand-img" @click="handleImg(1)"></div>
		<div class="handle-img narrow-img" @click="handleImg(2)"></div>
		<div class="handle-img rotate-img" @click="handleImg(3)"></div>
	</div>
	<div class="img-null" v-if="!imgUrl">
		<span>暂无照片</span>
	</div>
</div>