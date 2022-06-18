<template>
  <v-col
    class="component"
    :class="{selected}"
    :cols="settings.xCols"
    @click.stop="$emit('select', componentDefinition)"
  >
    <component
      class="component__content"
      :is="componentDefinition.template"
      :settings="settings"
      :icon="componentDefinition.icon"
    ></component>
    <v-btn icon @click.stop="$emit('remove', settings)">
      <v-icon>close</v-icon>
    </v-btn>
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
    }
  }
})
</script>

<style scoped>
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
