// get all btn dropdown  
document.querySelectorAll(".filters__dropDown").forEach((btn) =>
  btn.addEventListener("click",(e) => {
    e.preventDefault();
    openTaglist(btn.getAttribute("aria-controls"));
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
  } else {
    if (document.querySelector(".filters__inputContainer.is-expanded") != null) {
       document.querySelector(".filters__inputContainer.is-expanded").classList.remove("is-expanded");
    }
    tagContainer.classList.add("is-expanded");
    icoDropDown.classList.replace("ico__dropDown", "ico__dropUp");
  }
}
