<div class="upload-box-stage">
  <div class="upload-img" v-if="isImg">
    <ul class="img-showcase-ul">
      <li v-for="item in uploadItems">
        <icon class="del-upload-item" name="times-circle" @click="delUploaded($index)"></icon>
        <div class="show-img">
          <img :src="item.url" :title="item.name" />
        </div>
      </li>
    </ul>
    <div class="select-file" v-show="selectFileDisplay">
      <loading v-ref:loading></loading>
      <div v-show="loadingUpload">
        <icon class="icon-plus" name="plus"></icon>
        <input
          class="select-file-input"
          type="file"
          v-model="iptval"
          :accept="uploadAccept"
          @change="upload($event)" />
      </div>
    </div>
    <div class="input-label">{{ instruction }}</div>
    <div v-el:img-preview class="img-preview"></div>
  </div>
</div>