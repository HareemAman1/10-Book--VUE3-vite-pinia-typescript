<template>
    <div>
      <h2>Book List</h2>
      <div>
        <label for="filter">Filter:</label>
        <select id="filter" v-model="currentFilter" @change="applyFilter">
          <option value="All">All</option>
          <option value="Novel">Novel</option>
          <option value="Textbook">Textbook</option>
        </select>
  
        <label for="sort">Sort By:</label>
        <select id="sort" v-model="currentSortOption" @change="applySortOption">
          <option value="Title">Title</option>
          <option value="Author">Author</option>
        </select>
      </div>
  
      <ul>
        <li v-for="book in filteredBooks" :key="book.title">
          <div v-if="book.type === 'Novel'">
            <strong>Novel:</strong> {{ book.title }} by {{ book.author }} (Genre: {{ book.genre }})
          </div>
          <div v-else-if="book.type === 'Textbook'">
            <strong>Textbook:</strong> {{ book.title }} by {{ book.author }} (Subject: {{ book.subject }})
          </div>
          <div v-else class="row">
            <strong>Book:</strong> {{ book.title }} by {{ book.author }}
          </div>
          <button @click="removeBook(book.title)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { useBookStore } from '../stores/bookStore';
  
  export default defineComponent({
    setup() {
      const bookStore = useBookStore();
      const currentFilter = ref(bookStore.filter);
      const currentSortOption = ref(bookStore.sortOption);
  
      const filteredBooks = computed(() => bookStore.filteredBooks);
  
      const applyFilter = () => {
        bookStore.setFilter(currentFilter.value);
      };
  
      const applySortOption = () => {
        bookStore.setSortOption(currentSortOption.value);
      };
  
      const removeBook = (title: string) => {
        bookStore.removeBook(title);
      };
  
      return {
        currentFilter,
        currentSortOption,
        filteredBooks,
        applyFilter,
        applySortOption,
        removeBook,
      };
    },
  });
  </script>
  

  <style lang="scss" scoped>
  button{
    background-color: red;
    border-color: red;
    padding: 6px 8px;
    font-weight: 600;
    margin-left: 30px;
  }

  button:hover{
    color: red;
    font-weight: 700;
  }

  select{
    width: 27%;
    margin-right: 10px;
  }

  .row{
    display: inline;

  }
  </style>