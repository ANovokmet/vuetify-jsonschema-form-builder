<template>
  <draggable
    v-model="mutableConfig"
    group="components"
    class="form-builder__form"
    ghost-class="component-ghost"
    drag-class="component-dragging"
    force-fallback="true"
    @change="onDragEnd($event, mutableConfig)"
  >
    <template v-for="child in mutableConfig">
      <form-builder-component
        :key="child.id"
        :settings="child"
        @remove="onRemove(child, mutableConfig)"
        @select="onSelected(child, $event)"
      ></form-builder-component>
    </template>
    <draggable-empty></draggable-empty>
  </draggable>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import draggable from 'vuedraggable';
import "../assets/global.css";
import { cloneDeep } from 'lodash-es';

import FormBuilderComponent from './FormBuilderComponent.vue';
import DraggableEmpty from './DraggableEmpty.vue';
import onDndEndMixin from './mixins/onDndEnd';
import onRemoveMixin from './mixins/onRemove';

import { store } from './store';


export default Vue.extend({
  name: 'FormContainer',
  components: { draggable, FormBuilderComponent, DraggableEmpty },

  mixins: [onDndEndMixin, onRemoveMixin],

  props: {
    config: {
      type: Array as PropType<any[]>,
      required: true,
    }
  },

  methods: {
    onSelected(settings: any, definition: any) {
      store.selectedSettings = settings;
      store.selectedDefinition = definition;
      store.onClick = {};
    }
  },

  watch: {
    mutableConfig: {
      handler(mutableConfig) {
        this.$emit('update:config', mutableConfig);
      },
      deep: true
    },
  },

  computed: {
    // mutableConfig: {
    //   get(): any {
    //     return this.config;
    //   },
    //   set(value: any) {
    //     this.$emit('update:config', value);
    //     console.log('set:value', value)
    //     // this.config = value;
    //   }
    // }
  },

  data() {
    return {
      mutableConfig: cloneDeep(this.config)
    }
  },
})
</script>

<style scoped>
.form-builder__form {
  background: #ffffff;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 8px;
}
</style>
