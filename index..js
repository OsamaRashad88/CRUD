var productname = document.getElementById("name");
var productprice = document.getElementById("price");
var proudctcategory = document.getElementById("category");
var proudctnotes = document.getElementById("notes");
var addproduct = document.getElementById("addproduct");
var updateproduct = document.getElementById("updateproduct");
var wrongname = document.getElementById("wrongname");
var wrongprice = document.getElementById("wrongprice");
var wrongcategory = document.getElementById("wrongcategory");
var wrongnotes = document.getElementById("wrongnotes");
var counterspan = document.getElementById("counterspan");

var carton = [];

if (localStorage.getItem("saveddata") != null) {
  carton = JSON.parse(localStorage.getItem("saveddata"));
  display(carton);
}

function savedata() {
  /* create an object to save the user inputs and push it into the caron array. funs when clicking addproduct button      */
  if (
    validate_name() == true &&
    validate_price() == true &&
    validate_category() == true &&
    validate_notes() == true
  ) {
    var x = {
      name: productname.value,
      price: productprice.value,
      category: proudctcategory.value,
      notes: proudctnotes.value,
    };
    carton.push(x);
    localStorage.setItem("saveddata", JSON.stringify(carton));

    clearform();
    display(carton);
  }
}

function clearform() {
  productname.value = "";
  productprice.value = "";
  proudctcategory.value = "";
  proudctnotes.value = "";
}

function display(list) {
  /* function loop through array and display data in rows .runs after clicking add and  pushing in carton  */
  var products_table = "";
  for (i = 0; i < list.length; i++) {
    products_table += `<tr>
            <td>
            ${i + 1}

             </td>
             <td>
             ${list[i].newname ? list[i].newname : list[i].name}
             </td>
             <td>
             ${list[i].price}
             </td>
             <td>
             ${list[i].category}

             </td>
             <td>
             ${list[i].notes}

             </td>
             <td>
                 <button class='btn btn-primary' onclick='updateItem(${i})'>
                 update
               </button>
             </td>
             <td>
               <button class='btn btn-primary' onclick='deleteRow(${i})' >
                 delete
               </button>
             </td>
            
          </tr>`;
  }
  document.getElementById("tbody").innerHTML = products_table;
}
function deleteRow(index) {
  carton.splice(carton[index], 1);
  display(carton);
  localStorage.setItem("saveddata", JSON.stringify(carton));
}
var clickedIndex;
function updateItem(z) {
  productname.value = carton[z].name;
  productprice.value = carton[z].price;
  proudctcategory.value = carton[z].category;
  proudctnotes.value = carton[z].notes;
  clickedIndex = z;
  addproduct.classList.add("d-none");
  updateproduct.classList.replace("d-none", "d-flex");

  localStorage.setItem("saveddata", JSON.stringify(carton));
}

function hideupdate() {
  carton[clickedIndex].name = productname.value;
  carton[clickedIndex].price = productprice.value;
  carton[clickedIndex].category = proudctcategory.value;
  carton[clickedIndex].notes = proudctnotes.value;
  display(carton);
  clearform();
  updateproduct.classList.replace("d-flex", "d-none");
  addproduct.classList.replace("d-none", "d-flex");
}
function search(searchitem) {
  var founded = [];

  for (var i = 0; i < carton.length; i++) {
    if (
      carton[i].name.toLowerCase().includes(searchitem.toLowerCase()) == true
    ) {
      carton[i].newname = carton[i].name.replace(
        searchitem,
        `<span class=" text-primary">${searchitem}</span>`
      );

      founded.push(carton[i]);
      console.log(carton[i].newname);
    }
  }
  display(founded);
}
function validate_name() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(productname.value) == true) {
    productname.style.border = "none";
    wrongname.classList.add("d-none");
    return true;
  } else {
    productname.style.border = "5px solid red";
    wrongname.classList.remove("d-none");
    return false;
  }
}
function validate_price() {
  var regex = /^([1-9][0-9][0-9][0-9]|10000)$/;
  if (regex.test(productprice.value) == true) {
    productprice.style.border = "none";
    wrongprice.classList.add("d-none");
    return true;
  } else {
    productprice.style.border = "5px solid red";
    wrongprice.classList.remove("d-none");
    return false;
  }
}
function validate_category() {
  var regex = /^(tv|mobile|laptop)$/;
  if (regex.test(proudctcategory.value.toLowerCase()) == true) {
    proudctcategory.style.border = "none";
    wrongcategory.classList.add("d-none");
    return true;
  } else {
    proudctcategory.style.border = "5px solid red";
    wrongcategory.classList.remove("d-none");
    return false;
  }
}
function validate_category() {
  var regex = /^(tv|mobile|laptop)$/;
  if (regex.test(proudctcategory.value.toLowerCase()) == true) {
    proudctcategory.style.border = "none";
    wrongcategory.classList.add("d-none");
    return true;
  } else {
    proudctcategory.style.border = "5px solid red";
    wrongcategory.classList.remove("d-none");
    return false;
  }
}
function validate_notes() {
  var regex = /^.{15,30}$/;
  if (regex.test(proudctnotes.value) == true) {
    proudctnotes.style.border = "none";
    wrongnotes.classList.add("d-none");
    return true;
  } else {
    proudctnotes.style.border = "5px solid red";
    wrongnotes.classList.remove("d-none");
    return false;
  }
}
/*
function count(text) {
  var writtenletters = text.value.length;
  counterspan.innerHTML = `<p class=text-white>${writtenletters} /250</p>`;
}

proudctnotes.addEventListener("input", function () {
  count(proudctnotes);
});
*/
