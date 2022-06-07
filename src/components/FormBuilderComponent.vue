<template>
  <v-col
    class="component"
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

export default Vue.extend({
  name: 'FormBuilderComponent',
  props: {
    settings: {
      type: Object as PropType<any>,
      required: true,
    }
  },
  methods: {
    onClick() {
      console.log(this.componentDefinition);
    }
  },
  computed: {
    componentDefinition(): any {
      return getComponent(this.settings.type);
    }
  }
})
</script>

<style scoped>
.component {
  display: flex;
  align-items: center;

  padding: 0.5rem 1rem;
  /* border: 1px solid rgba(0, 0, 0, 0.125); */
  /* margin-bottom: 0.5rem; */

  background: white;
  border: 1px solid #dfe2e9;
  border-radius: 4px;
}

.component__content {
  flex: 1 1 auto;
}
</style>
