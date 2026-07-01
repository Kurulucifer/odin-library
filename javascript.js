const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uuid = crypto.randomUUID();
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}, ID: ${this.uuid}`;
  }

  toggleRead() {
    this.read = this.read === "Read" ? "Unread" : "Read";
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.unshift(newBook);
}

const bookForm = document.getElementById("form-book");
const booksContainer = document.getElementById("library");
const addBookContainer = document.getElementById("add-book-container");

addContainerListeners();
addInputListeners();
addBookToLibrary("Project: Hail Mary", "Andy Weir", 496, "Read");
rebuildLibrary();

function addContainerListeners() {
  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (bookForm.checkValidity()) {
      submitHandler();
    } else {
      for (const input of bookForm.querySelectorAll("input")) {
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  });

  booksContainer.addEventListener("click", (e) => {
    if (e.target.className === "remove-button")
      removeBook(e.target.parentElement.parentElement);
  });

  booksContainer.addEventListener("click", (e) => {
    if (e.target.className === "toggle-read")
      toggleRead(e.target.parentElement.parentElement);
  });
}

function addInputListeners() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");

  title.addEventListener("input", () => {
    const titleError = title.nextElementSibling;
    if (title.validity.valid) {
      titleError.textContent = "";
      titleError.classList.remove("active");
    } else {
      titleError.textContent = "You must input a title.";
      titleError.classList.add("active");
    }
  });

  author.addEventListener("input", () => {
    const authorError = author.nextElementSibling;
    if (author.validity.valid) {
      authorError.textContent = "";
      authorError.classList.remove("active");
    } else {
      authorError.textContent = "You must input an author.";
      authorError.classList.add("active");
    }
  });

  pages.addEventListener("input", () => {
    const pagesError = pages.nextElementSibling;
    if (pages.validity.valid) {
      pagesError.textContent = "";
      pagesError.classList.remove("active");
    } else {
      pagesError.textContent = "You must input the total number of pages.";
      pagesError.classList.add("active");
    }
  });
}

function submitHandler() {
  const bookFormData = new FormData(bookForm);
  const title = bookFormData.get("title");
  const author = bookFormData.get("author");
  const pages = bookFormData.get("pages");
  const readStatus = bookFormData.get("read-status");

  addBookToLibrary(title, author, pages, readStatus);
  const bookEntry = createBookEntry(myLibrary[0]);
  booksContainer.prepend(bookEntry);

  booksContainer.insertBefore(addBookContainer, booksContainer.firstChild);

  bookForm.reset();
}

function createBookEntry(book) {
  const newBookEntry = document.createElement("div");
  newBookEntry.className = "book";
  newBookEntry.dataset.uuid = book.uuid;

  const title = document.createElement("div");
  const author = document.createElement("div");
  const pages = document.createElement("div");
  const read = document.createElement("div");
  const uuid = document.createElement("div");

  title.className = "title";
  author.className = "author";
  pages.className = "pages";
  read.className = "read";
  uuid.className = "uuid";

  title.textContent = book.title;
  author.textContent = `by ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  read.textContent = book.read;
  uuid.textContent = book.uuid;

  newBookEntry.appendChild(title);
  newBookEntry.appendChild(author);
  newBookEntry.appendChild(pages);
  newBookEntry.appendChild(read);
  newBookEntry.appendChild(uuid);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  newBookEntry.appendChild(buttonContainer);

  const toggleRead = document.createElement("button");
  toggleRead.className = "toggle-read";
  toggleRead.textContent = "Toggle Read";
  buttonContainer.appendChild(toggleRead);

  const removeButton = document.createElement("button");
  removeButton.className = "remove-button";
  removeButton.textContent = "Remove";
  buttonContainer.appendChild(removeButton);

  return newBookEntry;
}

function removeBook(bookEntry) {
  for (const book of myLibrary) {
    if (book.uuid === bookEntry.dataset.uuid) {
      const index = myLibrary.indexOf(book);
      myLibrary.splice(index, 1);
      break;
    }
  }

  bookEntry.remove();
}

function toggleRead(bookEntry) {
  for (const book of myLibrary) {
    if (book.uuid === bookEntry.dataset.uuid) {
      book.toggleRead();
      bookEntry.replaceWith(createBookEntry(book));
      break;
    }
  }
}

// For debugging purposes
function rebuildLibrary(bookEntry) {
  const myLibraryCopy = myLibrary.slice().reverse();
  for (const book of myLibraryCopy) {
    const bookEntry = createBookEntry(book);
    booksContainer.prepend(bookEntry);
    booksContainer.insertBefore(addBookContainer, booksContainer.firstChild);
  }
}
