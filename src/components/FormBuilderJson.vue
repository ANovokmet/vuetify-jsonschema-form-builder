<template>
  <v-jsoneditor v-model="model" :options="options" :plus="false"></v-jsoneditor>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
// @ts-ignore
import VJsoneditor from 'v-jsoneditor';

export default Vue.extend({
  name: 'FormBuilderJson',

  components: {
    VJsoneditor
  },

  props: {
    schema: {
      type: Object as PropType<any>,
      required: true,
    }
  },

  computed: {
    model: {
      get(): any {
        return this.schema;
      },
      set(value: any): any {
        this.$emit('update:schema', value)
      }
    }
  },

  data() {
    return {
      options: {}
    }
  },
})
</script>

<style scoped>
.fb-options__title {
  padding-bottom: 0.75rem;
}
</style>
