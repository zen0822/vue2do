<div class="selecttree">
  <div class="input" @click.stop="open=!open">
    <span>{{txt}}</span>
    <span></span>
    <icon class="caret-down-icon" name="caret-down"></icon>
  </div>
  <div v-show="open" class="treelist">
    <list-tree :list-data="treeData">
    </list-tree>
  </div>
</div>