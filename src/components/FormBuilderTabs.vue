<template>
  <div>
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
        <form-builder-options :context="context"></form-builder-options>
      </v-tab-item>
      <v-tab-item class="form-builder__json">
        <form-builder-json :schema.sync="model"></form-builder-json>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import FormBuilderComponents from './FormBuilderComponents.vue';
import FormBuilderOptions from './FormBuilderOptions.vue';
import FormBuilderJson from './FormBuilderJson.vue';
import { store } from '@/components/store';
import { IFormBuilderContext } from './interfaces';

export default Vue.extend({
  name: 'FormBuilderTabs',

  components: {
    FormBuilderComponents,
    FormBuilderOptions,
    FormBuilderJson
  },

  props: {
    schema: {
      type: Object as PropType<any>,
      required: true,
    },
    context: {
      type: Object as PropType<IFormBuilderContext>
    }
  },

  watch: {
    onComponentClick() {
      console.log('test')
      this.tab = 1;
    }
  },

  computed: {
    model: {
      get(): any {
        return this.schema;
      },
      set(value: any): any {
        console.log('update:schema', value)
        this.$emit('update:schema', value)
      }
    },
  
    onComponentClick(): any {
      return store.onClick;
    }
  },
  data() {
    return {
      tab: {}
    }
  },
})
</script>

<style scoped>
.form-builder__components {
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
  padding: 0.75rem;
}

.form-builder__options {
  padding: 0.75rem;
}
</style>
