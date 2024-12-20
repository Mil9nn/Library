const myLibrary = [];

function Book(title, author, noOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.readStatus = readStatus;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${this.readStatus}`;
}

function addBookToLibrary() {
    const books = [
       new Book("The Name of the Wind", "Patrick Rothufuss", 662, "Not read yet"),
       new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 625, "Not read yet"),
       new Book("The Priority of the Orange Tree", "Samantha Shannon", 848, "Not read yet"),
       new Book("Assassin's Apprentice", "Robin Hobb", 392, "Not read yet")
    ];

    // Pushing Each Book into myLibrary.
    books.forEach((book) => {
        myLibrary.push(book);
    });
}

function displayBooks() {
    const container = document.querySelector("#books-container");
    container.innerHTML = ""; // Clear previous content.

    myLibrary.forEach((book, bookIndex) => {
       const bookElement = document.createElement("div");
       const bookTitle = document.createElement("h2");
       const authorName = document.createElement("p");
       const pages = document.createElement("p");
       const readStat = document.createElement("p");
       const deleteButton = document.createElement("button");

       // Adding classes to the div and p.
        bookElement.classList.add("book");
        bookTitle.classList.add("book-title");
        authorName.classList.add("author-name");
        pages.classList.add("no-of-pages");
        readStat.classList.add("read-status");
        deleteButton.classList.add("delete-btn");

       // Adding content to the created elements.
       bookTitle.textContent = book.title;
       authorName.textContent = `- by ${book.author}`;
       pages.textContent = `${book.noOfPages}-pages`;
       readStat.textContent = book.readStatus;

       // Adding Font Awesome trash icon to the delete button.
       deleteButton.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;

       readStat.addEventListener("click", function () {
        if (this.textContent == "Read") {
            this.style.backgroundColor="#fff";
            this.textContent = "Not read yet";
        } else if (this.textContent == "Not read yet") {
            this.style.backgroundColor = "#9173f3";
            this.textContent = "Read";
        }
    });

       // Add the delete functionality.
       deleteButton.addEventListener("click", () => {
           myLibrary.splice(bookIndex, 1); // Using bookIndex to remove the correct book
           displayBooks(); // Refresh the book list
       });

       // Append all the elements to the container.
       bookElement.appendChild(bookTitle);
       bookElement.appendChild(authorName);
       bookElement.appendChild(pages);
       bookElement.appendChild(readStat);
       bookElement.appendChild(deleteButton);

       container.appendChild(bookElement);
    });
}

addBookToLibrary();
displayBooks();

const showFormBtn = document.querySelector(".show-form-btn");
const hideFormBtn = document.querySelector("#cancel-button");
const form = document.querySelector("#new-book-form");

showFormBtn.addEventListener("click", function () {
    form.style.display = "inline-block";
});

hideFormBtn.addEventListener("click", function () {
    form.style.display = "none";
});

function addNewBook(event) {
    event.preventDefault();

    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#book-author").value;
    const noOfPages = document.querySelector("#book-pages").value;
    const readStatus = document.querySelector("#book-read-status").value;

    const newBook = new Book(title, author, parseInt(noOfPages), readStatus);
    myLibrary.push(newBook);
    form.style.display = "none"; // Hide the form after adding the book.
    displayBooks();  // Refresh the book list

    document.querySelector("#book-form").reset(); // Clearing the form inputs
}

document.querySelector("#book-form").addEventListener("submit", addNewBook);
