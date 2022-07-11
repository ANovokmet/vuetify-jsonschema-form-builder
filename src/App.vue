<template>
  <v-app>
    <v-main class="bg-gray">
      <v-container style="display: flex; flex-direction: column">
        <v-row>
          <v-col cols="12" class="form-preview">
            <v-form ref="form">
              <v-jsf v-model="model" :schema="schema" :options="options" />
            </v-form>
            <v-layout row class="mt-2">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="$refs.form.validate()">
                Validate
              </v-btn>
            </v-layout>
          </v-col>
        </v-row>

        <v-row style="flex: 1 0 auto">
          <v-col cols="8">
            <div class="form-builder__form-container">
              <form-builder :schema.sync="schema" :context="context"></form-builder>
            </div>
          </v-col>
          <v-col cols="4" class="form-builder__tabs">
            <form-builder-tabs :schema.sync="schema" :context="context"></form-builder-tabs>
          </v-col>
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
import FormBuilderTabs from './components/FormBuilderTabs.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    VJsf,
    FormBuilder,
    FormBuilderTabs
  },

  data() {
    return {
      model: {},
      options: {
        httpLib: axios
      },
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
      },
      context: {
        predefinedSelects: [
          {
            id: 'pokemon',
            label: 'Pokemon',
            url: 'https://pokeapi.co/api/v2/pokemon',
            itemsProp: 'results',
            itemTitle: 'name',
            itemKey: 'name',
          },
          {
            id: 'fruit',
            label: 'Fruit',
            url: 'https://www.fruityvice.com/api/fruit/all',
            itemTitle: 'name',
            itemKey: 'id'
          }
        ]
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