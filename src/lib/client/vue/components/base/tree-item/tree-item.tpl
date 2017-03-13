<li>
  <div :class="['itemList' , isFolder ? 'bold' : '' ]">
    <i v-if="isFolder" :class="['fa' , open ? 'fa-chevron-down' : 'fa-chevron-right' ]" @click.stop="toggle()"></i>
    <span v-if="!isFolder" class="circle"></span>
    <span data-id="{{ model.commId }}" @click.stop="getModelId(model)">{{ model.shortName }}</span>
  </div>
  <ul v-show="open" v-if="isFolder">
    <item class="item" v-for="model in model.childs" :model="model">
    </item>
  </ul>
</li>
