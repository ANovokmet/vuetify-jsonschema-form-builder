# vuetify-jsonschema-form-builder

This library is a json schema form builder intended to be used alongside `vuetify-jsonschema-form` which is a form renderer. This library consists of two components, a `form-builder` which represents the drag and drop area displaying the current layout of the form, and `form-builder-tabs` which represent the available controls. Check out the [Demo](https://anovokmet.github.io/vuetify-jsonschema-form-builder/).

## Installation
```
npm install vuetify-jsonschema-form-builder
```

### Usage

```js
<template>
    <v-app>
        <v-row>
            <v-col cols="8">
                <form-builder :schema.sync="schema" :context="context"></form-builder>
            </v-col>
            <v-col cols="4">
                <form-builder-tabs :schema.sync="schema" :context="context"></form-builder-tabs>
            </v-col>
        </v-row>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { FormBuilder, FormBuilderTabs } from 'vuetify-jsonschema-form-builder';
import 'vuetify/dist/vuetify.min.css';

export default Vue.extend({
  name: "App",
  components: {
    FormBuilder, FormBuilderTabs
  },
  data() {
    return {
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
    };
  },
});
</script>
```

### Props

- `schema` - a jsonschema in the format of `vuetify-jsonschema-form` schemas
- `context` - an object containing additional data for generating the form
  - `predefinedSelects` - list of predefined selects that can be chosen for the dropdown component
    - `id` - unique ID of the predefined dropdown
    - `label` - display label
    - `url` - URL to fetch the values from
    - `itemsProp` - property in the response containing the dropdown options
    - `itemTitle` - property of the option to use as the display label
    - `itemKey` - property of the option to use as the display value

### How it works

TODO

