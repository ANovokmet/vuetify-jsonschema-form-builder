<template>
  <v-col
    class="component"
    :cols="settings.xCols"
  >
    <component class="component__content" :is="componentDefinition.template" :settings="settings" :icon="componentDefinition.icon"></component>

    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>edit</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title> Options </v-card-title>
        <v-container>
          <component :is="componentDefinition.optionsTemplate" :options="settings"></component>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn icon @click="$emit('remove', settings)"><v-icon>close</v-icon></v-btn>
  </v-col>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { getComponent } from './components';

export default Vue.extend({
  name: 'FormBuilderComponent',
  props: {
    settings: {
      type: Object as PropType<any>,
      required: true,
    }
  },
  computed: {
    componentDefinition(): any {
      return getComponent(this.settings.type);
    }
  },
  data() {
    return {
      dialog: false
    }
  },
})
</script>

<style scoped>
.component {
  display: flex;
  align-items: center;

  padding: 0.5rem 1rem;
  /* border: 1px solid rgba(0, 0, 0, 0.125); */
  /* margin-bottom: 0.5rem; */

  background: white;
  border: 1px solid #DFE2E9;
  border-radius: 4px;
}

.component__content {
  flex: 1 1 auto;
}
</style>
