<template>
  <div>
    <v-text-field outlined label="ID" v-model="options.key"></v-text-field>
    <v-text-field outlined label="Title" v-model="options.label"></v-text-field>
    <v-text-field outlined label="Default Value" v-model="options.defaultValue"></v-text-field>

    <v-select v-model="options.required" :items="booleanOptions" item-text="label" item-value="value" label="Required" outlined></v-select>
    <v-select v-model="options.readOnly" :items="booleanOptions" item-text="label" item-value="value" label="Read-only" outlined></v-select>
    
    <v-textarea outlined label="Tooltip" v-model="options.tooltip"></v-textarea>
    
    
    <v-slider label="X-Col" min="1" max="12" v-model="options.xCols" class="align-baseline">
      <template v-slot:append>
        <v-text-field outlined type="number" min="1" max="12" v-model="options.xCols"></v-text-field>
      </template>
    </v-slider>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'DefaultOptions',
  props: {
    options: {
      type: Object as PropType<any>,
      required: true,
    }
  },
  data: () => ({
    booleanOptions: [
      { label: 'Yes', value: true },
      { label: 'No', value: false }
    ]
  }),
})
</script>

<style scoped>
</style>
