let products = [
  {
    productName: "HL Road Frame 58",
    Number: 58,
    productColor: "Black",
    productListPrice: 900,
    productSize: 58,
  },
  {
    productName: "HL Road Frame 44",
    Number: 44,
    productColor: "Red",
    productListPrice: 1000,
    productSize: 44,
  },
  {
    productName: "HL Road Frame 55",
    Number: 55,
    productColor: "White",
    productListPrice: 1100,
    productSize: 55,
  },
  {
    productName: "HL Road Frame 65",
    Number: "65",
    productColor: "Blue",
    productListPrice: 950,
    productSize: 58,
  },
  {
    productName: "HL Road Frame 77",
    Number: "77",
    productColor: "Yellow",
    productListPrice: 1300,
    productSize: 77,
  },
  {
    productName: "HL Road Frame 81",
    Number: "81",
    productColor: "Orange",
    productListPrice: 900,
    productSize: 81,
  },
];

// filter by the Product Number

const search = () => {
  let filter = document.getElementById("myInput").value.toUpperCase();
  let table = document.getElementById("table");
  let tr = table.getElementsByTagName("tr");
  for (var i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[2];

    if (td) {
      let textValue = td.textContent || td.innerHTML;
      if (textValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};

// Insert data in the daraTable

function renderDataInTheTable(products) {
  const mytable = document.getElementById("Product-list");
  products.forEach((a) => {
    let newRow = document.createElement("tr");
    let edit = document.createElement("a");
    edit.setAttribute("href", "#");
    edit.innerHTML = "Edit";
    edit.classList.add("edit");
    let deleteBtn = document.createElement("a");
    deleteBtn.setAttribute("href", "#");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("delete");

    Object.values(a).forEach((value) => {
      let cell = document.createElement("td");

      cell.innerText = value;
      newRow.appendChild(cell);
      newRow.appendChild(edit);
      newRow.appendChild(deleteBtn);
    });
    mytable.appendChild(newRow);
  });
}

renderDataInTheTable(products);

// Create function to add a new product to the dataTable

let add = function () {
  let selectedRow = null;

  function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  // clear fields
  function clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("ProductNumber").value = "";
    document.getElementById("color").value = "";
    document.getElementById("listPrice").value = "";
    document.getElementById("size").value = "";
  }

  document.getElementById("open-form").addEventListener("submit", (e) => {
    e.preventDefault;

    const name = document.getElementById("name").value;
    const productNumber = document.getElementById("ProductNumber").value;
    const color = document.getElementById("color").value;
    const listPrice = document.getElementById("listPrice").value;
    const size = document.getElementById("size").value;

    // Validation

    if (
      name == "" ||
      productNumber == "" ||
      color == "" ||
      listPrice == "" ||
      size == ""
    ) {
      showAlert("please fill all the fields", "danger");
    } else if (isNaN(listPrice) || listPrice < 0) {
      showAlert("List price must be Number and must be more than 0", "danger");
    } else if (selectedRow == null) {
      const list = document.getElementById("Product-list");
      const Row = document.createElement("tr");

      let edit = document.createElement("a");
      edit.setAttribute("href", "#");
      edit.innerHTML = "Edit";

      edit.classList.add("edit");
      let deleteBtn = document.createElement("a");
      deleteBtn.setAttribute("href", "#");
      deleteBtn.innerHTML = "Delete";
      deleteBtn.classList.add("delete");

      Row.innerHTML = `
      <td>${name}</td>
      <td>${productNumber}</td>
      <td>${color}</td>
      <td>${listPrice}</td>
      <td>${size}</td>
      
      `;
      list.appendChild(Row);
      Row.appendChild(edit);
      Row.appendChild(deleteBtn);
      selectedRow = null;
      showAlert("Product added", "success");
    } else {
      selectedRow.children[0].textContent = name;
      selectedRow.children[1].textContent = productNumber;
      selectedRow.children[2].textContent = color;
      selectedRow.children[3].textContent = listPrice;
      selectedRow.children[4].textContent = size;
    }

    clearFields();
  });

  // edit products

  document.getElementById("Product-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
      selectedRow = target.parentElement;
      document.getElementById("name").value =
        selectedRow.children[0].textContent;
      document.getElementById("ProductNumber").value =
        selectedRow.children[1].textContent;
      document.getElementById("color").value =
        selectedRow.children[2].textContent;
      document.getElementById("listPrice").value =
        selectedRow.children[3].textContent;
      document.getElementById("size").value =
        selectedRow.children[4].textContent;
    }
  });

  // delete product

  document.getElementById("Product-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
      target.parentElement.remove();
      showAlert("Product data deleted", "danger");
    }
  });
  // document.getElementById("open-form").classList.remove("new-form");
};

add();
// function openForm() {
//   document.getElementById("add-btn").addEventListener("click", function () {
//     document.getElementById("open-form").classList.add("new-form");
//   });
//   add();
// }
// openForm();

// function closeForm() {
//   document.querySelector(".close-btn").addEventListener("click", function () {
//     document.getElementById("open-form").classList.remove("new-form");
//     clearFields();
//   });
// }

// closeForm();
