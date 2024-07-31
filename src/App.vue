<template>
  <div>
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
