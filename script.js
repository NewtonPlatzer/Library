let library = [];

class Book {
  constructor(name, author, pages, status) {
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
function changeStatus() {
  
  let btnsChangeStatus = document.querySelectorAll("#btn-change-status");
  btnsChangeStatus.forEach((btnChangeStatus) => {
    btnChangeStatus.addEventListener("click", () => {
      let bookChange = btnChangeStatus.parentNode.parentNode;
     
      let idBookChangeState = library.findIndex(
        (book) => book.name == bookChange.firstChild.textContent
      );
      if (btnChangeStatus.textContent == "No leído") {
        library[idBookChangeState].status = "Leído";
        localStorage.setItem("library", JSON.stringify(library));
        btnChangeStatus.innerText = "Leído";
        btnChangeStatus.classList.toggle("btnRead");
        btnChangeStatus.classList.toggle("btnNoRead");

      } else {
        library[idBookChangeState].status = "No leído";
        localStorage.setItem("library", JSON.stringify(library));
        btnChangeStatus.innerText = "No leído";
        btnChangeStatus.classList.toggle("btnRead");
        btnChangeStatus.classList.toggle("btnNoRead");
 
      }
    });
  });

}
function removeBook() {
  let tBodyTableBooks = document.querySelector("#tbody-table-books");
  let btnsRemove = document.querySelectorAll("#btnRemoveBook");
  let popupAlert = document.querySelector("#delete-alert");
  let btnCloseAlert = document.querySelector("#btn-cancel-delete");
  let btnAcceptDelete = document.querySelector("#btn-submit-delete");
  let bookDelete
  btnsRemove.forEach((btnRemove) => {
    btnRemove.addEventListener("click", () => {
      popupAlert.showModal();
      popupAlert.style.display = "flex";
      btnAcceptDelete.addEventListener("click", function () {
        popupAlert.close();
        popupAlert.style.display = "none";
        bookDelete = btnRemove.parentNode.parentNode;
        let bookDeleteArray = library.findIndex(
          (book) => book.name == bookDelete.firstChild.textContent
        );
        library.splice(bookDeleteArray, 1);
        localStorage.setItem("library", JSON.stringify(library));
        if (library.length == 0) {
          messageBooks(false);
          localStorage.removeItem("library");
        }
        tBodyTableBooks.removeChild(bookDelete);
      });
      btnCloseAlert.addEventListener("click", function () {
        popupAlert.close();
        popupAlert.style.display = "none";
      });
      document.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
          popupAlert.close();
          popupAlert.style.display = "none";
        }
      });
    });
  });
}

function addBookToLibrary(name, author, pages, status) {
  let book = new Book(name, author, pages, status);
  library.push(book);
  localStorage.setItem("library", JSON.stringify(library)); // Almacenamiento
  let tBodyTableBooks = document.querySelector("#tbody-table-books");
  let tr = document.createElement("tr");
  let tdName = document.createElement("td");
  let tdAuthor = document.createElement("td");
  let tdPages = document.createElement("td");
  let tdStatus = document.createElement("td");
  let tdTrash = document.createElement("td");
  tdName.innerText = library.at(-1).name;
  tdAuthor.innerText = library.at(-1).author;
  tdPages.innerText = library.at(-1).pages;
  if (library.at(-1).status == "Leído") {
    tdStatus.innerHTML = `<button id="btn-change-status" class="btnRead">${
      library.at(-1).status
    }</button>`;
  } else {
    tdStatus.innerHTML = `<button id="btn-change-status" class="btnNoRead">${
      library.at(-1).status
    }</button>`;
  }
  tdTrash.innerHTML =
    '<a id="btnRemoveBook"><i class="bi bi-trash-fill"></i></a>';
  tr.appendChild(tdName);
  tr.appendChild(tdAuthor);
  tr.appendChild(tdPages);
  tr.appendChild(tdStatus);
  tr.appendChild(tdTrash);
  tBodyTableBooks.appendChild(tr);
  changeStatus();
  removeBook();
}
function displayBooks() {
  if (localStorage.length == 0) {
    messageBooks(false);
  } else {
    messageBooks(true);
    let libraryLocalStorage = localStorage.getItem("library");
    library = JSON.parse(libraryLocalStorage);
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
      if (library[i].status == "Leído") {
        tdStatus.innerHTML = `<button id="btn-change-status" class="btnRead">${library[i].status}</button>`;
      } else {
        tdStatus.innerHTML = `<button id="btn-change-status" class="btnNoRead">${library[i].status}</button>`;
      }
      tdTrash.innerHTML =
        '<a id="btnRemoveBook"><i class="bi bi-trash-fill"></i></a>';
      tr.appendChild(tdName);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdPages);
      tr.appendChild(tdStatus);
      tr.appendChild(tdTrash);
      tBodyTableBooks.appendChild(tr);
    }
  }
  changeStatus();
  removeBook();
}
function adminPopupNewBook() {
  let btnOpenPopup = document.querySelectorAll("#newBook");
  let nBookPopup = document.getElementById("new-book-popup");
  let btnSubmit = document.getElementById("btn-submit");
  let cancelButton = document.getElementById("cancel");

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
          messageBooks(true);
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
