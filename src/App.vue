<template>
  <v-app>
    <v-main class="bg-gray">
      <v-container style="display: flex; flex-direction: column">
        <v-row>
          <v-col cols="12" class="form-preview">
            <v-form ref="form">
              <v-jsf v-model="model" :schema="schema" />
            </v-form>
            <v-layout row class="mt-2">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="$refs.form.validate()">Validate</v-btn>
            </v-layout>
          </v-col>
        </v-row>

        <v-row style="flex: 1 0 auto">
          <form-builder
            :schema="schema"
            @update:schema="schema = $event"
          ></form-builder>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
// @ts-ignore
import VJsf from '@koumoul/vjsf/lib/VJsf.js';
import '@koumoul/vjsf/lib/VJsf.css';
import '@koumoul/vjsf/lib/deps/third-party.js';
import FormBuilder from './components/FormBuilder.vue';

export default {
  name: 'App',
  components: { VJsf, FormBuilder },

  data() {
    return {
      model: {},
      schema: {
        type: 'object',
        properties: {
          stringProp: {
            type: 'string'
          },
          colorProp: {
            type: 'string',
            'x-display': 'color-picker'
          },
        }
      }
    }
  },
};
</script>

<style scoped>
.bg-gray {
  background: rgb(244, 245, 248);
}

.form-preview {
  background: white;
  border-radius: 8px;
  margin-bottom: 24px;
}
</style>