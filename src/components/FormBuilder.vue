<template>
  <form-builder-form :config.sync="config"></form-builder-form>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import "../assets/global.css";

import FormBuilderForm from './FormBuilderForm.vue';
import { SchemaBuilder } from './schema-builder';
import { SchemaParser } from './schema-parser';

import { components, registerComponent } from './components';

import textfieldComponent from './textfield/textfield';
// import panelComponent from './panel/panel';
import dateComponent from './date/date';
import textareaComponent from './textarea/textarea';
import timeComponent from './time/time';
import selectComponent from './select/select';

registerComponent('textfield', textfieldComponent);
registerComponent('textarea', textareaComponent);
registerComponent('date', dateComponent);
registerComponent('time', timeComponent);
registerComponent('select', selectComponent);
// registerComponent('panel', panelComponent);

export default Vue.extend({
  name: 'FormBuilder',
  components: {
    FormBuilderForm
  },

  props: {
    schema: {
      type: Object as PropType<any>,
      required: true,
    }
  },

  computed: {
    config: {
      get(): any {
        const parser = new SchemaParser();
        parser.visit(this.schema);
        console.log('schema parse',  parser.config)
        return parser.config;
      },
      set(value: any) {
        const builder = new SchemaBuilder(components);
        const schema = builder.build(value);
        this.$emit('update:schema', schema);
      }
    },
    // schema2: {
    //   get(): any {
    //     return this.schema;
    //   },
    //   set(value: any) {
    //     this.config = [...this.config];
    //     this.$emit('update:schema', value);
    //   }
    // }
  },

  data() {
    return {};
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
