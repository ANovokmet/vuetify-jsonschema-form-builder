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

    <h4>Padding</h4>
    <div class="padding-control">
      <v-row>
        <v-col cols="4" class="padding-control__col">
          <div>
            <v-text-field outlined type="number" min="0" max="16" label="Left" v-model="options.padding.left"></v-text-field>
          </div>
        </v-col>
        <v-col cols="4" class="padding-control__col">
              <v-text-field outlined type="number" min="0" max="16" label="Top" v-model="options.padding.top"></v-text-field>
              <v-text-field outlined type="number" min="0" max="16" label="Bottom" v-model="options.padding.bottom"></v-text-field>
        </v-col>
        <v-col cols="4" class="padding-control__col">
          <div>
            <v-text-field outlined type="number" min="0" max="16" label="Right" v-model="options.padding.right"></v-text-field>
          </div>
        </v-col>
      </v-row>

    </div>
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
.padding-control {

}

.padding-control__col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
