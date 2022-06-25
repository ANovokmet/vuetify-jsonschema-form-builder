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
        drag-class="component-dragging"
        force-fallback="true"
        @change="onDragEnd($event, settings.components)"
      >
        <template v-for="child in settings.components">
          <form-builder-component
            :key="child.id"
            :settings="child"
            @remove="onRemove(child, settings.components)"
            @select="onSelected(child, $event)"
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
import onDndEndMixin from '../mixins/onDndEnd';
import onRemoveMixin from '../mixins/onRemove';
import { store } from '../store';

export default Vue.extend({
  name: 'Panel',
  components: {
    DraggableEmpty,
    FormBuilderComponent
  },
  mixins: [onDndEndMixin, onRemoveMixin],
  methods: {
    onSelected(settings: any, definition: any) {
      store.selectedSettings = settings;
      store.selectedDefinition = definition;
      store.onClick = {};
    }
  },
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
.component__title {
  margin-left: 16px;
}

.panel__title {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.form-builder__form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
