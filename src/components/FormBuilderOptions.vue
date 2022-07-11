<template>
  <div v-if="selectedDefinition" class="fb-options">
  <div class="fb-options__title">
    <v-icon>{{ selectedDefinition.icon }}</v-icon>
    {{selectedDefinition.title}}
  </div>
  <component
    :is="selectedDefinition.optionsTemplate"
    :options="selectedSettings"
    :context="context"
  ></component>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { IFormBuilderContext } from './interfaces';
import { store } from './store';

export default Vue.extend({
  name: 'FormBuilderOptions',
  props: {
    context: {
      type: Object as PropType<IFormBuilderContext>
    }
  },
  computed: {
    selectedDefinition() {
      return store.selectedDefinition;
    },
    selectedSettings() {
      return store.selectedSettings;
    }
  }
})
</script>

<style scoped>
  .fb-options__title {
    padding-bottom: 0.75rem;
  }
</style>
