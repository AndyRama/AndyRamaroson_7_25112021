//DOM elements
let recipesArray = [];
let allIngredients = [];
let allDevices = [];
let allUstensils = [];

let filteredIngredients = [];
let filteredDevices = [];
let filteredUstensils = [];

// Fetch api Json
fetch("./script/api/recipes.json")
  .then(reponse => {
    if (reponse) return reponse.json();
  })
  .then((value) => {
    //display all recipes
    recipeCardDom(value.recipes);//ELEMENT OF RECIPE FOR CARD
    recipesArray = value.recipes;//TABLEAU OF ALL RECIPES
  })

//show cards
function recipeCardDom(recipes) {
  //get container recipes create a new card for recipe
  const recipeCard = document.getElementById("recipeContainer");
  recipeCard.innerHTML = "";
  //template cards recipes
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
        <li class="recipe__ingredient">${ingredient.ingredient} :
          <span class="recipe__quantity">${ingredient.quantity === undefined ? "" : ingredient.quantity}
          ${ingredient.unit === undefined ? "" :ingredient.unit}</span>
        </li>
      `;
    })
  });

  //get all array
  allUstensils = [];
  allDevices = [];
  allIngredients = [];

  // Add tags in taglist container respective
  recipes.forEach((element) => {
    //ingrédients
    element.ingredients.forEach((e) => {
      if (allIngredients.indexOf(e.ingredient) == -1) allIngredients.push(e.ingredient);
    });
    
    //devices
    if (allDevices.indexOf(element.appliance) == -1) allDevices.push(element.appliance);

    //ustensiles
    element.ustensils.forEach((e) => {
      if (allUstensils.indexOf(e) == -1) allUstensils.push(e);
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
    if (filteredIngredients.indexOf(item) != -1 || filteredDevices.indexOf(item) != -1 || filteredUstensils.indexOf(item) != -1) {
      templateTaglist += `
        <li><button  onclick="addFilter(this)" aria-label="${contentItem}" data-title="${contentItem}" class="tag--${type} tag is-selected" data-type="${type}" data-item="${item}">${contentItem}</button></li>
      `;
    } else {
      templateTaglist += `
        <li ><button  onclick="addFilter(this)" aria-label="${contentItem}" data-title="${contentItem}" class="tag--${type} tag" data-type="${type}" data-item="${item}">${contentItem}</button></li>
      `;
    }
  })
  tag.innerHTML = templateTaglist;
}

function addFilter(e) {
  const type = e.dataset.type;
  const title = e.dataset.title;
  var htmlClass;

  // tags deja selectionner 
  const tagList = document.getElementById("tagsBtn");
  const allTags = tagList.getElementsByTagName('button');
  const tagsStringList = [];

  for (i = 0; i < allTags.length; i++) {
    tagsStringList.push({ title: allTags[i].dataset.controls, type: allTags[i].dataset.type });
  }

  switch(type) {
    case 'ingredients':
      htmlClass = 'filters__btn--ingredients';
    break;

    case 'device':
      htmlClass = 'filters__btn--device';
    break;

    case 'ustensils':
      htmlClass = 'filters__btn--ustensils';
    break;
  }
  
  //if tags isn't already present in this list => add  new tag element 
  if (!tagsStringList.some(tag => tag.title.toLowerCase() == title.toLowerCase())) {
    document.getElementById('tagsBtn').innerHTML = document.getElementById('tagsBtn').innerHTML + `
      <button onclick="removeFilter(this)" data-type="${type}" data-controls="${title}" class="filters__tag filters__Btn ${htmlClass}">
        ${title}
        <svg id="close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white"></path>
        </svg>
      </button>
    `;
    launchSearch();
  }
}

// remove tag with close
function removeFilter(e) {
  e.remove();
  launchSearch();
}

function searchKeyword() {
  launchSearch();
}

function launchSearch() {
  // Retrieve my tags
  // Retrieve my search field
  const searchKeyword = document.getElementById('search').value;
  const tagList = document.getElementById('tagsBtn');
  const allTags = tagList.getElementsByTagName('button');
  const tagsStringList = [];
  const recipesArrayFiltered = [];

  for (i = 0; i < allTags.length; i++) {
    tagsStringList.push({ title: allTags[i].dataset.controls, type: allTags[i].dataset.type });
  }  

  recipesArray.map(recipe => {

    let haveTagOk = true;

   if (tagsStringList.length > 0) {
      tagsStringList.map(item => {
        
        if(item.type == "ustensils")

          if(!recipe.ustensils.some(ustensil => ustensil.toLowerCase() == item.title.toLowerCase())) {
            haveTagOk = false;
          }

        if(item.type == "ingredients")
          if(!recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() == item.title.toLowerCase())) {
            haveTagOk=false;
          }

        if(item.type == "device")
          if(recipe.appliance != item.title) {
            haveTagOk = false;
          }
  
      })
    }

    if (haveTagOk) {
      recipesArrayFiltered.push(recipe);
    }     
  })
  recipeCardDom(recipesArrayFiltered);
}

//bandeau informatif en cas d'absence de recette lors de la recette
const noRecipesMessage = document.getElementById("filtersMessage");
const templateMessage = `
  <p class="filters__message">
    Aucune recette ne correspond à votre recherche... Vous pouvez chercher "tarte aux pommes", "poisson", etc ...
    <button id="closeM" >
      <svg class="ico ico__close "width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="black"></path>
      </svg>
    </button>
  </p>        
`;
