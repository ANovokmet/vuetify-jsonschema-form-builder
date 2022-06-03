<template>
  <v-row>
    <v-col cols="8">
      <draggable
        v-model="config"
        group="components"
        class="form-builder__form"
        ghost-class="component-ghost"
        @change="onDragEnd($event, config)"
      >
        <template v-for="child in config">
          <form-builder-component
            :key="child.id"
            :settings="child"
            @remove="onRemove(child, config)"
          ></form-builder-component>
        </template>
        <draggable-empty></draggable-empty>
      </draggable>
    </v-col>
    <v-col cols="4">
      <draggable
        v-model="components"
        :sort="false"
        :group="{ name: 'components', pull: 'clone', put: false }"
        :clone="cloneObject"
      >
        <div v-for="(element, i) in components" class="list-item" :key="i">
          <v-icon>{{ element.icon }}</v-icon>
          {{ element.title }}
        </div>
      </draggable>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import draggable from 'vuedraggable';
import "../assets/global.css";
import { cloneDeep } from 'lodash-es';

import FormBuilderComponent from './FormBuilderComponent.vue';
import DraggableEmpty from './DraggableEmpty.vue';
import { SchemaBuilder } from './schema-builder';
import { SchemaParser } from './schema-parser';
import onDndEndMixin from '../mixins/onDndEnd';
import onRemoveMixin from '../mixins/onRemove';

import { components, registerComponent } from './components';

import textfieldComponent from './textfield/textfield';
import panelComponent from './panel/panel';
import dateComponent from './date/date';

registerComponent('textfield', textfieldComponent);
registerComponent('panel', panelComponent);
registerComponent('date', dateComponent);

export default Vue.extend({
  name: 'FormBuilder',
  components: { draggable, FormBuilderComponent, DraggableEmpty },

  mixins: [onDndEndMixin, onRemoveMixin],

  props: {
    schema: {
      type: Object as PropType<any>,
      required: true,
    }
  },

  methods: {
    cloneObject(original: any) {
      return cloneDeep(original.settings);
    },
  },

  watch: {
    schema: {
      handler(schema) {
        const parser = new SchemaParser();
        parser.visit(schema);
        console.log('parser config', parser.config);
        // this.config = parser.config;
      },
      immediate: true
    },

    config: {
      handler(config) {
        const builder = new SchemaBuilder(components);
        console.log('builder config', config)
        const schema = builder.build(config);
        this.$emit('update:schema', schema);
      },
      deep: true
    }
  },

  data() {
    return {
      config: [],
      components: Object.values(components)
    }
  },
})
</script>

<style scoped>
.form-builder__form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.list-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
