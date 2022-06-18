<template>
  <div v-if="selectedDefinition" class="fb-options">
  <div class="fb-options__title">
    <v-icon>{{ selectedDefinition.icon }}</v-icon>
    {{selectedDefinition.title}}
  </div>
  <component
    :is="selectedDefinition.optionsTemplate"
    :options="selectedSettings"
  ></component>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { store } from '../store';

export default Vue.extend({
  name: 'FormBuilderOptions',
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
