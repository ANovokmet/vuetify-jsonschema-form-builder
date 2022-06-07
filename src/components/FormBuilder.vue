<template>
  <v-row>
    <v-col cols="8" style="background: #f4f5f8">
      <div class="form-builder__form-container">
        <form-builder-form :config.sync="config"></form-builder-form>
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
          <form-builder-components></form-builder-components>
        </v-tab-item>
        <v-tab-item class="form-builder__options">
          <form-builder-options></form-builder-options>
        </v-tab-item>
        <v-tab-item>
          <pre>
            {{ schema }}
          </pre>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import "../assets/global.css";
import { cloneDeep } from 'lodash-es';

import FormBuilderForm from './FormBuilderForm.vue';
import FormBuilderOptions from './FormBuilderOptions.vue';
import FormBuilderComponents from './FormBuilderComponents.vue';
import { SchemaBuilder } from './schema-builder';
import { SchemaParser } from './schema-parser';

import { components, registerComponent } from './components';

import textfieldComponent from './textfield/textfield';
import panelComponent from './panel/panel';
import dateComponent from './date/date';
import textareaComponent from './textarea/textarea';
import timeComponent from './time/time';
import selectComponent from './select/select';
import { store } from '../store';

registerComponent('textfield', textfieldComponent);
registerComponent('textarea', textareaComponent);
registerComponent('date', dateComponent);
registerComponent('time', timeComponent);
registerComponent('select', selectComponent);
registerComponent('panel', panelComponent);

export default Vue.extend({
  name: 'FormBuilder',
  components: {
    FormBuilderForm,
    FormBuilderOptions,
    FormBuilderComponents
  },

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
    onSelected(settings: any, definition: any) {
      store.selectedSettings = settings;
      store.selectedDefinition = definition;
    }
  },

  created() {
    const parser = new SchemaParser();
    parser.visit(this.schema);
    this.config = parser.config;
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

  computed: {
    selectedDefinition() {
      return store.selectedDefinition;
    },
    selectedSettings() {
      return store.selectedSettings;
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
  row-gap: 8px;
}

.form-builder__components {
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
  padding: 0.75rem;
}

.form-builder__options {
  padding: 0.75rem;
}
</style>
