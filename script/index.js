//DOM elements 
let recipesArray = [];
let allIngredients = [];
let allDevices = [];
let allUstensils = [];

let filteredIngredients =[];
let filteredDevices = [];
let filteredUstensils = [];

// Fetch api Json
fetch("./script/api/recipes.json")
  .then(reponse => {
    if(reponse) return reponse.json();
  })
  .then((value) => {
    //display all recipes
    recipeCardDom(value.recipes);
    recipesArray = value.recipes;
  })

//show cards
function recipeCardDom(recipes) {
  // console.log("recipeCardDom", recipes);

  //get container recipes create a new card for recipe
  const recipeCard = document.getElementById("recipeContainer");
  recipeCard.innerHTML = "";
  recipes.map(recipe => {    
    recipeCard.innerHTML += `
    <article class="recipe__container">
      <div class="recipe__picture">
        <img class="recipe__img" src="./public/assets/imagePlat.jpg" alt="image d'un plat">
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
    //get ingredients of recipe and dipslay
    const ingredientList = document.getElementById(`recipe-${recipe.id}`);
    const ingredients = recipe.ingredients
    ingredients.map(ingredient => {
      ingredientList.innerHTML += `
        <li class="recipe__ingredient">${ingredient.ingredient}:
          <span class="recipe__quantity">${ingredient.quantity === undefined ? "" : ingredient.quantity}
          ${ingredient.unit === undefined ? "" : ingredient.unit}</span>
        </li>
      `;    
    })
  });

  //get all array
  allUstensils = [];
  allDevices = [];
  allIngredients = [];

  // Add tags
  recipes.forEach((element) => {
    //ingrédients
    element.ingredients.forEach((e) => {
      if (allIngredients.indexOf(e.ingredient) == -1) allIngredients.push(e.ingredient);
      console.log(allIngredients);
    });
    //appareils
    if (allDevices.indexOf(element.appliance) == -1) allDevices.push(element.appliance);
      // console.log(allDevices);

    //ustensiles
    element.ustensils.forEach((e) => {
      if (allUstensils.indexOf(e) == -1) allUstensils.push(e);
      // console.log(allUstensils);
    });
  });
  
  //display all tags in taglist container
  showTags(allIngredients, "ingredientsTaglist", "ingredients");
  showTags(allDevices, "devicesTaglist", "device");
  showTags(allUstensils, "ustensilsTaglist", "ustensils");
}

// create a new tag, order by  and display tag with template function
function showTags(items, tagId, type) {
  const tag = document.getElementById(tagId);
  let templateTaglist = ``;
  items.sort();
  items.map(item => {
    let contentItem = item[0].toUpperCase() + item.toLowerCase().slice(1);
    if( filteredIngredients.indexOf(item) != -1 || filteredDevices.indexOf(item) != -1 || filteredUstensils.indexOf(item) != -1) {
      templateTaglist += `
        <li><button aria-label="${contentItem}" title="${contentItem}" class="tag--${type} tag is-selected" data-type="${type}" data-item="${item}">${contentItem}</button></li>
      `;
    } else {
      templateTaglist += `
        <li><button aria-label="${contentItem}" title="${contentItem}" class="tag--${type} tag" data-type="${type}" data-item="${item}">${contentItem}</button></li>
      `;
    }
  })
  tag.innerHTML = templateTaglist;
}

// Affiche les tags selectionnés lors du clic et ajoute la classe is-selected dessus
// Comportement dropdown extensions

// Autocomplete
// Recuperer le champ de recherche dans la barre principale
// Bloquer l'évèvement "ENTER" pour submit sur la barre de recherche lorsque le champ a été saisi par l'utilsateur
// saisie d'une valeur dans la recherche principale et affichage du message si absence de recette

// Algo 1 => recipeMap()  
// Permettre de filtrer les recettes lorsqu'on selectionne un tag
// filtrer les elements dans les listes en fonction des valeurs saisies dans les inputs
// enleve le tag ajouté suite à la selection dans la liste et enleve la classe is-selected quand on le ferme.

// Algo 2 => recipeFilter() 
// Permettre de filtrer les recettes lorsqu'on selectionne un tag
// filtrer les elements dans les listes en fonction des valeurs saisies dans les inputs
// enleve le tag ajouté suite à la selection dans la liste et enleve la classe is-selected quand on le ferme.

// MESSAGE
// Afficher un bandeau informatif en cas d'absence de recette lors de la recette
// Fonctions de suppression du message d'absence de recettes