let recipesArray = [];
let allIngredients = [];
let allDevices = [];
let allUstensils = [];

// Fetch api Json
fetch("./script/api/recipes.json")
  .then(reponse => {
    if(reponse.ok) return reponse.json();
  })
  .then((value) => {
    //display all recipes
    recipeCardDom(value.recipes);
    recipesArray = value.recipes;
})

function recipeCardDom(recipes) {
  console.log("recipeCardDom", recipes);//OK

  //get container recipes
  const recipeCard = document.getElementById("recipeContainer");
  recipeCard.innerHTML = "";
  
}

