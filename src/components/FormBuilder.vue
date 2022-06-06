<template>
  <v-row>
    <v-col cols="8" style="background: #f4f5f8">
      <div class="form-builder__form-container">
        <draggable
          v-model="config"
          group="components"
          class="form-builder__form"
          ghost-class="component-ghost"
          drag-class="component-dragging"
          force-fallback="true"
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
      </div>
    </v-col>
    <v-col cols="4" style="padding: 0">
      <v-tabs v-model="tab" grow>
        <v-tab><v-icon>extension</v-icon></v-tab>
        <v-tab><v-icon>format_list_bulleted</v-icon></v-tab>
        <v-tab><v-icon>code</v-icon></v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item class="form-builder__components">
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
        </v-tab-item>
        <v-tab-item class="form-builder__options">options</v-tab-item>
        <v-tab-item>code</v-tab-item>
      </v-tabs-items>
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
      tab: {},
      config: [],
      components: Object.values(components)
    }
  },
})
</script>

<style scoped>
.form-builder__form-container {
}

.form-builder__form {
  background: #ffffff;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}

.form-builder__components {
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
  padding: 0.75rem;
}

.form-builder__options {
  padding: 0.75rem;
}

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
