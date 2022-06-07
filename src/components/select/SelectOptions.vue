<template>
  <div>
    <v-text-field
      label="API key"
      v-model="options.key"
      :messages="['The name of this field in the API endpoint.']"
    ></v-text-field>

    <v-text-field label="Label" v-model="options.label"></v-text-field>

    <v-text-field
      label="X-Col"
      type="number"
      min="1"
      max="12"
      v-model="options.xCols"
    ></v-text-field>

    <h4>Values</h4>
    <div class="options">
      <div
        v-for="(option, i) in options.values"
        :key="i"
        class="options__option"
      >
        <v-text-field label="Value" v-model="option.value"></v-text-field>
        <v-text-field label="Label" v-model="option.label"></v-text-field>
        <v-btn fab small @click="onRemoveOption(option)">
          <v-icon> mdi-minus </v-icon>
        </v-btn>
      </div>
    </div>
    <v-btn fab small color="primary" @click="onAddOption()">
      <v-icon> mdi-plus </v-icon>
    </v-btn>
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
