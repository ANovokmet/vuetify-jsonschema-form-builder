<template>
  <v-col cols="12" class="draggable-empty">
    Drag and Drop a form component
  </v-col>
</template>

<script>
export default {
  name: 'DraggableEmpty'
}
</script>

<style scoped>
.draggable-empty {
  text-align: center;
  padding: 0.75rem 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  background-color: rgba(0, 0, 0, 0.125);
  margin-bottom: 0.5rem;
}
</style>