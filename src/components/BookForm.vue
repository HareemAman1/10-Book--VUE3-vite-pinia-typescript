<template>
    <div>
      <h2>Add a New Book</h2>
      <form @submit.prevent="addNewBook">
        <div>
          <label for="title">Title:</label> <br>
          <input type="text" id="title" v-model="title" required />
        </div>
        <br>
        <div>
          <label for="author">Author:</label> <br>
          <input type="text" id="author" v-model="author" required />
        </div>
        <br>
        <div>
          <label for="type">Type:</label> <br>
          <select id="type" v-model="type">
            <option value="Book">Book</option>
            <option value="Novel">Novel</option>
            <option value="Textbook">Textbook</option>
          </select>
        </div>
        <br>
        <div v-if="type === 'Novel'">
          <label for="genre">Genre:</label>
          <input type="text" id="genre" v-model="genre" />
        </div>
        <div v-if="type === 'Textbook'">
          <label for="subject">Subject:</label>
          <input type="text" id="subject" v-model="subject" />
        </div>
        <button class="button-container" type="submit">Add Book</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useBookStore, Book, Novel, Textbook } from '../stores/bookStore';
  import axios from 'axios';

  export default defineComponent({
    setup() {
      const bookStore = useBookStore();
      const title = ref('');
      const author = ref('');
      const type = ref('Book');
      const genre = ref('');
      const subject = ref('');
  
      // const addNewBook = () => {
      //   let book;
      //   if (type.value === 'Novel') {
      //     book = new Novel(title.value, author.value, genre.value);
      //   } else if (type.value === 'Textbook') {
      //     book = new Textbook(title.value, author.value, subject.value);
      //   } else {
      //     book = new Book(title.value, author.value);
      //   }
      //   bookStore.addBook(book);
        
        
      //   title.value = '';
      //   author.value = '';
      //   type.value = 'Book';
      //   genre.value = '';
      //   subject.value = '';
      // };
      
      const addNewBook = async () => {
      let book;
      if (type.value === 'Novel') {
        book = new Novel(title.value, author.value, genre.value);
      } else if (type.value === 'Textbook') {
        book = new Textbook(title.value, author.value, subject.value);
      } else {
        book = new Book(title.value, author.value);
      }
      
      // Save to backend
      try {
        await axios.post('http://localhost:3000/books', book);
        bookStore.addBook(book); // Optionally update the Pinia store
        title.value = '';
        author.value = '';
        type.value = 'Book';
        genre.value = '';
        subject.value = '';
      } catch (error) {
        console.error('Error adding book:', error);
      }
    };

  
      return {
        title,
        author,
        type,
        genre,
        subject,
        addNewBook,
      };
    },
  });
  </script>
  
  <style lang="scss" scoped>

  </style>