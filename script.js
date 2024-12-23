const library = [];
const container = document.querySelector("#library");

function Book(title, author, noOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.readStatus = readStatus
}

function addBook() {
    const books = [
        new Book("The Name of the Wind", "Patrick Rothfuss", 662, "Not read yet"),
        new Book("The Priory of the Orange Tree", "Samantha Shannon", 848, "Not read yet"),
        new Book("The Last Wish", "Andrzej Sapkowski", 360, "read"),
        new Book("The Hobbit", "J.R.R. Tolkien", 310, "Not read yet"),
        new Book("The Catcher in the Rye", "J.D. Salinger", 277, "Not read yet"),
    ];

    books.forEach(book => {
        library.push(book);
    });
}

function showBook() {
  container.innerHTML = "";

   library.forEach((book, index) => {
        // Book Div
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book");
        container.appendChild(bookContainer);
    
        // Creating new elements for each book
        const bookHeading = document.createElement("h1");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookStatus = document.createElement("p");
        const deleteBtn = document.createElement("button");

        // Adding classes
        bookHeading.classList.add("book-title");
        bookAuthor.classList.add("book-author");
        bookPages.classList.add("book-pages");
        bookStatus.classList.add("book-status");
        deleteBtn.classList.add("book-delete");

        // Setting the content for each book
        bookHeading.textContent = book.title;
        bookAuthor.textContent = `by ${book.author}`;
        bookPages.textContent = `${book.noOfPages} pages`;
        bookStatus.textContent = book.readStatus;
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

        // Append book details to the container
        bookContainer.appendChild(bookHeading);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookPages);
        bookContainer.appendChild(bookStatus);
        bookContainer.appendChild(deleteBtn);

        // Book Status Toggle Functionality.
        bookStatus.addEventListener("click", function() {
            if(this.textContent === "Read") {
                this.textContent = "Not read yet";
            } else {
                this.textContent = "Read";
            }
        });

        // Delete 
        deleteBtn.addEventListener("click", function() {
            library.splice(index, 1);  // value 1 is the delete count here
            // Re-render the book after deletion.
            showBook();
        })

   });
}

function getBook(event) {
    event.preventDefault();

    // Get input values from the form
    const title = document.querySelector(".input-title").value;
    const author = document.querySelector(".input-author").value;
    const noOfPages = document.querySelector(".input-pages").value;
    const readStatus = document.querySelector(".input-status").value;

    // Create a new Book object and add it to the library
    const newBook = new Book(title, author, noOfPages, readStatus);
    library.push(newBook);

    // Display the new book
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book");
    container.appendChild(bookContainer);

    // Display the new book
    showBook();

    // Clears the form inputs
   form.reset();
}

const authorOfBook = document.querySelector(".book-author");
console.log(authorOfBook);

const addBookBtn = document.querySelector("#add-book-btn");
let displayForm = false;
addBookBtn.addEventListener("click", function() {
    const bookForm = document.querySelector("#book-form");
    if(displayForm === false) {
        bookForm.style.display="flex";
        displayForm = true;
    }
})

const formCancelBtn = document.querySelector(".form-cancel-btn");
formCancelBtn.addEventListener("click", function() {
    const bookForm = document.querySelector("#book-form");
    if(displayForm === true) {
        bookForm.style.display="none";
        displayForm = false;
    }
})

const form = document.querySelector("#book-form");
form.addEventListener("submit", getBook);

addBook();
showBook();