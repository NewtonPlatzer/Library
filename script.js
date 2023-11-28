let library = [];

class Book {
  constructor(index, name, author, pages, status) {
    this.index = index;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}
function addBookToLibrary(index, name, author, pages, status) {
  let book = new Book(index, name, author, pages, status);
  library.push(book);
}
function displayBooks(library) {
  let containerLibrary = document.querySelector(".container-library");
  let tableBooks = document.getElementById("table-books");
  let tBodyTableBooks = document.querySelector("#tbody-tabl-books");
  let messageNoBooks = document.querySelector(".message-no-books");
  let btnNewBook2 = document.querySelector(".newBook2");
  if (library != "") {
    tableBooks.style.display = "table";
    containerLibrary.style.textAlign = "left";
    messageNoBooks.style.display = "none";
    btnNewBook2.style.display = "none";
    for (let i = 0; i < library.length; i++) {
      let tr = document.createElement("tr");
      for (let b = 0; b < library.length; b++) {
        let td = document.createElement("td");
        td.innerText = library[i][b]
        tr.appendChild(td)
      }
    }
  } else {
    tableBooks.style.display = "none";
    containerLibrary.style.textAlign = "center";
    btnNewBook2.style.margin = "1rem";
    messageNoBooks.style.display = "block";
    btnNewBook2.style.display = "inline-block";
  }
}
function adminPopupNewBook() {
  //let btnOpenPopup = document.getElementById("newBook");
  let btnSubmit = document.getElementById("btn-submit");
  let cancelButton = document.getElementById("cancel");
  let nBookPopup = document.getElementById("new-book-popup");
  let btnOpenPopup = document.querySelectorAll("button");
  nBookPopup.style.display = "none";
  btnOpenPopup.forEach((button) => {
    button.addEventListener("click", () => {
      nBookPopup.showModal();
      nBookPopup.style.display = "flex";
    });
  });
  btnSubmit.addEventListener("click", function () {
    nBookPopup.style.display = "none";
    let index = library.length + 1;
    let name = document.querySelector("#book-name").value;
    let author = document.querySelector("#author-name").value;
    let pages = document.querySelector("#number-pages").value;
    let status;
    if (document.querySelector("#estatus").checked) {
      status = "leido";
    } else {
      status = "no leido";
    }
    addBookToLibrary(index, name, author, pages, status);
    document.getElementById("form-new-book").reset();
    displayBooks(library);
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
}
adminPopupNewBook();
displayBooks(library);
