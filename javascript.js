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

// addBookToLibrary("Project: Hail Mary", "Andy Weir", 400, "READ");
// console.log(myLibrary);

