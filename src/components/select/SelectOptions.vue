<template>
  <div>
    <default-options :options="options"></default-options>

    <v-select v-model="options.source" :items="sourceOptions" item-text="label" item-value="value" label="Source" outlined></v-select>

    <div v-if="options.source === 'values'">
      <h4>Values</h4>
      <div class="options">
        <div
          v-for="(option, i) in options.values"
          :key="i"
          class="options__option"
        >
          <v-text-field label="Value" v-model="option.value" outlined></v-text-field>
          <v-text-field label="Label" v-model="option.label" outlined></v-text-field>
          <v-btn fab small @click="onRemoveOption(option)">
            <v-icon> mdi-minus </v-icon>
          </v-btn>
        </div>
      </div>
      <v-btn fab small color="primary" @click="onAddOption()">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </div>
    <div v-if="options.source === 'predefined'">
      <v-select :items="context.predefinedSelects" v-model="options.predefinedSelectId" item-text="label" item-value="id" label="Custom dropdown" outlined></v-select>
    </div>
  </div>


</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import DefaultOptions from '../common/DefaultOptions.vue';
import { IFormBuilderContext } from '../interfaces';

export default Vue.extend({
  components: { DefaultOptions },
  name: 'SelectOptions',
  props: {
    options: {
      type: Object as PropType<any>,
      required: true,
    },
    context: {
      type: Object as PropType<IFormBuilderContext>
    }
  },
  methods: {
    onRemoveOption(option: any) {
      const index = this.options.values.indexOf(option);
      console.log(index)
      if(index !== -1) {
        this.options.values.splice(index, 1);
      }
    },
    onAddOption() {
      this.options.values.push({});
    }
  },
  data: () => ({
    sourceOptions: [
      { value: 'values', label: 'Values' },
      { value: 'predefined', label: 'Predefined' }
    ],
    predefined: [
      {
        id: 'departments',
        label: 'Departments',

        options: [
          { value: 'dept1', label: 'Department 1' },
          { value: 'dept2', label: 'Department 2' },
        ] 
      }
    ]
  }),
})
</script>

<style scoped>
.options__option {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  align-items: center;
}
</style>
