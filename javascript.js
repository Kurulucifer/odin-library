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

    this.toggleRead = function () {
        this.read = this.read === "Read" ? "Unread" : "Read";
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read, crypto.randomUUID());
    myLibrary.unshift(newBook);
}

const bookForm = document.getElementById("form-book");
const booksContainer = document.getElementById("library");
const addBookContainer = document.getElementById("add-book-container");

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitHandler();
});

booksContainer.addEventListener("click", (e) => {
    if (e.target.className === "remove-button")
        removeBook(e.target.parentElement);
})

booksContainer.addEventListener("click", (e) => {
    if (e.target.className === "toggle-read")
        toggleRead(e.target.parentElement);
})

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
    author.textContent = book.author;
    pages.textContent = book.pages;
    read.textContent = book.read;
    uuid.textContent = book.uuid;

    newBookEntry.appendChild(title);
    newBookEntry.appendChild(author);
    newBookEntry.appendChild(pages);
    newBookEntry.appendChild(read);
    newBookEntry.appendChild(uuid);

    const toggleRead = document.createElement("button");
    toggleRead.className = "toggle-read";
    toggleRead.textContent = "Toggle Read";
    newBookEntry.appendChild(toggleRead);

    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    newBookEntry.appendChild(removeButton);

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

addBookToLibrary("Project: Hail Mary 1", "Andy Weir", 400, "Read");
addBookToLibrary("Project: Hail Mary 2", "Andy Weir", 400, "Read");
addBookToLibrary("Project: Hail Mary 3", "Andy Weir", 400, "Read");
addBookToLibrary("Project: Hail Mary 4", "Andy Weir", 400, "Read");
addBookToLibrary("Project: Hail Mary 5", "Andy Weir", 400, "Read");
rebuildLibrary();




