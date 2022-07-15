//DOM elements
let recipesArray = [];

let allIngredients = [];
let allDevices = [];
let allUstensils = [];

let filteredIngredients = [];
let filteredDevices = [];
let filteredUstensils = [];

let styleDelay = 0;

// Fetch api Json
fetch("./script/api/recipes.json")
  .then(reponse => {
    if (reponse) return reponse.json();
  })
  .then((value) => {
    recipeCardDom(value.recipes);
    recipesArray = value.recipes;
  })

/** function that generates recipe cards dynamically
  * @params {recipes} loads JSON data to build research papers
  */

function recipeCardDom(recipes) {
  const recipeCard = document.getElementById("recipeContainer");
  recipeCard.innerHTML = "";
  //template cards recipes
  recipes.map(recipe => {
    recipeCard.innerHTML += `
    <article class="recipe__container" style="animation-delay:${styleDelay}ms  >
      <div class="recipe__picture" >
        <img class="recipe__img" data-id="${recipe.id}" src="./public/assets/recipes-images/recette_id_${recipe.id}.jpg" alt="${recipe.name}">
      </div>
      <div class="recipe__infoContent">
        <div class="recipe__legend">
          <h2 class="recipe__name">${recipe.name}</h2>
          <span class ="recipe__time">
            <svg width="20" height="20"class="recipe__icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"/>
            </svg>
            <span id="time">${recipe.time}min</span>
          </span>
        </div>
        <div class="recipe__info">
          <div class="recipe__ingredients">
            <ul id="recipe-${recipe.id}" class="recipe__ingredientList"></ul>
          </div>
          <div class="recipe__instruContent">
            <p class="recipe__instructions">${recipe.description}</p>
          </div>
        </div>
      </div>
    </article>      
    `;
    //get ingredients of recipe and dipslay in card desccription
    const ingredientList = document.getElementById(`recipe-${recipe.id}`);
    const ingredients = recipe.ingredients;
    ingredients.map(ingredient => {
      ingredientList.innerHTML += `
        <li class="recipe__ingredient">${ingredient.ingredient} ${ingredient.quantity === undefined ? "" : ":"}
          <span class="recipe__quantity">${ingredient.quantity === undefined ? "" : ingredient.quantity}
          ${ingredient.unit === undefined ? "" : ingredient.unit}</span>
        </li>
      `;
      styleDelay = styleDelay + 200;
    });
  });

  //get all array of items
  allUstensils = [];
  allDevices = [];
  allIngredients = [];

  //display all tags in taglist container
  recipes.forEach((element) => {
    //ingrédients
    element.ingredients.map((e) => {
      if(allIngredients.indexOf(e.ingredient) == -1) allIngredients.push(e.ingredient);
    });
    
    //devices
    if (allDevices.indexOf(element.appliance) == -1) allDevices.push(element.appliance);
    
    //ustensiles
    element.ustensils.map((e) => {
      if (allUstensils.indexOf(e) == -1) allUstensils.push(e);
    });
  });

  showTags(allIngredients, "ingredientsTaglist", "ingredients");
  showTags(allDevices, "devicesTaglist", "device");
  showTags(allUstensils, "ustensilsTaglist", "ustensils");
}

function searchKeyword() {
  launchSearch();
}

//is used to block the "ENTER" event on the search bar when the field has been entered by the user
document.querySelector("form.searchBar").addEventListener("submit", (e) => {
  e.preventDefault();
});

function launchSearch() {
  // Retrieve my tags and retrieve my search field
  const searchKeyword = document.getElementById('search').value;
  const tagList = document.getElementById('tagsBtn');
  const allTags = tagList.getElementsByTagName('button');
  const tagsStringList = [];
  const recipesArrayFiltered = [];

  // get all tags selected
  for (i = 0; i < allTags.length; i++) {
    tagsStringList.push({ title: allTags[i].dataset.controls, type: allTags[i].dataset.type });
  }

  for (x = 0; x < recipesArray.length; x++) {

    let haveTagOk = true;

    let countUstensils = 0;
    let countUstensilsInRecipe = 0;

    let countIngredients = 0;
    let countIngredientsInRecipe = 0;

    if (tagsStringList.length > 0) {
      tagsStringList.forEach(item => {
        if (item.type == "ustensils") {
          countUstensils++;
        
          for (z = 0; z < recipesArray[x].ustensils.length; z++) {
            if (recipesArray[x].ustensils[z].toLowerCase() == item.title.toLocaleLowerCase()) {
              countUstensilsInRecipe++;
            }
          }
        }

        if (item.type == "ingredients") {
          countIngredients++;
          for (y = 0; y < recipesArray[x].ingredients.length; y++) {
            if (recipesArray[x].ingredients[y].ingredient.toLowerCase() == item.title.toLocaleLowerCase()) {
              countIngredientsInRecipe++;
            }
          }
        }

        if (item.type == "device")
          if (recipesArray[x].appliance != item.title) {
            haveTagOk = false;
          }
      });

      if (countUstensilsInRecipe != countUstensils) {
        haveTagOk = false;
      }

      if (countIngredientsInRecipe != countIngredients) {
        haveTagOk = false;
      }
    }

    // Search field 
    let wordContains = true;
    if (searchKeyword.length >= 3) {

      const titleLowerCase = recipesArray[x].name.toLowerCase();
      const descriptionLowerCase = recipesArray[x].description.toLowerCase();

      let ingredientsSentence = '';
      for (u = 0; u < recipesArray[x].ingredients.length; u++) {
        ingredientsSentence = ingredientsSentence + ' ' + recipesArray[x].ingredients[u].ingredient;
      }

      // We write a sentence with the ingredients separated by a lowercase space
      const ingredientsLowerCase = ingredientsSentence.toLowerCase();
      const ingredientsList = ingredientsLowerCase.split(' ');
      let ingredientsInSearch = false;

      for (b = 0; b < ingredientsList.length; b++) {
        if (ingredientsList[b].includes(searchKeyword.toLowerCase())) {
          ingredientsInSearch = true;
        }
      }

      if (!titleLowerCase.includes(searchKeyword.toLowerCase()) &&
        !descriptionLowerCase.includes(searchKeyword.toLowerCase()) &&
        !ingredientsInSearch) {
        wordContains = false;
      }
    }

    if (haveTagOk && wordContains) {
      recipesArrayFiltered.push(recipesArray[x]);
    }
  }

  recipeCardDom(recipesArrayFiltered);
  const count = recipesArrayFiltered.length;
  showErrorMessage(count);
}