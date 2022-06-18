<template>
  <v-col
    :cols="settings.xCols"
    :style="paddingStyle"
    class="component-wrapper"
    @click.stop="$emit('select', componentDefinition)"
  >
  <div class="component"
    :class="{selected}">
    <component
      class="component__content"
      :is="componentDefinition.template"
      :settings="settings"
      :icon="componentDefinition.icon"
    ></component>
    <v-btn icon @click.stop="$emit('remove', settings)">
      <v-icon>close</v-icon>
    </v-btn>
  </div>
  </v-col>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { getComponent } from './components';
import { store } from '../store';

export default Vue.extend({
  name: 'FormBuilderComponent',
  props: {
    settings: {
      type: Object as PropType<any>,
      required: true,
    }
  },
  methods: {
  },
  computed: {
    componentDefinition(): any {
      return getComponent(this.settings.type);
    },
    selected(): boolean {
      return this.settings === store.selectedSettings;
    },
    paddingStyle(): any {
      const style: any = {};
      const settings = this.settings;
      function setPadding(location: string) {
        if(settings.padding[location]) {
          style[`padding-${location}`] = `${settings.padding[location] * 4}px`;
        }
      }
      setPadding('top');
      setPadding('bottom');
      setPadding('left');
      setPadding('right');
      return style;
    }
  }
})
</script>

<style scoped>
.component-wrapper {
  padding: 0;
}
.component {
  display: flex;
  align-items: center;

  padding: 0.25rem 1rem;
  /* border: 1px solid rgba(0, 0, 0, 0.125); */
  /* margin-bottom: 0.5rem; */

  background: white;
  border: 1px solid #dfe2e9;
  border-radius: 4px;

  transition: 0.2s ease-in-out background;
}

.component.selected {
  background: rgba(80, 83, 222, 0.08);
}

.component__content {
  flex: 1 1 auto;
}
</style>
