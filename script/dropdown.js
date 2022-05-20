const inputIng = document.getElementById("inputIng");
const inputDev = document.getElementById("inputDev");
const inputUst = document.getElementById("inputUst");

const btnOrder = Array.from(document.querySelectorAll(".filters__dropDown"));

// get all btn dropdown  
btnOrder.forEach((btn,index) =>
  btn.addEventListener("click",(e) => {
    e.preventDefault();
    openTaglist(btn.getAttribute("aria-controls"));

    if(index == 0) {
      inputIng.classList.add("btn-Expansed");
    }

    if(index == 1){
      inputDev.classList.add("btn-Expansed");
    }

    if(index == 2) {
      inputUst.classList.add("btn-Expansed");
    }
  })
);

// function Open dropdownBtn on clic
function openTaglist(idContainer) {
  let tagContainer = document.getElementById(idContainer);
  const filtersForm = tagContainer.previousElementSibling;
  const icoDropDown = filtersForm.querySelector(".ico");


  if (tagContainer.classList.contains("is-expanded")) {
    tagContainer.classList.remove("is-expanded");
    icoDropDown.classList.replace("ico__dropUp", "ico__dropDown");
    // inputIng.classList.remove("btn-Expansed");
    // inputDev.classList.remove("btn-Expansed");
    // inputUst.classList.remove("btn-Expansed");

  } else {
    if (document.querySelector(".filters__inputContainer.is-expanded") != null) {
      document.querySelector(".filters__inputContainer.is-expanded").classList.remove("is-expanded");

    }
    tagContainer.classList.add("is-expanded");
    icoDropDown.classList.replace("ico__dropDown", "ico__dropUp");   
  }
}
