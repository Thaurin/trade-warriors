// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { SpaceTraders } from 'spacetraders-sdk';

declare module '@vue/runtime-core' {
  // declare your own store states
  import { State } from './interfaces/interfaces';

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>,
    $space: SpaceTraders
  }
}
