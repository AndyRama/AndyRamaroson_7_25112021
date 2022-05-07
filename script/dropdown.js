// get all btn dropdown  
document.querySelectorAll(".filters__dropDown").forEach((btn) =>
  btn.addEventListener("click",(e) => {
    e.preventDefault();
    openTaglist(btn.getAttribute("aria-controls"));
  })
);

// function Open dropdownBtn on clic
function openTaglist(idContainer) {
  let tagContainer = document.getElementById("idContainer");
  const filtersForm = tagContainer.previousElementSibling;
  const icoDropDown = filtersForm.querySelector(".ico");
}
