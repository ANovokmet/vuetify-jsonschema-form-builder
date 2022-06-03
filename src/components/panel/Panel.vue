<template>
  <div class="panel">
    <div class="panel__title">
      <v-icon>{{ icon }}</v-icon>
      <div class="component__title">{{ settings.label }}</div>
    </div>
    <div class="panel__components">
      <draggable
        v-model="settings.components"
        group="components"
        class="form-builder__form"
        ghost-class="component-ghost"
        @change="onDragEnd($event, settings.components)"
      >
        <template v-for="child in settings.components">
          <form-builder-component
            :key="child.id"
            :settings="child"
            @remove="onRemove(child, settings.components)"
          ></form-builder-component>
        </template>
        <draggable-empty></draggable-empty>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import DraggableEmpty from '../DraggableEmpty.vue';
import FormBuilderComponent from '../FormBuilderComponent.vue';
import onDndEndMixin from '../../mixins/onDndEnd';
import onRemoveMixin from '../../mixins/onRemove';

export default Vue.extend({
  name: 'Panel',
  components: {
    DraggableEmpty,
    FormBuilderComponent
  },
  mixins: [onDndEndMixin, onRemoveMixin],
  props: {
    settings: {
      type: Object as PropType<any>,
      required: true,
    },
    icon: {
      type: String,
      required: true
    }
  },
  data: () => ({
  }),
})
</script>

<style scoped>
.panel__title {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
</style>
