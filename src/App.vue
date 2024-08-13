<template>
  <div id="mid">
    <h1>Book Management</h1>
    <BookForm />
    <BookList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BookForm from './components/BookForm.vue';
import BookList from './components/BookList.vue';

export default defineComponent({
  components: {
    BookForm,
    BookList,
  },
});
</script>

<style lang="scss" scoped>
#mid{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
</style>