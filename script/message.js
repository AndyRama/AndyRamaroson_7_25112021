// Display message 
function showErrorMessage(count) {  
  const noRecipesMessage = document.getElementById("filtersMessage");
  // Create message error
  if(count == 0) {
    noRecipesMessage.innerHTML = `
      <p class="filters__message">
        "Aucune recette ne correspond à votre recherche... Vous pouvez chercher "tarte aux pommes", "poisson", etc ..."
        <svg id="closeM" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"></path>
        </svg>
      </p>        
    `;
    document.getElementById("closeM").addEventListener("click", removeErrorMessage);

  // Create message succes
  } else if (count == 50) {    
    noRecipesMessage.innerHTML =  noRecipesMessage.innerHTML = ``;
    } else {
      noRecipesMessage.innerHTML =  noRecipesMessage.innerHTML = `
        <p class="filters__message--succes">
          ${count} résultats trouvés correspondant à votre recherche....
          <svg id="closeM" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"></path>
          </svg>
        </p>        
      `;
      document.getElementById("closeM").addEventListener("click", removeErrorMessage);  
  }
}

// remove message error
function removeErrorMessage() {
  const noRecipesMessage = document.getElementById("filtersMessage");
  const searchBarInput = document.getElementById("search");

  noRecipesMessage.innerHTML = ""
  searchBarValue = "";
  searchBarInput.value = "";
}