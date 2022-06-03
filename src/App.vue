<template>
  <v-app>
    <v-app-bar app></v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col sm="12">
            <v-form>
              <v-jsf v-model="model" :schema="schema" />
            </v-form>
          </v-col>
        </v-row>

        <v-row>
          <form-builder :schema="schema" @update:schema="schema = $event"></form-builder>
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
</style>