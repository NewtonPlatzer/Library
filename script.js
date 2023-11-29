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

function messageBooks(option) {
  let containerLibrary = document.querySelector(".container-library");
  let tableBooks = document.getElementById("table-books");
  let messageNoBooks = document.querySelector(".message-no-books");
  let btnNewBook2 = document.querySelector(".newBook2");

  if (option == false) {
    tableBooks.style.display = "none";
    containerLibrary.style.textAlign = "center";
    btnNewBook2.style.margin = "1rem";
    messageNoBooks.style.display = "block";
    btnNewBook2.style.display = "inline-block";
  } else if (option == true) {
    tableBooks.style.display = "table";
    containerLibrary.style.textAlign = "left";
    messageNoBooks.style.display = "none";
    btnNewBook2.style.display = "none";
  }
}

function addBookToLibrary(name, author, pages, status) {
  let index = library.length + 1;
  let book = new Book(index, name, author, pages, status);
  library.push(book);
  // if (library.length == 1) {
  //   window.location.reload();
  // }
  localStorage.setItem("library", JSON.stringify(library)); // Almacenamiento
  //
  // let tBodyTableBooks = document.querySelector("#tbody-table-books");
  // let tr = document.createElement("tr");
  // let tdName = document.createElement("td");
  // let tdAuthor = document.createElement("td");
  // let tdPages = document.createElement("td");
  // let tdStatus = document.createElement("td");
  // let tdTrash = document.createElement("td");
  // tdName.innerText = library[library.length - 1].name;
  // tdAuthor.innerText = library[library.length - 1].author;
  // tdPages.innerText = library[library.length - 1].pages;
  // tdStatus.innerText = library[library.length - 1].status;
  // tdTrash.innerHTML =
  //   '<a id="btnRemoveBook"><i class="bi bi-trash-fill"></i></a>';
  // tr.appendChild(tdName);
  // tr.appendChild(tdAuthor);
  // tr.appendChild(tdPages);
  // tr.appendChild(tdStatus);
  // tr.appendChild(tdTrash);
  // tBodyTableBooks.appendChild(tr);
  window.location.reload();
  removeBook();
}
function removeBook() {
  let tBodyTableBooks = document.querySelector("#tbody-table-books");
  let btnsRemove = document.querySelectorAll("#btnRemoveBook");
  btnsRemove.forEach((btnRemove) => {
    btnRemove.addEventListener("click", () => {
      let bookDelete = btnRemove.parentNode.parentNode; // Obtengo la fila a eliminar del DOM
      //let validateDelete = confirm("¿Realmente quiere eliminar el libro?");
      //if (validateDelete) {
      tBodyTableBooks.removeChild(bookDelete);
      let bookDeleteArray = library.findIndex(
        (book) => book.name == bookDelete.firstChild.textContent
      );
      library.splice(bookDeleteArray, 1);
      localStorage.setItem("library", library);
      if (library.length == 0) {
        messageBooks(false);
      }
      //} else {
      //console.log("No se elimino por voluntad del usuario");
      //}
    });
  });
}
function displayBooks() {
  // Lista
  //var storageLength = localStorage.length;
  if (localStorage.length == 0 || localStorage.library == "") {
    messageBooks(false);
  } else {
    messageBooks(true);
    let libraryLocalStorage = localStorage.getItem("library");
    console.table(library);
    library = JSON.parse(libraryLocalStorage);
    console.table(library);
    for (let i = 0; i < library.length; i++) {
      let tBodyTableBooks = document.querySelector("#tbody-table-books");
      let tr = document.createElement("tr");
      let tdName = document.createElement("td");
      let tdAuthor = document.createElement("td");
      let tdPages = document.createElement("td");
      let tdStatus = document.createElement("td");
      let tdTrash = document.createElement("td");
      tdName.innerText = library[i].name;
      tdAuthor.innerText = library[i].author;
      tdPages.innerText = library[i].pages;
      tdStatus.innerText = library[i].status;
      tdTrash.innerHTML =
        '<a id="btnRemoveBook"><i class="bi bi-trash-fill"></i></a>';
      tr.appendChild(tdName);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdPages);
      tr.appendChild(tdStatus);
      tr.appendChild(tdTrash);
      tBodyTableBooks.appendChild(tr);
      removeBook();

    }
    //adminPopupNewBook();
  }
}
function adminPopupNewBook() {
  let btnOpenPopup = document.querySelectorAll("#newBook");
  let nBookPopup = document.getElementById("new-book-popup");
  let btnSubmit = document.getElementById("btn-submit");
  let cancelButton = document.getElementById("cancel");
  nBookPopup.style.display = "none";
  btnOpenPopup.forEach((button) => {
    button.addEventListener("click", () => {
      nBookPopup.showModal(); // Se muestra el modal
      nBookPopup.style.display = "flex"; // Se muestra el modal
      btnSubmit.addEventListener("click", () => {
        nBookPopup.style.display = "none";
        let name = document.querySelector("#book-name").value;
        let author = document.querySelector("#author-name").value;
        let pages = document.querySelector("#number-pages").value;
        let status;
        if (document.querySelector("#estatus").checked) {
          status = "Leído";
        } else {
          status = "No leído";
        }
        if (name == "" || author == "") {
        } else {
          addBookToLibrary(name, author, pages, status);
          document.getElementById("form-new-book").reset();
        }
      });
      cancelButton.addEventListener("click", function () {
        nBookPopup.close();
        nBookPopup.style.display = "none";
      });
      document.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
          nBookPopup.close();
          nBookPopup.style.display = "none";
        }
      });
    });
  });
}
displayBooks();
adminPopupNewBook();
