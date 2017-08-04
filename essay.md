# blog

## 各种 height width x y top left 的区别

* clientWidth: border 里面的内容宽度，不包括 border 的宽度。当出现滚动条之后宽度等于 content.width + padding.top + padding.bottom
* scrollWidth: 通常情况下等同于 clientWidth，当出现滚动条时，宽度等于滚动内容的宽度，同样不包括 border 的宽度
* offsetWidth: clientWidth + border.top + border.bottom 。当出现滚动条之后宽度等于 content.width + padding.top + padding.bottom + border.top + border.bottom
* clientTop、clientLeft: 就是节点的 border 宽度

***

## localStorage、sessionStorage、session、cookie

***

## mousedown, mouseup, click, touchend, touchstart, touchmove 触发顺序

### 平板二合一电脑

#### 鼠标点击

* mousedown -> focus -> mouseup -> click

#### 触摸点击

* touchstart -> touchend -> mousedown -> focus -> mouseup -> click

#### 触摸点击（移动）

* touchstart -> touchmove -> touchend

***