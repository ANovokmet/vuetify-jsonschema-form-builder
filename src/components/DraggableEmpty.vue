<template>
  <v-col cols="12" class="draggable-empty"> 
    <v-icon>copy_all</v-icon>
    Drag and Drop component 
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

  color: #666775;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;

  background: #f3f3f3;
  border: 1px dashed #666775;
  border-radius: 8px;
}
</style>