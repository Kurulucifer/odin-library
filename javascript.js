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
    myLibrary.push(newBook);
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



// addBookToLibrary("Project: Hail Mary", "Andy Weir", 400, "READ");
// console.log(myLibrary);



