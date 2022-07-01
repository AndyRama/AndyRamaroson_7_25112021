const btnOrder = Array.from(document.querySelectorAll(".filters__dropDown"));

const inputIng = document.getElementById("inputIng");
const inputDev = document.getElementById("inputDev");
const inputUst = document.getElementById("inputUst"); 

// get all btn dropdown  
btnOrder.forEach((btn,index) =>
  btn.addEventListener("click",(e) => {
    e.preventDefault();
    openTaglist(btn.getAttribute("aria-controls"),index);
  })
);

// function Open dropdownBtn on clic
function openTaglist(idContainer, index) {
  let tagContainer = document.getElementById(idContainer);
  let filtersForm = tagContainer.previousElementSibling;
  let icoDropDown = document.querySelector(".ico");

  if (tagContainer.classList.contains("is-expanded")) {
    tagContainer.classList.remove("is-expanded");
    closeInput()
    
  } else {
    if (document.querySelector(".filters__inputContainer.is-expanded") != null) {
      document.querySelector(".filters__inputContainer.is-expanded").classList.remove("is-expanded");
      closeInput(this)
    }
    
    tagContainer.classList.add("is-expanded");

    if(index == 0) {
      inputIng.classList.add("btn-Expansed");
      document.getElementById('inputIng').placeholder = 'Rechercher un ingredient ...';
      document.getElementById("results__ingredients").style.display ="none";
      document.getElementById("icon_1").classList.replace("ico__dropDown", "ico__dropUp");
    }

    if(index == 1){
      inputDev.classList.add("btn-Expansed");
      document.getElementById('inputDev').placeholder = 'Rechercher un appareil ...';
      document.getElementById("results__devices").style.display ="none";
      document.getElementById("icon_2").classList.replace("ico__dropDown", "ico__dropUp"); 
    }

    if(index == 2) {
      inputUst.classList.add("btn-Expansed");
      document.getElementById('inputUst').placeholder = 'Rechercher un ustensile ...';
      document.getElementById("results__ustensils").style.display ="none";
      document.getElementById("icon_3").classList.replace("ico__dropDown", "ico__dropUp");  
    }
  }
}

function closeInput() {
  const isExpanded = document.querySelectorAll(`.btn-Expansed`);
  document.getElementById("icon_1").classList.replace("ico__dropUp", "ico__dropDown");
  document.getElementById("icon_2").classList.replace("ico__dropUp", "ico__dropDown");
  document.getElementById("icon_3").classList.replace("ico__dropUp", "ico__dropDown");

  isExpanded.forEach(btn => {
    btn.classList.remove(`btn-Expansed`);
    //placeholder
    document.getElementById('inputIng').placeholder = 'Ingrédients';
    document.getElementById('inputDev').placeholder = 'Appareils';
    document.getElementById('inputUst').placeholder = 'ustensiles';
  });
}

