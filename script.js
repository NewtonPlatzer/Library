let library = [];

class Book {
  constructor(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}
function adminPopupNewBook() {
  let btnOpenPopup = document.getElementById("newBook");
  let btnSubmit = document.getElementById("btn-submit");
  let cancelButton = document.getElementById("cancel");
  let nBookPopup = document.getElementById("new-book-popup");
  nBookPopup.style.display = "none";
  btnOpenPopup.addEventListener("click", function () {
    nBookPopup.showModal();
    nBookPopup.style.display = "flex";
  });
  btnSubmit.addEventListener("click", function () {
    nBookPopup.style.display = "none";
    let name = document.querySelector("#book-name").value;
    let author = document.querySelector("#author-name").value;
    let pages = document.querySelector("#number-pages").value;
    let status;
    if (document.querySelector("#estatus").checked) {
      status = "leido";
    } else {
      status = "no leido";
    }
    addBookToLibrary(name, author, pages, status);
    document.getElementById("form-new-book").reset();
  });
  cancelButton.addEventListener("click", function () {
    nBookPopup.close();
    nBookPopup.style.display = "none";
  });
  document.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
      nBookPopup.style.display = "none";
    }
  });
  displayBooks(library);

}
adminPopupNewBook();

function displayBooks(library) {
  
}

function deleteBook() {
  let btnDeleteBook = document.querySelector(".delete-btn");
  btnDeleteBook.addEventListener("click", function () {
    let trBook = btnDeleteBook.parentNode.parentNode.remove();
  });
}
deleteBook();


function addBookToLibrary(name, author, pages, status) {
  let book = new Book(name, author, pages, status);
  library.push(book);
}
