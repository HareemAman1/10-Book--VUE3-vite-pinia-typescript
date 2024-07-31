import { defineStore } from 'pinia';

// BASE CLASS: creates object with these properties
// private: restricts direct access of the property
class Book {
  private _title: string;  
  private _author: string;
  type: string;

  // CONSTRUCTOR: a function called to create objects
  // pass the value to constructor  
  constructor(title: string, author: string) {
    this._title = title;
    this._author = author;
    this.type = 'Book';
  }


  // GET: return value of properties (get access of private in a controlled way)
  get title(): string {
    return this._title;
  }

 // SET: sets value + validation
  set title(newTitle: string) {
    if (newTitle.trim()) {
      this._title = newTitle;
    } else {
      throw new Error('Title cannot be empty.');
    }
  }


  get author(): string {
    return this._author;
  }


  set author(newAuthor: string) {
    if (newAuthor.trim()) {
      this._author = newAuthor;
    } else {
      throw new Error('Author cannot be empty.');
    }
  }
}

// INHERITANCE: have same properties as parent class + a new property
// SUPER: calls constructor of parent class to initialize the inherited properties
class Novel extends Book {
  private _genre: string;

  constructor(title: string, author: string, genre: string) {
    super(title, author);
    this._genre = genre;
    this.type = 'Novel';
  }


  get genre(): string {
    return this._genre;
  }


  set genre(newGenre: string) {
    if (newGenre.trim()) {
      this._genre = newGenre;
    } else {
      throw new Error('Genre cannot be empty.');
    }
  }
}

// INHERITANCE
class Textbook extends Book {
  private _subject: string;

  constructor(title: string, author: string, subject: string) {
    super(title, author);
    this._subject = subject;
    this.type = 'Textbook';
  }


  get subject(): string {
    return this._subject;
  }


  set subject(newSubject: string) {
    if (newSubject.trim()) {
      this._subject = newSubject;
    } else {
      throw new Error('Subject cannot be empty.');
    }
  }
}


export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [] as Book[],
    filter: 'All',
    sortOption: 'Title',
  }),
  getters: {
    filteredBooks: (state) => {
      let filtered = state.books;
      if (state.filter === 'Novel') {
        filtered = state.books.filter((book) => book.type === 'Novel');
      } else if (state.filter === 'Textbook') {
        filtered = state.books.filter((book) => book.type === 'Textbook');
      }

      return filtered.sort((a, b) => {
        if (state.sortOption === 'Title') {
          return a.title.localeCompare(b.title);
        } else {
          return a.author.localeCompare(b.author);
        }
      });
    },
  },
  actions: {
    addBook(book: Book) {
      this.books.push(book);
    },
    removeBook(title: string) {
      this.books = this.books.filter((book) => book.title !== title);
    },
    setFilter(filter: string) {
      this.filter = filter;
    },
    setSortOption(sortOption: string) {
      this.sortOption = sortOption;
    },
  },
});

export { Book, Novel, Textbook };
