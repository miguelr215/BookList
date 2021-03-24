// ES5
// BOOK CONSTRUCTOR
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
};

// UI CONSTRUCTOR
function UI() {};

// Add book to list
UI.prototype.addBookToList = function(book){
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
};

// Show Alert
UI.prototype.showAlert = function(message, className){
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
};

// Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === "delete"){
        target.parentElement.parentElement.remove();
    };
};

// Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};

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

    // show alert
    ui.showAlert("Book successfully deleted", "success");

    // prevent default
    e.preventDefault();
});