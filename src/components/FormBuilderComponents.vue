<template>
  <draggable
    v-model="components"
    :sort="false"
    :group="{ name: 'components', pull: 'clone', put: false }"
    :clone="cloneObject"
    drag-class="component-dragging"
    force-fallback="true"
    class="list"
  >
    <div v-for="(element, i) in components" class="list-item" :key="i">
      <v-icon>{{ element.icon }}</v-icon>
      <div class="list-item__title">{{ element.title }}</div>
    </div>
  </draggable>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import draggable from 'vuedraggable';
import { cloneDeep } from 'lodash-es';
import { components } from './components';

export default Vue.extend({
  name: 'FormBuilderComponents',
  components: {
    draggable
  },

  methods: {
    cloneObject(original: any) {
      return cloneDeep(original.settings);
    }
  },

  data() {
    return {
      components: Object.values(components)
    }
  },
})
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-item {
  position: relative;
  display: block;
  padding: 0.5rem 1rem;

  background: #f3f3f3;
  border: 1px solid #dfe2e9;
  border-radius: 4px;

  display: flex;
}

.list-item .v-icon {
  margin-right: 16px;
}
</style>
