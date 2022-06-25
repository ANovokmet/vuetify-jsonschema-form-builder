# vuetify-jsonschema-form-builder

This library is a json schema form builder intended to be used alongside `vuetify-jsonschema-form` which is a form renderer. This library consists of two components, a `form-builder` which represents the drag and drop area displaying the current layout of the form, and `form-builder-tabs` which represent the available controls. Check out the [Demo](https://anovokmet.github.io/vuetify-jsonschema-form-builder/).

## Installation
```
npm install vuetify-jsonschema-form-builder
```

### Usage

```js
<template>
    <v-row>
        <v-col cols="8">
            <form-builder :schema.sync="schema"></form-builder>
        </v-col>
        <v-col cols="4">
            <form-builder-tabs :schema.sync="schema"></form-builder-tabs>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { FormBuilder, FormBuilderTabs } from 'vuetify-jsonschema-form-builder';

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
      }
    };
  },
});
</script>
```

### Props

- `schema` - a jsonschema in the format of `vuetify-jsonschema-form` schemas

### How it works

TODO

