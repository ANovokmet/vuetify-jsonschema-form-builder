<template>
  <v-row>
    <v-col cols="8">
      <div class="form-builder__form-container">
        <form-builder-form :config.sync="config"></form-builder-form>
      </div>
    </v-col>
    <v-col cols="4" class="form-builder__tabs">
      <v-tabs v-model="tab" grow>
        <v-tab :key="1"><v-icon>extension</v-icon></v-tab>
        <v-tab :key="2"><v-icon>format_list_bulleted</v-icon></v-tab>
        <v-tab :key="3"><v-icon>code</v-icon></v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item class="form-builder__components">
          <form-builder-components></form-builder-components>
        </v-tab-item>
        <v-tab-item class="form-builder__options">
          <form-builder-options></form-builder-options>
        </v-tab-item>
        <v-tab-item>
          <!-- <pre>
            {{ schema }}
          </pre> -->
          <form-builder-json :schema.sync="schema2"></form-builder-json>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import "../assets/global.css";

import FormBuilderForm from './FormBuilderForm.vue';
import FormBuilderOptions from './FormBuilderOptions.vue';
import FormBuilderComponents from './FormBuilderComponents.vue';
import FormBuilderJson from './FormBuilderJson.vue';
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
    FormBuilderComponents,
    FormBuilderJson
  },

  props: {
    schema: {
      type: Object as PropType<any>,
      required: true,
    }
  },

  watch: {
    onComponentClick() {
      console.log('test')
      this.tab = 1;
    }
  },

  computed: {
    selectedDefinition() {
      return store.selectedDefinition;
    },
    selectedSettings() {
      return store.selectedSettings;
    },
    onComponentClick(): any {
      return store.onClick;
    },
    config: {
      get(): any {
        const parser = new SchemaParser();
        parser.visit(this.schema2);
        return parser.config;
      },
      set(value: any) {
        const builder = new SchemaBuilder(components);
        console.log('shcema2')
        const schema = builder.build(value);
        this.$emit('update:schema', schema);
      }
    },
    schema2: {
      get(): any {
        return this.schema;
      },
      set(value: any) {
        this.config = [...this.config];
        this.$emit('update:schema', value);
      }
    }
  },

  data() {
    return {
      tab: 0,
      components: Object.values(components)
    }
  },
})
</script>

<style scoped>
.form-builder__tabs {
  /* box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15); */
}

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
