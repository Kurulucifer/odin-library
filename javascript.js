const myLibrary = [];

function Book(title, author, pages, read, uuid) {
    if (!new.target) {
        throw Error("You must use the 'new' oeprator to call the constructor.")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uuid = uuid

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}, ID: ${this.uuid}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read, crypto.randomUUID());
    myLibrary.unshift(newBook);
    updateVisualLibrary();
}

const bookForm = document.getElementById("form-book");

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitHandler();
});

function submitHandler() {
    const bookFormData = new FormData(bookForm);
    const title = bookFormData.get("title");
    const author = bookFormData.get("author");
    const pages = bookFormData.get("pages");
    const readStatus = bookFormData.get("read-status");
    addBookToLibrary(title, author, pages, readStatus);
    bookForm.reset();
}

const booksContainer = document.getElementById("library");

function updateVisualLibrary() {
    const bookEntry = createBookEntry(myLibrary[0]);
    booksContainer.prepend(bookEntry);
}

function createBookEntry(book) {
    const newBookEntry = document.createElement("div");
    newBookEntry.className = "book";

    const title = document.createElement("div");
    const author = document.createElement("div");
    const pages = document.createElement("div");
    const read = document.createElement("div");
    const uuid = document.createElement("div");

    title.className = "title";
    author.className = "author";
    pages.className = "pages";
    read.className = "read";
    uuid.className = "uuid"

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    read.textContent = book.read;
    uuid.textContent = book.uuid;

    newBookEntry.appendChild(title);
    newBookEntry.appendChild(author);
    newBookEntry.appendChild(pages);
    newBookEntry.appendChild(read);
    newBookEntry.appendChild(uuid);

    return newBookEntry;
}





// addBookToLibrary("Project: Hail Mary", "Andy Weir", 400, "READ");
// console.log(myLibrary);



