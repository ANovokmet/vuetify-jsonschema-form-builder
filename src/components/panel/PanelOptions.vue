<template>
  <div>    
    <v-text-field label="API key" v-model="options.key" :messages="['The name of this field in the API endpoint.']"></v-text-field>
    
    <v-text-field label="Label" v-model="options.label"></v-text-field>
    
    <v-text-field label="X-Col" type="number" min="1" max="12" v-model="options.xCols"></v-text-field>

  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    options: {
      type: Object as PropType<any>,
      required: true,
    }
  },
  data: () => ({
  }),
})
</script>

<style scoped>
</style>
