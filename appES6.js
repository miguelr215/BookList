// ES6
// BOOK CLASS
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};

// UI CLASS
class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');
        // Create element
        const row = document.createElement('tr');
        // Insert columns
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;

        list.appendChild(row);
    }

    showAlert(message, className){
        // Create div
        const div = document.createElement("div");
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        // Insert alert
        container.insertBefore(div, form);
        // Timeout after 3 seconds
        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 3000);
    }

    deleteBook(target){
        if(target.className === "delete"){
            target.parentElement.parentElement.remove();
        };
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
};

// LOCAL STORAGE CLASS
// static methods so they don't need instantiating to use them
class Store {
    // fetch books from storage
    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        };

        return books;
    }

    // display books
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(book => {
            const ui = new UI;

            ui.addBookToList(book);
        });
    }

    // add book to storage
    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }

    // delete book from storage
    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
};

// DOM LOAD EVENT LISTENER
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// EVENT LISTENER FOR ADD BOOK
document.getElementById('book-form').addEventListener('submit', function(e){    
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title === "" || author === "" || isbn === ""){
        // show error
        ui.showAlert("Please fill in all fields", "error");
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add book to Local Storage
        Store.addBook(book);

        // show success
        ui.showAlert("Book successfully added", "success");

        // clear fields after adding book to list
        ui.clearFields();   
    };

    // prevent form default
    e.preventDefault();
});

// EVENT LISTENER FOR DELETE BOOK
document.getElementById("book-list").addEventListener("click", function(e){
    // Instantiate UI
    const ui = new UI();

    // deleteBook
    ui.deleteBook(e.target);

    // remove from Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show alert
    ui.showAlert("Book successfully deleted", "success");

    // prevent default
    e.preventDefault();
});