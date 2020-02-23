// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue, { VNode } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentRenderProxy } from '@vue/composition-api'

declare global {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Element extends VNode { }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ElementClass extends ComponentRenderProxy { }
    interface ElementAttributesProperty {
      $props: any; // specify the property name to use
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module '@vue/composition-api/dist/component/component' {
  interface SetupContext {
    readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] };
  }
}
