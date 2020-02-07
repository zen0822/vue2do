
import Vue, { VNode } from 'vue'
import { ComponentRenderProxy } from '@vue/composition-api'

declare module '*.svg'
declare module '*.png'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.scss' {
  const content: string
  export default content
}

declare module '*.css' {
  const content: string
  export default content
}

declare global {
  namespace JSX {
    type Element = VNode
    type ElementClass = ComponentRenderProxy
    interface ElementAttributesProperty {
      $props: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

