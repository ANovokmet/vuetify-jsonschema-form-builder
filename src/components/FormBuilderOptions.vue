<template>
  <component
    v-if="selectedDefinition"
    :is="selectedDefinition.optionsTemplate"
    :options="selectedSettings"
  ></component>
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
</style>
