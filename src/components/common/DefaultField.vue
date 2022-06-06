<template>
  <div class="default-field">
    <v-icon>{{ icon }}</v-icon>
    <div class="component__title">{{ settings.label }}</div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'DefaultField',
  props: {
    settings: {
      type: Object as PropType<any>,
      required: true,
    },
    icon: {
      type: String,
      required: true
    }
  },
  data: () => ({
  }),
})
</script>

<style scoped>
.default-field {
  display: flex;
  align-items: center;
}

.component__title {
  margin-left: 16px;
}
</style>
